import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import * as Api from "../../api"
import axios from "axios"
import { TextFieldAtom } from "../atoms/textInputs"
import { Box, Button, FormControl, Grid, InputLabel, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from "@mui/material"
import SublineAtom from "../atoms/SublineAtom"
import Loading from "../atoms/Loading"

const forSelect: { [key: string]: string } = { Nietzsche: "/img/Fixniet.png", Kant: "/img/Fixkan.png", Aristotle: "/img/Fixaris.png" }
const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
  },
})

export default function SharePostAddForm(aiShare?: any) {
  //AI와 상호작용하는 게시판에서 불러오게 될 것 같습니다.
  const [postInfo, setPostInfo] = useState({
    philosopher: "",
    subject: "",
    content: "",
  })
  const [philosopher, setPhilosopher] = useState<string>("Nietzsche")
  const [word, setWord] = useState<string>("")
  const [somethingWasChanged, setSomethingWasChanged] = useState<boolean>(false)
  const [writing, setWriting] = useState<boolean>(false)
  const navigate = useNavigate()

  const handlePost = async () => {
    try {
      await Api.post({
        endpoint: "shares",
        data: postInfo,
      })
      alert("게시글 등록에 성공했습니다.")
      navigate("/shares")
    } catch (err) {
      alert("게시글 등록에 실패하였습니다.")
    }
  }
  const connectAI = async () => {
    setWriting(true)
    // const serverUrl = "http://" + window.location.hostname + ":5000/inference"
    const serverUrl = "http://" + window.location.hostname + ":5001/translate"
    const data = { data: `${philosopher} ${word}` }
    const bodyData = JSON.stringify(data)
    // const serverUrl = "http://localhost:5001/translate";
    // const bodyData = JSON.stringify(philosopher + " " + word).replace("\"", "").replace("\"", "");
    const res = await axios.post(serverUrl, bodyData, {
      headers: {
        "Content-Type": "application/json",
        //   // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    })
    let newPost = postInfo
    newPost.philosopher = philosopher
    newPost.subject = word
    newPost.content = res.data

    setPostInfo(newPost)
    setSomethingWasChanged(!somethingWasChanged)
    setWriting(false)
  }
  const handleChange = (event: SelectChangeEvent) => {
    setPhilosopher(event.target.value as string)
  }

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={4}>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
            <InputLabel id="philosoperSelect">철학자를 선택하세요</InputLabel>
            <Select labelId="philosoperSelect" id="philosoperSelect" value={philosopher} onChange={handleChange}>
              <MenuItem value={"Nietzsche"}>니체</MenuItem>
              <MenuItem value={"Kant"}>칸트</MenuItem>
              <MenuItem value={"Aristotle"}>아리스토텔레스</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            mt: 3,
          }}
        >
          <TextFieldAtom id="subject" placeholder="제시어를 입력해주세요" name="subject" value={word} onChange={(e) => setWord(e.target.value)} />
        </Grid>
        <SublineAtom subtext="*Beta에서는 영어를 입력했을 때 더 완성도 있는 문장이 나옵니다."></SublineAtom>
        <NoMaxWidthTooltip
          title={
            <Box sx={{ minWidth: "500px", maxWidth: "none" }}>
              <Typography color="inherit">{philosopher}의 추천 단어</Typography>
              <Typography>자연스러운 문장이 나올 가능성이 높은 단어들을 추천해드립니다.</Typography>
              <img src={forSelect[philosopher]} alt={`${philosopher} recommend`} />
            </Box>
          }
        >
          <Button>*추천 단어</Button>
        </NoMaxWidthTooltip>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={connectAI}>
          글 생성하기
        </Button>
      </Grid>
      {writing && <Loading />}
      {postInfo.content != "" && (
        <>
          <p>
            철학자 {postInfo.philosopher}이(가) 생각하는 {postInfo.subject}이란?
          </p>
          <p>본문: {postInfo.content}</p>
          <button onClick={handlePost}>공유하기</button>
          <button
            onClick={() => {
              navigate("/shares")
            }}
          >
            취소
          </button>
        </>
      )}
    </>
  )
}
