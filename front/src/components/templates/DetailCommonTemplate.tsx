import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "@mui/material"

import { customFetch } from "../../util"

import Header from "../organisms/Header"
import { UserStateContext } from "../../pages/RootPage"
import ReadDevatePage from "../../pages/devate/ReadDevatePage"
import { COMMON_ROUTE } from "../../route/Routes"
import EditPostForm from "../organisms/EditPostForm"
import ReadPostForm from "../organisms/ReadPostForm"

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

export default function DevatePage({ currentPage }: { currentPage: COMMON_ROUTE }) {
  //변수 초기화
  const currentPath = currentPage.DEFAULT.path
  const params = useParams()
  const postId = params.id
  const userState = useContext(UserStateContext)
  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState(false)
  const [postInfo, setPostInfo] = useState<Post | undefined>(undefined)

  //초기화 확인
  console.log("location: ", currentPage)
  console.log("userState: ", userState)
  console.log("postId: ", postId)

  //fetch + 새로고침 로직
  useEffect(() => {
    customFetch({
      endpoint: currentPath + "/" + postId,
      setValue: setPostInfo,
      callback: setIsFetchCompleted,
    })
  }, [params, somethingWasChanged])

  //유효성 검사
  if (!userState) {
    return <p>user does not exist(even null)</p>
  }
  if (!currentPath) {
    return <p>Path is not valid</p>
  }
  if (!postId) {
    return <p>Param is not valid</p>
  }
  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  return (
    <Container>
      <Header />
      <p>토론 상세정보 페이지, 모드: {isEditing ? "편집" : "읽기"}</p>
      {isEditing ? (
        <EditPostForm path={currentPath} setIsEditing={setIsEditing} postInfo={postInfo} setPostInfo={setPostInfo} />
      ) : (
        <ReadPostForm
          path={currentPath}
          setIsEditing={setIsEditing}
          postInfo={postInfo}
          somethingWasChanged={somethingWasChanged}
          setSomethingWasChanged={setSomethingWasChanged}
        />
      )}
    </Container>
  )
}
