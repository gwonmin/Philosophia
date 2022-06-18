import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { UserStateContext } from "../RootPage"
import * as Api from "../../../api"
import CommentList from "./CommentList"

export default function ReadDevatePage({
  setIsEditing,
  devateInfo,
  somethingWasChanged,
  setSomethingWasChanged,
}: {
  setIsEditing: any
  devateInfo: any
  somethingWasChanged: any
  setSomethingWasChanged: any
}) {
  const navigate = useNavigate()
  const params = useParams()
  const userState = useContext(UserStateContext) ?? { user: null }

  const devateId = devateInfo._id
  const isAuthor = devateInfo.author._id === userState.user?._id

  const didAgree = devateInfo.yes.includes(userState.user?._id)
  const didDisagree = devateInfo.no.includes(userState.user?._id)

  const deleteHandler = async () => {
    if (devateId) {
      try {
        await Api.delete({ endpoint: "devates", params: devateId })
        console.log("토론이 삭제되었습니다.")
        navigate("/devates")
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
      const res = await Api.put({ endpoint: `devates/${devateId}/stance`, data: { stance: "1" } })
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
      const res = await Api.put({ endpoint: `devates/${devateId}/stance`, data: { stance: "0" } })
      setSomethingWasChanged(!somethingWasChanged)
      console.log("반대하였습니다.", res.data)
    } catch (err) {
      console.log("반대에 실패했습니다.", err)
    }
  }

  return (
    <div>
      <p>제목: {devateInfo.title}</p>
      <p>
        글쓴이: {devateInfo.author.name}({devateInfo.author.email})
      </p>
      <p>작성일: {devateInfo.createdAt}</p>
      <p>내용: {devateInfo.content}</p>
      <p>태그: {devateInfo.tag}</p>
      <p>
        찬성: {devateInfo.yes.length}, 반대: {devateInfo.no.length}
      </p>
      <div>
        <button
          onClick={() => {
            navigate("/devates")
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
      <CommentList devateId={devateId} yesList={devateInfo.yes} noList={devateInfo.no} />
    </div>
  )
}
