import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Container from "@mui/material/Container"

import { COMMON_ROUTE } from "../../route/Routes"
import { fetch } from "../../util"

import { UserStateContext } from "../../pages/RootPage"
import Header from "../organisms/Header"
import DevateCards from "../organisms/DevateCards"

type User = {
  _id: string
  email: string
  password: string
  name: string
}
type CommonPost = { _id: string; author: User; title: string; content: string; comment: string[] }
export type DevatePost = CommonPost & { yes: string[]; no: string[]; tag: string[] }
export type PhilosopherPost = CommonPost & {}
export type SharePost = CommonPost & {}

export type Post = DevatePost | PhilosopherPost | SharePost

export default function CommonPageTemplate({ currentPage }: { currentPage: COMMON_ROUTE }) {
  //변수 초기화
  const [postList, setPostList] = useState<Post[]>([])
  const navigate = useNavigate()
  const userState = useContext(UserStateContext)
  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  //초기화 확인
  console.log("location: ", currentPage)
  console.log("userState: ", userState)
  //fetch
  useEffect(() => {
    fetch({
      endpoint: currentPage.DEFAULT.path ?? "",
      setValue: setPostList,
      callback: setIsFetchCompleted,
    })
  }, [])
  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  const Footer = () => {
    return <p>푸터도 오게 될까요?</p>
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>{currentPage.DEFAULT.label} 페이지입니다.</p>
        <DevateCards postList={postList} />
        {userState?.user && (
          <button
            onClick={() => {
              navigate("add")
            }}
          >
            토론을 만들어 볼까요?
          </button>
        )}
        <Footer />
      </Container>
    </div>
  )
}
