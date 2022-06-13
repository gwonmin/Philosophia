import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../organisms/Header"
import { DispatchContext } from "./RootPage"
import * as Api from "../../api"
import { TextFieldAtom } from "../atoms/textInputs"

export default function AddDevatePage() {
  const navigate = useNavigate()

  const [devateInfo, setDevateInfo] = useState({
    title: "",
    content: "",
    tag: "",
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDevateInfo({
      ...devateInfo,
      [name]: value,
    })
  }

  const postDevate = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: "devates",
        data: devateInfo,
      })

      navigate("/devates", { replace: true })
    } catch (err) {
      console.log("등록에 실패하였습니다.\n", err)
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>토론 작성 페이지입니다.</p>
        <TextFieldAtom id="title" label="title" name="title" value={devateInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={devateInfo.content} onChange={onChange} />
        <TextFieldAtom id="tag" label="tag" name="tag" value={devateInfo.tag} onChange={onChange} />
        <button onClick={postDevate}>토론 등록하기</button>
      </Container>
    </div>
  )
}
