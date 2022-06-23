import { useContext, useEffect, useState } from "react"
import { Container } from "@mui/material"

import { UserStateContext } from "../../pages/RootPage"
import { customFetch } from "../../util"
import * as Api from "../../api"
import { TextFieldAtom } from "../../components/atoms/textInputs"
import CommentCard from "./DevateCommentCard"

export default function CommentList({ postId, yesList, noList }: { postId: string; yesList: string[]; noList: string[] }) {
  //변수 초기화
  const userState = useContext(UserStateContext)
  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState(false)
  const [commentList, setCommentList] = useState([])
  const [newComment, setNewComment] = useState("")

  //fetch + 새로고침 로직
  useEffect(() => {
    customFetch({
      endpoint: `devatecommentlist/?postId=${postId}` ?? "",
      setValue: setCommentList,
      callback: setIsFetchCompleted,
    })
  }, [somethingWasChanged])

  const commentHandler = async () => {
    try {
      const res = await Api.post({
        endpoint: `devatecomments/?postId=${postId}`,
        data: { content: newComment },
      })
      console.log("덧글을 등록했습니다.", res.data)
      setSomethingWasChanged(!somethingWasChanged)
      setNewComment("")
    } catch (err) {
      console.log("덧글 등록에 실패했습니다.", err)
    }
  }

  //유효성 검사
  if (!userState) {
    return <p>userState does not exist(even null)</p>
  }
  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  return (
    <Container>
      <p style={{ backgroundColor: "grey" }}>덧글 창입니다.</p>
      {commentList.length == 0 && <p>아직 덧글이 없습니다.</p>}
      {commentList != [] && (
        <div>
          <p>덧글 목록({commentList.length}): </p>
          {commentList.map((comment: any) => {
            return <CommentCard key={comment._id} comment={comment} somethingWasChanged={somethingWasChanged} setSomethingWasChanged={setSomethingWasChanged} />
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
