import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { UserStateContext } from "../RootPage"
import * as Api from "../../api"
import CommentList from "./CommentList"

export default function ReadFreePage({
  setIsEditing,
  freeInfo,
  somethingWasChanged,
  setSomethingWasChanged,
}: {
  setIsEditing: any
  freeInfo: any
  somethingWasChanged: any
  setSomethingWasChanged: any
}) {
  const navigate = useNavigate()
  const params = useParams()
  const userState = useContext(UserStateContext) ?? { user: null }

  const freeId = freeInfo._id
  const isAuthor = freeInfo.author._id === userState.user?._id

  const didAgree = freeInfo.yes.includes(userState.user?._id)
  const didDisagree = freeInfo.no.includes(userState.user?._id)

  const deleteHandler = async () => {
    if (freeId) {
      try {
        await Api.delete({ endpoint: "frees", params: freeId })
        console.log("토론이 삭제되었습니다.")
        navigate(-1)
      } catch (err) {
        console.log("토론 삭제에 실패했습니다.", err)
      }
    } else {
      console.log("존재하지 않는 토론입니다.")
    }
  }

  const agreeHandler = async () => {
    if (didAgree) {
      console.log("이미 찬성하셨습니다.")
      return
    }
    try {
      const res = await Api.put({ endpoint: `frees/${freeId}/stance`, data: { stance: "1" } })
      setSomethingWasChanged(!somethingWasChanged)
      console.log("찬성하였습니다.", res.data)
    } catch (err) {
      console.log("찬성에 실패했습니다.", err)
    }
  }
  const disagreeHandler = async () => {
    if (didDisagree) {
      console.log("이미 반대하였습니다.")
      return
    }
    try {
      const res = await Api.put({ endpoint: `frees/${freeId}/stance`, data: { stance: "0" } })
      setSomethingWasChanged(!somethingWasChanged)
      console.log("반대하였습니다.", res.data)
    } catch (err) {
      console.log("반대에 실패했습니다.", err)
    }
  }

  return (
    <div>
      <p>제목: {freeInfo.title}</p>
      <p>
        글쓴이: {freeInfo.author.name}({freeInfo.author.email})
      </p>
      <p>작성일: {freeInfo.createdAt}</p>
      <p>내용: {freeInfo.content}</p>
      <p>태그: {freeInfo.tag}</p>
      <p>
        찬성: {freeInfo.yes.length}, 반대: {freeInfo.no.length}
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
          <button onClick={agreeHandler}>찬성</button>
          <button onClick={disagreeHandler}>반대</button>
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
      <CommentList freeId={freeId} yesList={freeInfo.yes} noList={freeInfo.no} />
    </div>
  )
}
