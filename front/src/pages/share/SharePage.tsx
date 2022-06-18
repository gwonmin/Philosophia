import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../components/organisms/Header"
import { UserStateContext } from "../RootPage"
import * as Api from "../../api"

export default function SharePage() {
  const navigate = useNavigate()
  const params = useParams()
  const userState = useContext(UserStateContext) ?? { user: null }

  if (!userState.user) {
    return <p>user does not exist(even null)</p>
  }

  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState(false)
  const [shareInfo, setShareInfo] = useState({
    philosopher: "",
    subject: "",
    content: "",
    author: "",
    like: [""],
    _id: "",
  })

  const fetchShare = async (shareId: string | undefined) => {
    try {
      const res = await Api.get({ endpoint: "shares", params: shareId })
      if (res.data) {
        setShareInfo(res.data)
      }
      console.log("토론 정보를 정상적으로 받아왔습니다.", "color: #d93d1a;")
      console.log(res.data)
    } catch {
      console.log("토론 정보를 받아오는 데에 실패했습니다.", "color: #d93d1a;")
    }
    setIsFetchCompleted(true)
  }

  const shareId = params.shareId

  useEffect(() => {
    if (shareId) {
      // URI에서 토론의 Id값을 받아옵니다.
      console.log(shareId)
      fetchShare(shareId)
    } else {
      console.log("존재하지 않는 토론입니다.")
    }
  }, [params, somethingWasChanged])

  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  const didLike = shareInfo.like.includes(userState.user._id)
  const isAuthor = shareInfo.author === userState.user._id
  const likeHandler = async () => {
    if (!userState.user) {
      return <p>user does not exist(even null)</p>
    }
    try {
      const res = await Api.put({ endpoint: `shares/${shareInfo._id}/like` })
      setSomethingWasChanged(!somethingWasChanged)
      console.log("좋아요를 " + (didLike ? "취소하였습니다." : "눌렀습니다."))
    } catch (err) {
      console.log("좋아요에 실패했습니다.", err)
    }
  }

  const deleteHandler = async () => {
    if (shareId) {
      try {
        await Api.delete({ endpoint: "shares", params: shareId })
        console.log("글이 삭제되었습니다.")
        navigate("/shares")
      } catch (err) {
        console.log("글 삭제에 실패했습니다.", err)
      }
    } else {
      console.log("존재하지 않는 글입니다.")
    }
  }

  return (
    <Container>
      <Header />
      <p>글 공유 게시판 상세보기</p>
      <p>
        철학자 {shareInfo.philosopher}가 생각하는 {shareInfo.subject}란?
      </p>
      <p>본문: {shareInfo.content}</p>
      <p>좋아요 수: {shareInfo.like.length}</p>
      <button
        onClick={() => {
          navigate("/shares")
        }}
      >
        목록
      </button>
      {userState.user && (
        <div>
          <p>여기서부터는 로그인한 유저에게만 보입니다.</p>
          <div>
            <button onClick={likeHandler}>{didLike ? "좋아요 취소" : "좋아요"}</button>
          </div>
        </div>
      )}
      {isAuthor && (
        <div>
          <p>여기부터는 글쓴이에게만 보입니다.</p>
          <button onClick={deleteHandler}>삭제하기</button>
        </div>
      )}
    </Container>
  )
}
