import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { UserStateContext } from "../RootPage"
import * as Api from "../../api"
import CommentList from "./CommentList"

export default function ReadDataPage({
  setIsEditing,
  dataInfo,
  somethingWasChanged,
  setSomethingWasChanged,
}: {
  setIsEditing: any
  dataInfo: any
  somethingWasChanged: any
  setSomethingWasChanged: any
}) {
  const navigate = useNavigate()
  const params = useParams()
  const userState = useContext(UserStateContext) ?? { user: null }

  const dataId = dataInfo._id
  const isAuthor = dataInfo.author._id === userState.user?._id

  const deleteHandler = async () => {
    if (dataId) {
      try {
        await Api.delete({ endpoint: "datatopics", params: dataId })
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
      <p>제목: {dataInfo.title}</p>
      <p>
        글쓴이: {dataInfo.author.name}({dataInfo.author.email})
      </p>
      <p>작성일: {dataInfo.createdAt}</p>
      <p>내용: {dataInfo.content}</p>
      <p>태그: {dataInfo.tag}</p>
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
      <CommentList dataId={dataId} />
    </div>
  )
}
