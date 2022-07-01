import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import { ALL_ROUTE } from "../../route/Routes"
import { customFetch } from "../../util"

import { UserStateContext } from "../../RootContext"
import Exchange from "../organisms/PostCards"
import { Post, GetPostResponse } from "../../types"
import WriteFabAtom from "../atoms/WriteFabAtom"
import PaginationAtom from "../atoms/PaginationAtom"

export default function CommonPageTemplate({
  currentPage,
}: {
  currentPage: ALL_ROUTE
}) {
  //변수 초기화
  const params = useParams()
  const philosopher = params.who ?? ""
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
    <Container component="main" sx={{ width: "100%" }}>
      <Box sx={{ overflow: "auto", height: "70.2vh" }}>
        <Typography sx={{ textAlign: "center", mb: 1 }} variant="h4">
          {currentSub.label} 페이지
        </Typography>
        {postList.length === 0 ? (
          <Typography variant="h4">아직 게시물이 없네요 😭</Typography>
        ) : (
          postList.map((post: Post) => {
            return (
              <Exchange
                path={currentPage.DEFAULT.path ?? "에러"}
                post={post}
                somethingWasChanged={somethingWasChanged}
                setSomethingWasChanged={setSomethingWasChanged}
              />
            )
          })
        )}
      </Box>
      {userState?.user && <WriteFabAtom path="add" />}
      <PaginationAtom
        page={currentPageNumber}
        onChange={(_e, val) => {
          setCurrentPageNumber(val)
        }}
      />
    </Container>
  )
}
