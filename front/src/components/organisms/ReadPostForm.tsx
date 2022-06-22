import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UserStateContext } from "../../pages/RootPage"
import CommentList from "./CommentList"
import ShowPostInfo from "../molecules/ShowPostInfo"
import ForUserMolcule from "../molecules/ForUserMolcule"
import { handleDelete, handleStance } from "../../util"
import ForAuthorMolcule from "../molecules/ForAuthorMolcule"

export default function ReadPostForm({
  path,
  setIsEditing,
  postInfo,
  somethingWasChanged,
  setSomethingWasChanged,
}: {
  path: string
  setIsEditing: any
  postInfo: any
  somethingWasChanged: any
  setSomethingWasChanged: any
}) {
  //변수 초기화
  const navigate = useNavigate()
  const userState = useContext(UserStateContext) ?? { user: null }
  const postId = postInfo._id
  const isAuthor = postInfo.author._id === userState.user?._id
  const didAgree = postInfo.yes.includes(userState.user?._id)
  const didDisagree = postInfo.no.includes(userState.user?._id)

  //초기화 확인
  console.log("path: ", path)
  console.log("postId: ", postId)
  console.log("isAuthor: ", isAuthor, "didAgree", didAgree, "didDisagree: ", didDisagree)

  //함수 정의
  const deleteHandler = () => handleDelete({ endpoint: path, id: postId, callback: navigate(-1) })
  const handleAgree = () => {
    handleStance({
      endpoint: path,
      id: postId,
      stance: didAgree,
      changeStance: "1",
      value: somethingWasChanged,
      callback: setSomethingWasChanged,
    })
  }
  const handleDisagree = () => {
    handleStance({
      endpoint: path,
      id: postId,
      stance: didDisagree,
      changeStance: "0",
      value: somethingWasChanged,
      callback: setSomethingWasChanged,
    })
  }
  return (
    <div>
      <ShowPostInfo postInfo={postInfo} />
      <ForUserMolcule isUser={userState.user != null} didAgree={didAgree} didDisagree={didDisagree} handleAgree={handleAgree} handleDisagree={handleDisagree} />
      <ForAuthorMolcule isAuthor={isAuthor} setIsEditing={setIsEditing} deleteHandler={deleteHandler} />
      <CommentList postId={postId} yesList={postInfo.yes} noList={postInfo.no} />
    </div>
  )
}
