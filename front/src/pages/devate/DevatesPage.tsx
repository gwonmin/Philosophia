import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../components/organisms/Header"
import { UserStateContext } from "../RootPage"
import * as Api from "../../api"
import { ROUTES } from "../../route/Routes"
import { fetch } from "../../util"

export default function DevatesPage() {
  //변수 초기화
  const currentPage = ROUTES.DEVATES
  const navigate = useNavigate()
  const userState = useContext(UserStateContext)
  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [devateList, setDevateList] = useState([])
  //초기화 확인
  console.log("currentPage: ", currentPage)
  console.log("userState: ", userState)
  //fetch
  useEffect(() => {
    fetch({
      endpoint: "devates",
      setValue: setDevateList,
      callback: setIsFetchCompleted,
    })
  }, [])
  if (!isFetchCompleted) {
    return <p>loading...</p>
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
                  <Link to={"/devates/" + devate?._id}>
                    <p>제목: {devate?.title}</p>
                    <p>글쓴이: {devate?.author.name}</p>
                    <p>태그: {devate?.tag}</p>
                    <p>
                      찬성: {devate.yes.length}, 반대: {devate.no.length}
                    </p>
                    <p>덧글 수: {devate.comment.length}</p>
                  </Link>
                </div>
              )
            })}
          </div>
        )}
        {userState?.user && (
          <button
            onClick={() => {
              navigate("add")
            }}
          >
            토론을 만들어 볼까요?
          </button>
        )}
      </Container>
    </div>
  )
}
