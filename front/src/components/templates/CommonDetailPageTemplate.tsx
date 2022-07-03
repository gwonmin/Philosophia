import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "@mui/material"

import { customFetch } from "../../util"
import { User } from "../../types"
import { UserStateContext } from "../../RootContext"
import { ALL_ROUTE } from "../../route/Routes"
import CommonPostEditForm from "../organisms/CommonPostEditForm"
import CommonPostReadForm from "../organisms/CommonPostReadForm"
import Loading from "../atoms/Loading"
import { Post } from "../../types"

export default function CommonDetailPageTemplate({ currentPage }: { currentPage: ALL_ROUTE }) {
  //변수 초기화
  const params = useParams()
  const postId = params.id
  const philosopher = params.who
  const currentPath = currentPage.DEFAULT.path === ":who" ? philosopher : currentPage.DEFAULT.path
  const userState = useContext(UserStateContext)
  const [isFetchCompleted, setIsFetchCompleted] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState<boolean>(false)
  const [postInfo, setPostInfo] = useState<Post | null>(null)

  //fetch + 새로고침 로직
  useEffect(() => {
    customFetch({
      endpoint: currentPath !== "devates" ? currentPath + "/" + postId : currentPath + "/" + postId + "?userId=" + userState?.user?._id,
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
  if (!isFetchCompleted) return <Loading />

  if (!postInfo) return <Loading />

  return (
    <Container>
      {isEditing ? (
        <CommonPostEditForm path={currentPath} setIsEditing={setIsEditing} postInfo={postInfo} setPostInfo={setPostInfo} />
      ) : (
        <CommonPostReadForm
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
