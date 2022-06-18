import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../components/organisms/Header"
import { DispatchContext } from "../RootPage"
import * as Api from "../../api"
import { TextFieldAtom } from "../../components/atoms/textInputs"

export default function EditDevatePage({ setIsEditing, devateInfo, setDevateInfo }: { setIsEditing: any; devateInfo: any; setDevateInfo: any }) {
  const navigate = useNavigate()

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
      const res = await Api.put({ endpoint: `devates/${devateInfo._id}`, data: devateInfo })
      console.log("수정에 성공했습니다.")
      setIsEditing(false)
    } catch (err) {
      console.log("수정에 실패하였습니다.\n", err)
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <TextFieldAtom id="title" label="title" name="title" value={devateInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={devateInfo.content} onChange={onChange} />
        <TextFieldAtom id="tag" label="tag" name="tag" value={devateInfo.tag} onChange={onChange} />
        <button onClick={postDevate}>토론 등록하기</button>
        <button
          onClick={() => {
            setIsEditing(false)
          }}
        >
          취소
        </button>
      </Container>
    </div>
  )
}
