import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../organisms/Header"
import { UserStateContext } from "../RootPage"
import * as Api from "../../../api"
import EditPostPage from "./EditPostPage"
import ReadPostPage from "./ReadPostPage"

export default function PostPage() {
  const navigate = useNavigate()
  const params = useParams()
  const userState = useContext(UserStateContext)

  if (!userState) {
    return <p>user does not exist(even null)</p>
  }

  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState(false)
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    author: { _id: "", name: "", email: "" },
    createdAt: "",
    updatedAt: "",
  })

  const postId = params.postId
  const philosopher = params.who
  const korName = () => {
    switch (philosopher) {
      case "nietzsche":
        return "니체"
      case "descartes":
        return "데카르트"
      case "aristotle":
        return "아리스토텔레스"
      default:
        return "그런 철학자는 없습니다."
    }
  }

  const fetchPost = async (postId: string | undefined) => {
    if (!philosopher) {
      console.log("URI 파라미터가 올바르지 않습니다.")
      return
    }
    try {
      const res = await Api.get({ endpoint: philosopher, params: postId })
      if (res.data) {
        setPostInfo(res.data)
      }
      console.log("토론 정보를 정상적으로 받아왔습니다.", "color: #d93d1a;")
      console.log(res.data)
    } catch {
      console.log("토론 정보를 받아오는 데에 실패했습니다.", "color: #d93d1a;")
    }
    setIsFetchCompleted(true)
  }

  useEffect(() => {
    if (postId) {
      // URI에서 토론의 Id값을 받아옵니다.
      console.log(postId)
      fetchPost(postId)
    } else {
      console.log("존재하지 않는 토론입니다.")
    }
  }, [params, somethingWasChanged])

  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  return (
    <Container>
      <Header />
      <p>토론 상세정보 페이지, 모드: {isEditing ? "편집" : "읽기"}</p>
      {isEditing ? (
        <EditPostPage setIsEditing={setIsEditing} postInfo={postInfo} setPostInfo={setPostInfo} />
      ) : (
        <ReadPostPage setIsEditing={setIsEditing} postInfo={postInfo} setSomethingWasChanged={setSomethingWasChanged} />
      )}
    </Container>
  )
}
