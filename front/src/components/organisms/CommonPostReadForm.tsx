import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UserStateContext } from "../../RootContext"
import CommentList from "./CommentList"
import ShowPostInfo from "../molecules/ShowPostInfo"
import ForUserMolcule from "../molecules/ForUserMolecule"
import { handleDelete, handleStance } from "../../util"
import ForAuthorMolcule from "../molecules/ForAuthorMolecule"
import * as Api from "../../api"
import { Post } from "../../types"
import { Divider } from "@mui/material"

export default function CommonPostReadForm({
  path,
  setIsEditing,
  postInfo,
  somethingWasChanged,
  setSomethingWasChanged,
}: {
  path: string
  setIsEditing: any
  postInfo: Post
  somethingWasChanged: any
  setSomethingWasChanged: any
}) {
  //변수 초기화
  const navigate = useNavigate()
  const userState = useContext(UserStateContext) ?? { user: null }
  const postId = postInfo._id
  const isAuthor = postInfo.author?._id === userState.user?._id
  let isUpdating = false

  //함수 정의
  const deleteHandler = () => handleDelete({ endpoint: path, id: postId, callback: navigate(-1) })
  const handleChangeStance = async (changeStance: string) => {
    if (isUpdating) {
      alert("조금만 기다려 주세요.")
      return
    }
    isUpdating = true
    await handleStance({
      id: postId,
      stance: postInfo.userStance,
      changeStance: changeStance,
      value: somethingWasChanged,
      callback: setSomethingWasChanged,
    })
    isUpdating = false
  }
  const handleLike = async () => {
    if (!userState.user) {
      return <p>user does not exist(even null)</p>
    }
    try {
      await Api.put({ endpoint: `shares/${postInfo._id}/like` })
      setSomethingWasChanged(!somethingWasChanged)
      alert("좋아요를 " + (postInfo.userLike === true ? "취소하였습니다." : "눌렀습니다."))
    } catch (err) {
      alert("좋아요에 실패했습니다.")
    }
  }
  return (
    <>
      <ShowPostInfo postInfo={postInfo} />
      <ForUserMolcule postInfo={postInfo} isUser={userState.user != null} handleChangeStance={handleChangeStance} handleLike={handleLike} />
      <ForAuthorMolcule isAuthor={isAuthor} setIsEditing={setIsEditing} deleteHandler={deleteHandler} />
      <Divider sx={{ mt: 3, mb: 3 }} />
      {path != "shares" && <CommentList path={path} postId={postId} />}
    </>
  )
}
