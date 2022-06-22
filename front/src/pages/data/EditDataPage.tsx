import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../components/organisms/Header"
import { DispatchContext } from "../RootPage"
import * as Api from "../../api"
import { TextFieldAtom } from "../../components/atoms/textInputs"

export default function EditDataPage({ setIsEditing, dataInfo, setDataInfo }: { setIsEditing: any; dataInfo: any; setDataInfo: any }) {
  const navigate = useNavigate()

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
      const res = await Api.put({ endpoint: `datas/${dataInfo._id}`, data: dataInfo })
      console.log("수정에 성공했습니다.")
      setIsEditing(false)
    } catch (err) {
      console.log("수정에 실패하였습니다.\n", err)
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <TextFieldAtom id="title" label="title" name="title" value={dataInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={dataInfo.content} onChange={onChange} />
        <TextFieldAtom id="tag" label="tag" name="tag" value={dataInfo.tag} onChange={onChange} />
        <button onClick={postData}>토론 등록하기</button>
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
