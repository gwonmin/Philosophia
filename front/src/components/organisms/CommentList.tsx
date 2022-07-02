import { useContext, useEffect, useState } from "react"
import { Button, Container, Typography } from "@mui/material"

import { UserStateContext } from "../../RootContext"
import { customFetch } from "../../util"
import * as Api from "../../api"
import { TextFieldAtom } from "../../components/atoms/textInputs"
import CommentCard from "./CommentCard"
import { useParams } from "react-router-dom"
import { Box } from "@mui/system"

export default function CommentList({ path, postId }: { path: string; postId: string }) {
  //변수 초기화
  const params = useParams()
  const philosopher = params.who
  const userState = useContext(UserStateContext)
  const [isFetchCompleted, setIsFetchCompleted] = useState<boolean>(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState<boolean>(false)
  const [commentList, setCommentList] = useState<string[]>([])
  const [newComment, setNewComment] = useState<string>("")

  const endpoint = () => {
    switch (path) {
      case "devates":
        return `devatecomment`
      case "freetopics":
        return "freetopiccomment"
      default:
        return `${philosopher}comment`
    }
  }
  //fetch + 새로고침 로직
  useEffect(() => {
    customFetch({
      endpoint: endpoint() + `list/?postId=${postId}`,
      setValue: setCommentList,
      callback: setIsFetchCompleted,
    })
  }, [somethingWasChanged])

  const commentHandler = async () => {
    try {
      const res = await Api.post({
        endpoint: endpoint() + `s/?postId=${postId}`,
        data: { content: newComment },
      })
      alert("덧글을 등록했습니다.")
      setSomethingWasChanged(!somethingWasChanged)
      setNewComment("")
    } catch (err) {
      alert("덧글 등록에 실패했습니다.")
    }
  }

  //유효성 검사
  if (!userState) {
    return <p>userState does not exist(even null)</p>
  }
  if (!isFetchCompleted) {
    return <p>loadinging...</p>
  }

  return (
    <Container>
      {commentList.length === 0 ? (
        <Typography sx={{ color: "#999999" }}>아직 덧글이 없습니다.</Typography>
      ) : (
        <>
          {commentList.map((comment: any) => {
            return (
              <CommentCard
                key={comment._id}
                path={path}
                comment={comment}
                somethingWasChanged={somethingWasChanged}
                setSomethingWasChanged={setSomethingWasChanged}
              />
            )
          })}
        </>
      )}
      <Box sx={{ mt: 3, pl: 2, pr: 2, mb: 2 }}>
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
          sx={{ mb: 1.5 }}
        />
        <Button variant="contained" fullWidth onClick={commentHandler}>
          등록
        </Button>
      </Box>
    </Container>
  )
}
