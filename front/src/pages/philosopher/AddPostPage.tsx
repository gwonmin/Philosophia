import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../components/organisms/Header"
import { DispatchContext } from "../RootPage"
import * as Api from "../../api"
import { TextFieldAtom } from "../../components/atoms/textInputs"

export default function AddPostPage() {
  const navigate = useNavigate()
  const params = useParams()
  const philosopher = params.who

  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPostInfo({
      ...postInfo,
      [name]: value,
    })
  }

  const postPost = async () => {
    if (!philosopher) {
      console.log("URI의 철학자 정보가 잘못되었습니다.")
      return
    }
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: philosopher,
        data: postInfo,
      })

      navigate(`/philosopher/${philosopher}`, { replace: true })
    } catch (err) {
      console.log("등록에 실패하였습니다.\n", err)
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>토론 작성 페이지입니다.</p>
        <TextFieldAtom id="title" label="title" name="title" value={postInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={postInfo.content} onChange={onChange} />
        <button onClick={postPost}>게시물 등록하기</button>
        <button
          onClick={() => {
            navigate(`/philosopher/${philosopher}`)
          }}
        >
          취소
        </button>
      </Container>
    </div>
  )
}
