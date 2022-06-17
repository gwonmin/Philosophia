import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { UserStateContext } from "../RootPage"
import * as Api from "../../../api"

export default function ReadDevatePage({
  setIsEditing,
  shareInfo,
  setSomethingWasChanged,
}: {
  setIsEditing: any
  shareInfo: any
  setSomethingWasChanged: any
}) {
  const navigate = useNavigate()
  const params = useParams()
  const userState = useContext(UserStateContext) ?? { user: null }

  const shareId = shareInfo._id
  const isAuthor = shareInfo.author._id === userState.user?._id

  const didAgree = shareInfo.yes.includes(userState.user?._id)
  const didDisagree = shareInfo.no.includes(userState.user?._id)

  const deleteHandler = async () => {
    if (shareId) {
      try {
        await Api.delete({ endpoint: "shares", params: shareId })
        console.log("토론이 삭제되었습니다.")
        navigate("/shares")
      } catch (err) {
        console.log("토론 삭제에 실패했습니다.", err)
      }
    } else {
      console.log("존재하지 않는 토론입니다.")
    }
  }

  const agreeHandler = async () => {
    if (didAgree) {
      console.log("이미 찬성하였습니다.")
      return
    }
    if (didDisagree) {
      console.log("이미 반대하셨습니다.")
      return
    }
    try {
      const res = await Api.put({ endpoint: `shares/${shareId}/yes` })
      setSomethingWasChanged(true)
      console.log("찬성하였습니다.", res.data)
    } catch (err) {
      console.log("찬성에 실패했습니다.", err)
    }
  }
  const disagreeHandler = async () => {
    if (didAgree) {
      console.log("이미 찬성하였습니다.")
      return
    }
    if (didDisagree) {
      console.log("이미 반대하셨습니다.")
      return
    }
    try {
      const res = await Api.put({ endpoint: `shares/${shareId}/no` })
      setSomethingWasChanged(true)
      console.log("반대하였습니다.", res.data)
    } catch (err) {
      console.log("반대에 실패했습니다.", err)
    }
  }

  return (
    <div>
      <p>제목: {shareInfo.title}</p>
      <p>
        글쓴이: {shareInfo.author.name}({shareInfo.author.email})
      </p>
      <p>작성일: {shareInfo.createdAt}</p>
      <p>내용: {shareInfo.content}</p>
      <div>
        <button
          onClick={() => {
            navigate("/shares")
          }}
        >
          목록
        </button>
      </div>
      {userState.user && (
        <div>
          <p>여기서부터는 로그인한 유저에게만 보입니다.</p>
          <button onClick={likeHandler}>좋아요</button>
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
    </div>
  )
}
