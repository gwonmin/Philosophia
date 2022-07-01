import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import * as Api from "../../api"
import axios from "axios"
import { TextFieldAtom } from "../atoms/textInputs"
import { Button, FormControl, Grid, InputLabel } from "@mui/material"

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
      const res = await Api.post({
        endpoint: "shares",
        data: postInfo,
      })
      console.log("글 공유 게시판의 post요청이 성공했습니다. data: ", res.data)
      navigate("share")
    } catch (err) {
      console.log("게시글 등록에 실패하였습니다.\n", err)
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
    console.log(`%cPOST 요청: ${serverUrl}`, "color: #296aba;")
    console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;")
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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Nietzsche"}>니체</MenuItem>
              <MenuItem value={"Descartes"}>데카르트</MenuItem>
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
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={connectAI}>
          글 생성하기
        </Button>
      </Grid>
      {writing && <p>loading...</p>}
      {postInfo.content != "" && (
        <>
          <p>
            철학자 {postInfo.philosopher}이(가) 생각하는 {postInfo.subject}이란?
          </p>
          <p>본문: {postInfo.content}</p>
          <button onClick={handlePost}>공유하기</button>
          <button
            onClick={() => {
              navigate(-1)
            }}
          >
            취소
          </button>
        </>
      )}
    </>
  )
}
