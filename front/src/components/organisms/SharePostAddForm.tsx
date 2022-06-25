import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import * as Api from "../../api"
import axios from "axios"
import { TextFieldAtom } from "../atoms/textInputs"

export default function SharePostAddForm(aiShare?: any) {
  //AI와 상호작용하는 게시판에서 불러오게 될 것 같습니다.
  const [postInfo, setPostInfo] = useState({
    philosopher: "",
    subject: "",
    content: "",
  })
  const [philosopher, setPhilosopher] = useState("철학자")
  const [word, setWord] = useState("")
  const navigate = useNavigate()

  const handlePost = async () => {
    try {
      const res = await Api.post({
        endpoint: "shares",
        data: postInfo,
      })
      console.log("글 공유 게시판의 post요청이 성공했습니다. data: ", res.data)
      navigate(-1)
    } catch (err) {
      console.log("게시글 등록에 실패하였습니다.\n", err)
    }
  }
  const connectAI = async () => {
    const serverUrl = "http://" + window.location.hostname + ":5000/inference"
    const bodyData = JSON.stringify(philosopher + " " + word)
    console.log(`%cPOST 요청: ${serverUrl}`, "color: #296aba;")
    console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;")
    const res = await axios.post(serverUrl, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    })
    let newPost = postInfo
    newPost.content = res.data
    setPostInfo(newPost)
  }
  const handleChange = (event: SelectChangeEvent) => {
    setPhilosopher(event.target.value as string)
  }

  return (
    <>
      <p>철학자를 선택하세요.</p>
      <Select labelId="philosoperSelect" id="philosoperSelect" placeholder="철학자" value={philosopher} label={"철학자"} onChange={handleChange}>
        <MenuItem value={"Nietzsche"}>니체</MenuItem>
        <MenuItem value={"Descartes"}>데카르트</MenuItem>
        <MenuItem value={"Aristotle"}>아리스토텔레스</MenuItem>
      </Select>
      <p>제시어를 입력하세요.</p>
      <TextFieldAtom id="subject" label="subject" name="subject" value={word} onChange={(e) => setWord(e.target.value)} />
      <p></p>
      <button onClick={connectAI}>글 생성하기</button>
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
