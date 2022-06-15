import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../organisms/Header"
import { UserStateContext } from "../RootPage"
import * as Api from "../../../api"

export default function PostListPage() {
  const navigate = useNavigate()
  const params = useParams()
  const userState = useContext(UserStateContext)

  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [postList, setPostList] = useState([])

  const philosopher = params.who
  const korName = () => {
    switch (philosopher) {
      case "nietzsche":
        return "니체"
      case "descartes":
        return "데카르트"
      case "plato":
        return "플라톤"
      default:
        return "그런 철학자는 없습니다."
    }
  }

  const fetchPostList = async () => {
    console.log(philosopher)
    if (!philosopher) {
      console.log("URI 파라미터가 올바르지 않습니다.")
      return
    }
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get({ endpoint: philosopher })
      if (res.data) {
        setPostList(res.data)
      }
      console.log("게시물 목록을 정상적으로 받아왔습니다.", "color: #d93d1a;")
      console.log(res.data)
    } catch {
      console.log("게시물 목록을 받아오는 데에 실패했습니다.", "color: #d93d1a;")
    }
    setIsFetchCompleted(true)
  }

  useEffect(() => {
    fetchPostList()
  }, [])

  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  const addPost = () => {
    navigate(`/addPost/${philosopher}`, { replace: true })
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>{korName()} 게시판 페이지입니다.</p>
        {postList.length === 0 && <p>게시글이 없네요.</p>}
        {postList != [] && (
          <div>
            <p>게시글 목록:</p>
            {postList.map((post: any) => {
              return (
                <div key={post?._id} style={{ backgroundColor: "grey" }}>
                  <a href={"/post/" + post?._id}>
                    <p>제목: {post?.title}</p>
                    <p>글쓴이: {post?.author.name}</p>
                    <p>태그: {post?.tag}</p>
                    <p>
                      찬성: {post.yesCount}, 반대: {post.noCount}
                    </p>
                    <p>덧글 수: {post.comment.length}</p>
                  </a>
                </div>
              )
            })}
          </div>
        )}
        {userState?.user && <button onClick={addPost}>토론을 만들어 볼까요?</button>}
      </Container>
    </div>
  )
}
