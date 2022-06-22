import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../components/organisms/Header"
import { DispatchContext } from "../RootPage"
import * as Api from "../../api"
import { TextFieldAtom } from "../../components/atoms/textInputs"

export default function AddDataPage() {
  const navigate = useNavigate()

  const [dataInfo, setDataInfo] = useState({
    title: "",
    content: "",
    tag: "",
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataInfo({
      ...dataInfo,
      [name]: value,
    })
  }

  const postData = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: "datatopics",
        data: dataInfo,
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
        <TextFieldAtom id="title" label="title" name="title" value={dataInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={dataInfo.content} onChange={onChange} />
        <TextFieldAtom id="tag" label="tag" name="tag" value={dataInfo.tag} onChange={onChange} />
        <button onClick={postData}>토론 등록하기</button>
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
