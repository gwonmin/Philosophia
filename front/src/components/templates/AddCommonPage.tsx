import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import { TextFieldAtom } from "../atoms/textInputs"
import Header from "../organisms/Header"
import * as Api from "../../api"
import { handleChange } from "../../util"
import { COMMON_ROUTE } from "../../route/Routes"

export default function AddDevatePage({ currentPage }: { currentPage: COMMON_ROUTE }) {
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    tag: "",
  })
  const navigate = useNavigate()
  const onChange = (e: any) => handleChange({ event: e, someState: postInfo, setSomeState: setPostInfo })

  const handlePost = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: currentPage.DEFAULT.path ?? "",
        data: postInfo,
      })
      console.log(currentPage.DEFAULT, "의 post요청이 성공했습니다. data: ", res.data)
      navigate(-1)
    } catch (err) {
      console.log("등록에 실패하였습니다.\n", err)
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>{currentPage.POST.label} 페이지입니다.</p>
        <TextFieldAtom id="title" label="title" name="title" value={postInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={postInfo.content} onChange={onChange} />
        <TextFieldAtom id="tag" label="tag" name="tag" value={postInfo.tag} onChange={onChange} />
        <button onClick={handlePost}>게시글 등록하기</button>
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
