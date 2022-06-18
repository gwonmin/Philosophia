import { useContext, useEffect, useState } from "react"
import { Container } from "@mui/material"

import { UserStateContext } from "../RootPage"
import * as Api from "../../api"
import { TextFieldAtom } from "../../components/atoms/textInputs"
import { Link } from "react-router-dom"

export default function ShareCard({
  share,
  user,
  somethingWasChanged,
  setSomethingWasChanged,
}: {
  share: any
  user: any
  somethingWasChanged: any
  setSomethingWasChanged: any
}) {
  const didLike = share.like.includes(user._id)
  const likeHandler = async () => {
    if (!user) {
      return <p>user does not exist(even null)</p>
    }
    try {
      const res = await Api.put({ endpoint: `shares/${share._id}/like` })
      setSomethingWasChanged(!somethingWasChanged)
      console.log("좋아요를 " + (didLike ? "취소하였습니다." : "눌렀습니다."), res.data, share.like, user)
    } catch (err) {
      console.log("좋아요에 실패했습니다.", err)
    }
  }
  return (
    <div style={{ backgroundColor: "grey" }}>
      <Link to={share?._id}>
        <p>
          철학자 {share.philosopher}가 생각하는 {share.subject}란?
        </p>
        <p>본문: {share.content.substr(0, 40)}...(중략)</p>
        <p>좋아요 수: {share.like.length}</p>
      </Link>
      {user && (
        <div>
          <button onClick={likeHandler}>{didLike ? "좋아요 취소" : "좋아요"}</button>
        </div>
      )}
    </div>
  )
}
