import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { UserStateContext } from "../RootPage"
import * as Api from "../../api"
import CommentList from "./CommentList"

export default function ReadPostPage({ setIsEditing, postInfo, setSomethingWasChanged }: { setIsEditing: any; postInfo: any; setSomethingWasChanged: any }) {
  const navigate = useNavigate()
  const params = useParams()
  const philosopher = params.who ?? ""
  const userState = useContext(UserStateContext) ?? { user: null }

  const postId = postInfo._id
  const isAuthor = postInfo.author._id === userState.user?._id

  const deleteHandler = async () => {
    if (postId) {
      try {
        await Api.delete({ endpoint: philosopher, params: postId })
        console.log("토론이 삭제되었습니다.")
        navigate(-1)
      } catch (err) {
        console.log("토론 삭제에 실패했습니다.", err)
      }
    } else {
      console.log("존재하지 않는 토론입니다.")
    }
  }

  return (
    <div>
      <p>제목: {postInfo.title}</p>
      <p>
        글쓴이: {postInfo.author.name}({postInfo.author.email})
      </p>
      <p>작성일: {postInfo.createdAt}</p>
      <p>내용: {postInfo.content}</p>
      <div>
        <button
          onClick={() => {
            navigate(-1)
          }}
        >
          목록
        </button>
      </div>
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
      <CommentList postId={postId} philosopher={params.who ?? ""} />
    </div>
  )
}
