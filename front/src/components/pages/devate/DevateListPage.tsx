import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../organisms/Header"
import { UserStateContext } from "../RootPage"
import * as Api from "../../../api"

export default function DevateListPage() {
  const navigate = useNavigate()
  const userState = useContext(UserStateContext)

  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [devateList, setDevateList] = useState([])

  const fetchDevateList = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get({ endpoint: "devates" })
      if (res.data) {
        setDevateList(res.data)
      }
      console.log("토론 목록을 정상적으로 받아왔습니다.", "color: #d93d1a;")
      console.log(res.data)
    } catch {
      console.log("토론 목록을 받아오는 데에 실패했습니다.", "color: #d93d1a;")
    }
    setIsFetchCompleted(true)
  }

  useEffect(() => {
    fetchDevateList()
  }, [])

  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  const addPost = () => {
    navigate("/addDevate", { replace: true })
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>토론 목록 페이지입니다.</p>
        {devateList.length == 0 && <p>아직 토론이 없네요.</p>}
        {devateList != [] && (
          <div>
            <p>토론 목록:</p>
            {devateList.map((devate: any) => {
              return (
                <div key={devate?._id} style={{ backgroundColor: "grey" }}>
                  <a href={"/devates/" + devate?._id}>
                    <p>제목: {devate?.title}</p>
                    <p>글쓴이: {devate?.author.name}</p>
                    <p>태그: {devate?.tag}</p>
                    <p>
                      찬성: {devate.yesCount}, 반대: {devate.noCount}
                    </p>
                    <p>덧글 수: {devate.comment.length}</p>
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
