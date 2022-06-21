import { useContext, useEffect, useState } from "react"
import { Container } from "@mui/material"

import { UserStateContext } from "../RootPage"
import * as Api from "../../api"
import { TextFieldAtom } from "../../components/atoms/textInputs"

export default function CommentCard({
  comment,
  somethingWasChanged,
  setSomethingWasChanged,
  yesList,
  noList,
}: {
  comment: any
  somethingWasChanged: any
  setSomethingWasChanged: any
  yesList: string[]
  noList: string[]
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [newComment, setNewComment] = useState(comment.content)

  const editHandler = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.put({ endpoint: `freecomments/${comment._id}`, data: { content: newComment } })
      console.log("수정에 성공했습니다.")
      setSomethingWasChanged(!somethingWasChanged)
      setIsEditing(false)
    } catch (err) {
      console.log("수정에 실패하였습니다.\n", err)
    }
  }

  const deleteHandler = async () => {
    try {
      const res = await Api.delete({ endpoint: "freecomments", params: String(comment._id) })
      console.log("덧글을 삭제했습니다.", res.data)
      setSomethingWasChanged(!somethingWasChanged)
    } catch (err) {
      console.log("덧글 삭제에 실패했습니다.", err)
    }
  }

  const stance = () => {
    if (yesList.includes(comment.author._id)) {
      return "찬성"
    }
    if (noList.includes(comment.author._id)) {
      return "반대"
    }
    return "중립"
  }

  return (
    <div>
      {isEditing && (
        <div>
          <TextFieldAtom
            id="newComment"
            label="새 덧글"
            name="newComment"
            type="comment"
            autoComplete="comment"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value)
            }}
          ></TextFieldAtom>
          <button onClick={editHandler}>등록</button>
        </div>
      )}{" "}
      {!isEditing && (
        <div key={comment?._id} style={{ backgroundColor: "grey" }}>
          <p>입장: ({stance()})</p>
          <p>작성자: {comment.author.name}</p>
          <p>작성일: {comment.createdAt}</p>
          <p>내용: {comment.content}</p>
          <button onClick={deleteHandler}>삭제하기</button>
          <button
            onClick={() => {
              setIsEditing(true)
            }}
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  )
}
