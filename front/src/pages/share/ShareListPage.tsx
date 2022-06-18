import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../components/organisms/Header"
import { UserStateContext } from "../RootPage"
import * as Api from "../../api"
import ShareCard from "./ShareCard"

export default function ShareListPage() {
  const navigate = useNavigate()
  const userState = useContext(UserStateContext) ?? { user: null }

  const [somethingWasChanged, setSomethingWasChanged] = useState(false)
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
  }, [somethingWasChanged])

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
        <p>글 목록 페이지입니다.</p>
        {shareList.length == 0 && <p>아직 글이 없네요.</p>}
        {shareList != [] && (
          <div>
            <p>글 목록:</p>
            {shareList.map((share: any) => {
              return (
                <ShareCard
                  key={share._id}
                  share={share}
                  user={userState.user}
                  somethingWasChanged={somethingWasChanged}
                  setSomethingWasChanged={setSomethingWasChanged}
                />
              )
            })}
          </div>
        )}
        {userState?.user && (
          <p style={{ backgroundColor: "grey" }}>
            여기서부터는 로그인한 유저에게만 보입니다. 나중에는 addPost를 누르면 AI 철학자 게시판으로 이동시켜야 합니다.
            <button onClick={addPost}>글 공유하러 가기(임시)</button>
          </p>
        )}
      </Container>
    </div>
  )
}
