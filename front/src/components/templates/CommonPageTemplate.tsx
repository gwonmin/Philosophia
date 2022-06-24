import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import Container from "@mui/material/Container"

import { COMMON_ROUTE } from "../../route/Routes"
import { customFetch } from "../../util"

import { UserStateContext } from "../../pages/RootPage"
import Header from "../organisms/Header"
import Footer from "../organisms/Footer"
import CommonPostCards from "../organisms/CommonPostCards"

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

export type Post = DevatePost & PhilosopherPost & SharePost

export default function CommonPageTemplate({ currentPage }: { currentPage: COMMON_ROUTE }) {
  //변수 초기화
  const params = useParams()
  const philosopher = params.who ?? ""
  const navigate = useNavigate()
  const userState = useContext(UserStateContext)
  const [postList, setPostList] = useState<Post[]>([])
  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const currentSub = currentPage.DEFAULT
  const path = () => {
    if (currentPage.DEFAULT.path === ":who") {
      return philosopher
    }
    return currentPage.DEFAULT.path
  }

  //초기화 확인
  console.log("location: ", currentPage)
  console.log("userState: ", userState)

  //fetch
  useEffect(() => {
    customFetch({
      endpoint: path() ?? "",
      setValue: setPostList,
      callback: setIsFetchCompleted,
    })
  }, [])
  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>{currentSub.label} 페이지입니다.</p>
        <CommonPostCards currentPage={currentPage} postList={postList} />
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
