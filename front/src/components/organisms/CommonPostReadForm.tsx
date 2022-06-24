import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UserStateContext } from "../../pages/RootPage"
import CommentList from "./CommentList"
import ShowPostInfo from "../molecules/ShowPostInfo"
import ForUserMolcule from "../molecules/ForUserMolcule"
import { handleDelete, handleStance } from "../../util"
import ForAuthorMolcule from "../molecules/ForAuthorMolcule"
import * as Api from "../../api"

export default function CommonPostReadForm({
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
  const didAgree = postInfo.yes ? postInfo.yes.includes(userState.user?._id) : null
  const didDisagree = postInfo.no ? postInfo.no.includes(userState.user?._id) : null
  const didLike = postInfo.like?.includes(userState.user?._id)

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
  const handleLike = async () => {
    if (!userState.user) {
      return <p>user does not exist(even null)</p>
    }
    try {
      const res = await Api.put({ endpoint: `shares/${postInfo._id}/like` })
      setSomethingWasChanged(!somethingWasChanged)
      console.log("좋아요를 " + (didLike ? "취소하였습니다." : "눌렀습니다."))
    } catch (err) {
      console.log("좋아요에 실패했습니다.", err)
    }
  }
  return (
    <div>
      <ShowPostInfo postInfo={postInfo} />
      <ForUserMolcule
        isYesList={postInfo.yes != undefined}
        isUser={userState.user != null}
        didAgree={didAgree}
        didDisagree={didDisagree}
        handleAgree={handleAgree}
        handleDisagree={handleDisagree}
        like={postInfo.like != undefined}
        didLike={didLike}
        handleLike={handleLike}
      />
      <ForAuthorMolcule isAuthor={isAuthor} setIsEditing={setIsEditing} deleteHandler={deleteHandler} />
      {path != "shares" && <CommentList path={path} postId={postId} />}
    </div>
  )
}
