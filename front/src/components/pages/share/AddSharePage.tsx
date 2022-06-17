import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../organisms/Header"
import { DispatchContext } from "../RootPage"
import * as Api from "../../../api"
import { TextFieldAtom } from "../../atoms/textInputs"

export default function AddSharePage() {
  const navigate = useNavigate()

  const [shareInfo, setShareInfo] = useState({
    title: "",
    content: "",
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShareInfo({
      ...shareInfo,
      [name]: value,
    })
  }

  const postShare = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: "shares",
        data: shareInfo,
      })

      navigate("/shares", { replace: true })
    } catch (err) {
      console.log("등록에 실패하였습니다.\n", err)
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>토론 작성 페이지입니다.</p>
        <TextFieldAtom id="title" label="title" name="title" value={shareInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={shareInfo.content} onChange={onChange} />
        <button onClick={postShare}>토론 등록하기</button>
        <button
          onClick={() => {
            navigate("/shares")
          }}
        >
          취소
        </button>
      </Container>
    </div>
  )
}
