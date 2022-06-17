import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../organisms/Header"
import { DispatchContext } from "../RootPage"
import * as Api from "../../../api"
import { TextFieldAtom } from "../../atoms/textInputs"

export default function EditSharePage({ setIsEditing, shareInfo, setShareInfo }: { setIsEditing: any; shareInfo: any; setShareInfo: any }) {
  const navigate = useNavigate()

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
      const res = await Api.put({ endpoint: `shares/${shareInfo._id}`, data: shareInfo })
      console.log("수정에 성공했습니다.")
      navigate("/shares", { replace: true })
    } catch (err) {
      console.log("수정에 실패하였습니다.\n", err)
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <TextFieldAtom id="title" label="title" name="title" value={shareInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={shareInfo.content} onChange={onChange} />
        <button onClick={postShare}>토론 등록하기</button>
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
