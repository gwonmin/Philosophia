import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import Container from "@mui/material/Container"

import { COMMON_ROUTE } from "../../route/Routes"
import { customFetch } from "../../util"

import { UserStateContext } from "../../pages/RootPage"
import Header from "../organisms/Header"
import Footer from "../organisms/Footer"
import Exchange from "../organisms/PostCards"
import { User, Post } from "../../types"
import { Box, Grid, Paper, Typography } from "@mui/material"
import { HeaderText } from "../atoms/textboxs"

export default function CommonPageTemplate({ currentPage }: { currentPage: COMMON_ROUTE }) {
  //변수 초기화
  const params = useParams()
  const philosopher = params.who ?? ""
  const navigate = useNavigate()
  const userState = useContext(UserStateContext)
  const [postList, setPostList] = useState<Post[]>([])
  const [isFetchCompleted, setIsFetchCompleted] = useState<boolean>(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState<boolean>(false)
  const label = currentPage.DEFAULT.label
  const path = () => {
    if (currentPage.DEFAULT.path === ":who") {
      return philosopher
    }
    return currentPage.DEFAULT.path ?? ""
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
  }, [somethingWasChanged])
  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  return (
    <Container maxWidth="md">
      <Header />
      <Paper variant="outlined" sx={{ m: 2, p: 2 }}>
        <Box sx={{ pb: 1, borderBottom: 1.5, borderColor: "black" }}>
          <Box sx={{ pb: 1, borderBottom: 1.5, borderColor: "divider" }}>
            <HeaderText level={"h2"}>{label}</HeaderText>
          </Box>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={6} alignItems="center">
              <Typography align="center">제목</Typography>
            </Grid>
            <Grid item xs={2} alignItems="center">
              <Typography align="center">글쓴이</Typography>
            </Grid>
            <Grid item xs={2} alignItems="center">
              <Typography align="center">작성일</Typography>
            </Grid>
            <Grid item xs={2} alignItems="center">
              <Typography align="center">좋아요</Typography>
            </Grid>
          </Grid>
        </Box>
        <div>
          {postList != [] && (
            <div>
              {postList.map((post: Post) => {
                return (
                  <div key={post._id}>
                    <Exchange path={path()} post={post} somethingWasChanged={somethingWasChanged} setSomethingWasChanged={setSomethingWasChanged} />
                  </div>
                )
              })}
            </div>
          )}
          {postList.length == 0 && <p></p>}
          <p></p>
          {userState?.user && path() !== "shares" && (
            <Grid sx={{ display: "flex", justifyContent: "right" }}>
              <button
                onClick={() => {
                  navigate("/" + path() + "/add")
                }}
              >
                글쓰기
              </button>
            </Grid>
          )}
        </div>
      </Paper>
    </Container>
  )
}
