import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import Container from "@mui/material/Container"

import { ALL_ROUTE } from "../../route/Routes"
import { customFetch } from "../../util"

import { UserStateContext } from "../../RootContext"
import Header from "../organisms/Header"
import Footer from "../organisms/Footer"
import Exchange from "../organisms/PostCards"
import { User, Post, GetPostResponse } from "../../types"

export default function CommonPageTemplate({
  currentPage,
}: {
  currentPage: ALL_ROUTE
}) {
  //변수 초기화
  const params = useParams()
  const philosopher = params.who ?? ""
  const navigate = useNavigate()
  const userState = useContext(UserStateContext)
  const [postList, setPostList] = useState<Post[]>([])
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [isFetchCompleted, setIsFetchCompleted] = useState<boolean>(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState<boolean>(false)
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
      endpoint:
        `${path()}${
          currentPageNumber !== 1 ? `?page=${currentPageNumber}` : ""
        }` ?? "",
      setValue: (res: GetPostResponse) => {
        setPostList(res.posts)
      },
      callback: setIsFetchCompleted,
    })
  }, [somethingWasChanged])
  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <p>{currentSub.label} 페이지입니다.</p>
        <div>
          {postList.length == 0 && <p>아직 게시물이 없네요.</p>}
          {postList != [] && (
            <div>
              <p>게시물 목록:</p>
              {postList.map((post: Post) => {
                return (
                  <div key={post._id}>
                    <Exchange
                      path={currentPage.DEFAULT.path ?? "에러"}
                      post={post}
                      somethingWasChanged={somethingWasChanged}
                      setSomethingWasChanged={setSomethingWasChanged}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
        {userState?.user && (
          <button
            onClick={() => {
              navigate("add")
            }}
          >
            글쓰기
          </button>
        )}
      </Container>
      <Footer />
    </div>
  )
}
