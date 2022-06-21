import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../components/organisms/Header"
import { DispatchContext } from "../RootPage"
import * as Api from "../../api"
import { TextFieldAtom } from "../../components/atoms/textInputs"

export default function AddFreePage() {
  const navigate = useNavigate()

  const [freeInfo, setFreeInfo] = useState({
    title: "",
    content: "",
    tag: "",
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFreeInfo({
      ...freeInfo,
      [name]: value,
    })
  }

  const postFree = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: "freetopics",
        data: freeInfo,
      })

      navigate(-1)
    } catch (err) {
      console.log("등록에 실패하였습니다.\n", err)
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>토론 작성 페이지입니다.</p>
        <TextFieldAtom id="title" label="title" name="title" value={freeInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={freeInfo.content} onChange={onChange} />
        <TextFieldAtom id="tag" label="tag" name="tag" value={freeInfo.tag} onChange={onChange} />
        <button onClick={postFree}>토론 등록하기</button>
        <button
          onClick={() => {
            navigate(-1)
          }}
        >
          취소
        </button>
      </Container>
    </div>
  )
}
