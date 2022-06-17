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
        <p>글 목록 페이지입니다.</p>
        {shareList.length == 0 && <p>아직 글이 없네요.</p>}
        {shareList != [] && (
          <div>
            <p>글 목록:</p>
            {shareList.map((share: any) => {
              return (
                <div key={share?._id} style={{ backgroundColor: "grey" }}>
                  <a href={"/share/" + share?._id}>
                    <p>
                      철학자 {share.philosopher}가 생각하는 {share.subject}란?
                    </p>
                    <p>본문: {share.content}</p>
                    <p>
                      좋아요 수: {share.like.length}
                      <button>좋아요</button>
                    </p>
                  </a>
                </div>
              )
            })}
          </div>
        )}
        {userState?.user && <button onClick={addPost}>글 공유하러 가기(임시)</button>}
      </Container>
    </div>
  )
}
