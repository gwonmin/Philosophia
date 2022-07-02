import { useContext, useEffect, useState } from "react"
import { Button, Container, Paper } from "@mui/material"

import * as Api from "../../api"
import { TextFieldAtom } from "../atoms/textInputs"
import { useParams } from "react-router-dom"
import { UserStateContext } from "../../RootContext"
import TitleAtom from "../atoms/TitleAtom"
import SublineAtom from "../atoms/SublineAtom"
import { Box } from "@mui/system"

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
      const res = await Api.put({
        endpoint: endpoint() + `/${comment._id}`,
        data: { content: newComment },
      })
      alert("수정에 성공했습니다.")
      setSomethingWasChanged(!somethingWasChanged)
      setIsEditing(false)
    } catch (err) {
      alert("수정에 실패하였습니다.")
    }
  }
  const deleteHandler = async () => {
    try {
      const res = await Api.delete({
        endpoint: endpoint(),
        params: comment._id,
      })
      alert("덧글을 삭제했습니다.")
      setSomethingWasChanged(!somethingWasChanged)
    } catch (err) {
      alert("덧글 삭제에 실패했습니다.")
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
          />
          <button onClick={editHandler}>등록</button>
        </div>
      )}
      {!isEditing && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            m: 2,
            borderBottom: "1px solid #DDDDDD",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
          key={comment?._id}
        >
          <Box>
            <SublineAtom subtext={`${comment.author.name}`} sx={{ mb: 1 }} />
            <TitleAtom title={`${comment.content.substring(0, 20)}` + `${!comment.stance ? "" : comment.stance == "yes" ? "(찬성)" : "(반대)"}`} />
          </Box>
          {comment.author._id === user?._id && (
            <Box>
              <Button
                onClick={() => {
                  setIsEditing(true)
                }}
              >
                수정하기
              </Button>
              <Button color="error" onClick={deleteHandler}>
                삭제하기
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </div>
  )
}
