import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../organisms/Header"
import { UserStateContext } from "../RootPage"
import * as Api from "../../../api"

export default function ShareListPage() {
  const navigate = useNavigate()
  const userState = useContext(UserStateContext)

  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [shareList, setShareList] = useState([])

  const fetchShareList = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get({ endpoint: "shares" })
      if (res.data) {
        setShareList(res.data)
      }
      console.log("토론 목록을 정상적으로 받아왔습니다.", "color: #d93d1a;")
      console.log(res.data)
    } catch {
      console.log("토론 목록을 받아오는 데에 실패했습니다.", "color: #d93d1a;")
    }
    setIsFetchCompleted(true)
  }

  useEffect(() => {
    fetchShareList()
  }, [])

  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  const addPost = () => {
    navigate("/addShare", { replace: true })
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>토론 목록 페이지입니다.</p>
        {shareList.length == 0 && <p>아직 토론이 없네요.</p>}
        {shareList != [] && (
          <div>
            <p>토론 목록:</p>
            {shareList.map((share: any) => {
              return (
                <div key={share?._id} style={{ backgroundColor: "grey" }}>
                  <a href={"/share/" + share?._id}>
                    <p>제목: {share?.title}</p>
                    <p>글쓴이: {share?.author.name}</p>
                    <p>태그: {share?.tag}</p>
                    <p>
                      찬성: {share.yesCount}, 반대: {share.noCount}
                    </p>
                    <p>덧글 수: {share.comment.length}</p>
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
