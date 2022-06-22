import { useContext, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"

import { UserStateContext } from "../../pages/RootPage"
import CommentList from "./CommentList"
import { handleDelete, handleStance } from "../../util"

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
  let stopper: boolean
  const handleAgree = () => {
    if (stopper == somethingWasChanged) {
      return
    }
    stopper = somethingWasChanged
    handleStance({
      endpoint: path,
      id: postId,
      stance: postInfo.yes.includes(userState.user?._id),
      changeStance: "1",
      value: somethingWasChanged,
      callback: setSomethingWasChanged,
    })
  }
  const handleDisagree = () =>
    handleStance({
      endpoint: path,
      id: postId,
      stance: postInfo.no.includes(userState.user?._id),
      changeStance: "0",
      value: somethingWasChanged,
      callback: setSomethingWasChanged,
    })

  return (
    <div>
      <p>제목: {postInfo.title}</p>
      <p>글쓴이: {postInfo.author.name}</p>
      <p>작성일: {postInfo.createdAt}</p>
      <p>내용: {postInfo.content}</p>
      <p>태그: {postInfo.tag}</p>
      <p>
        찬성: {postInfo.yes.length}, 반대: {postInfo.no.length}
      </p>
      <div>
        <button
          onClick={() => {
            navigate(-1)
          }}
        >
          목록
        </button>
      </div>
      {userState.user && (
        <div>
          <p>여기서부터는 로그인한 유저에게만 보입니다.</p>
          <button onClick={handleAgree}>찬성</button>
          <button onClick={handleDisagree}>반대</button>
          <div>현재 상태: </div>
          {didAgree && <div>찬성</div>}
          {didDisagree && <div>반대</div>}
          {!didAgree && !didDisagree && <div>중립</div>}
        </div>
      )}
      {isAuthor && (
        <div>
          <p>여기부터는 글쓴이에게만 보입니다.</p>
          <button
            onClick={() => {
              setIsEditing(true)
            }}
          >
            수정하기
          </button>
          <button onClick={deleteHandler}>삭제하기</button>
        </div>
      )}
      <CommentList postId={postId} yesList={postInfo.yes} noList={postInfo.no} />
    </div>
  )
}
