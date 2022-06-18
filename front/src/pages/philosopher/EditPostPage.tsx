import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../components/organisms/Header"
import { DispatchContext } from "../RootPage"
import * as Api from "../../api"
import { TextFieldAtom } from "../../components/atoms/textInputs"

export default function EditPostPage({ setIsEditing, postInfo, setPostInfo }: { setIsEditing: any; postInfo: any; setPostInfo: any }) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPostInfo({
      ...postInfo,
      [name]: value,
    })
  }

  const postPost = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.put({ endpoint: `posts/${postInfo._id}`, data: postInfo })
      console.log("수정에 성공했습니다.")
      setIsEditing(false)
    } catch (err) {
      console.log("수정에 실패하였습니다.\n", err)
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <TextFieldAtom id="title" label="title" name="title" value={postInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={postInfo.content} onChange={onChange} />
        <TextFieldAtom id="tag" label="tag" name="tag" value={postInfo.tag} onChange={onChange} />
        <button onClick={postPost}>토론 등록하기</button>
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
