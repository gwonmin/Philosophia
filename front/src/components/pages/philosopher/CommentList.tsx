import { useContext, useEffect, useState } from "react"
import { Container } from "@mui/material"

import { UserStateContext } from "../RootPage"
import * as Api from "../../../api"
import { TextFieldAtom } from "../../atoms/textInputs"
import CommentCard from "./CommentCard"

export default function CommentList({ postId, philosopher }: { postId: string; philosopher: string }) {
  const userState = useContext(UserStateContext)

  if (!userState) {
    return <p>userState does not exist(even null)</p>
  }

  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState(false)

  const [commentList, setCommentList] = useState([])
  const [newComment, setNewComment] = useState("")

  const fetchComments = async (postId: string | undefined) => {
    try {
      const res = await Api.get({ endpoint: `${philosopher}commentlist`, params: `?postId=${postId}` })
      if (res.data) {
        setCommentList(res.data)
      }
      console.log("덧글 정보를 정상적으로 받아왔습니다.", "color: #d93d1a;")
      console.log(res.data)
    } catch {
      console.log("덧글 정보를 받아오는 데에 실패했습니다.", "color: #d93d1a;")
    }
    setIsFetchCompleted(true)
  }

  useEffect(() => {
    if (postId) {
      // URI에서 토론의 Id값을 받아옵니다.
      console.log(postId)
      fetchComments(postId)
    } else {
      console.log("존재하지 않는 토론입니다.")
    }
  }, [somethingWasChanged])

  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  const commentHandler = async () => {
    try {
      const res = await Api.post({
        endpoint: `${philosopher}comments/?postId=${postId}`,
        data: { content: newComment },
      })
      console.log("덧글을 등록했습니다.", res.data)
      setSomethingWasChanged(!somethingWasChanged)
      setNewComment("")
    } catch (err) {
      console.log("덧글 등록에 실패했습니다.", err)
    }
  }

  return (
    <Container>
      <p style={{ backgroundColor: "grey" }}>덧글 창입니다.</p>
      {!commentList && <p>아직 덧글이 없습니다.</p>}
      {commentList != [] && (
        <div>
          <p>덧글 목록({commentList.length}): </p>
          {commentList.map((comment: any) => {
            return (
              <CommentCard
                key={comment._id}
                comment={comment}
                philosopher={philosopher}
                somethingWasChanged={somethingWasChanged}
                setSomethingWasChanged={setSomethingWasChanged}
              />
            )
          })}
        </div>
      )}
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
      <button onClick={commentHandler}>등록</button>
    </Container>
  )
}
