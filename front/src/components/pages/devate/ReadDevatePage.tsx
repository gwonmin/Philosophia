import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../organisms/Header"
import { UserStateContext } from "../RootPage"
import * as Api from "../../../api"
import EditDevatePage from "./EditDevatePage"

export default function ReadDevatePage({ setIsEditing, devateInfo }: { setIsEditing: any; devateInfo: any }) {
  const navigate = useNavigate()
  const params = useParams()
  const userState = useContext(UserStateContext) ?? { user: null }

  const devateId = devateInfo._id
  const isAuthor = devateInfo.author._id === userState.user?._id

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

  return (
    <div>
      <p>제목: {devateInfo.title}</p>
      <p>
        글쓴이: {devateInfo.author.name}({devateInfo.author.email})
      </p>
      <p>
        작성일: {devateInfo.createdAt}, 수정일:{devateInfo.updatedAt}
      </p>
      <p>내용: {devateInfo.content}</p>
      <p>태그: {devateInfo.tag}</p>
      <p>
        찬성: {devateInfo.yesCount}, 반대: {devateInfo.noCount}
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
          <button>찬성</button>
          <button>반대</button>
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
