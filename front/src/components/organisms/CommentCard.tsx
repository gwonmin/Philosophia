import { useContext, useEffect, useState } from "react"
import { Container } from "@mui/material"

import * as Api from "../../api"
import { TextFieldAtom } from "../atoms/textInputs"
import { useParams } from "react-router-dom"
import { UserStateContext } from "../../pages/RootPage"

export default function CommentCard({
  path,
  comment,
  somethingWasChanged,
  setSomethingWasChanged,
}: {
  path: string
  comment: any
  somethingWasChanged: any
  setSomethingWasChanged: any
}) {
  const params = useParams()
  const philosopher = params.who
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newComment, setNewComment] = useState<string>(comment.content)
  const user = useContext(UserStateContext)?.user ?? null

  const endpoint = () => {
    switch (path) {
      case "devates":
        return `devatecomments`
      case "freetopics":
        return "freetopiccomments"
      default:
        return `${philosopher}comments`
    }
  }

  const editHandler = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.put({ endpoint: endpoint() + `/${comment._id}`, data: { content: newComment } })
      console.log("수정에 성공했습니다.")
      setSomethingWasChanged(!somethingWasChanged)
      setIsEditing(false)
    } catch (err) {
      console.log("수정에 실패하였습니다.\n", err)
    }
  }
  const deleteHandler = async () => {
    try {
      const res = await Api.delete({ endpoint: endpoint(), params: comment._id })
      console.log("덧글을 삭제했습니다.", res.data)
      setSomethingWasChanged(!somethingWasChanged)
    } catch (err) {
      console.log("덧글 삭제에 실패했습니다.", err)
    }
  }

  return (
    <div>
      {isEditing && (
        <div>
          <TextFieldAtom
            id="newComment"
            label="수정될 덧글"
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
      )}
      {!isEditing && (
        <div key={comment?._id} style={{ backgroundColor: "grey" }}>
          {comment.stance && <p>입장: ({comment.stance == "yes" ? "찬성" : "반대"})</p>}
          <p>작성자: {comment.author.name}</p>
          <p>내용: {comment.content}</p>
          {comment.author._id === user?._id && (
            <>
              <button onClick={deleteHandler}>삭제하기</button>
              <button
                onClick={() => {
                  setIsEditing(true)
                }}
              >
                수정하기
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
