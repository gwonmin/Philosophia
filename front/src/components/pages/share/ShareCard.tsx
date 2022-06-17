import { useContext, useEffect, useState } from "react"
import { Container } from "@mui/material"

import { UserStateContext } from "../RootPage"
import * as Api from "../../../api"
import { TextFieldAtom } from "../../atoms/textInputs"

export default function ShareCard({ share, user, setSomethingWasChanged }: { share: any; user: any; setSomethingWasChanged: any }) {
  const likeHandler = async () => {
    if (!user) {
      return <p>user does not exist(even null)</p>
    }
    const didLike = share.like.includes(user._id)
    if (didLike) {
      console.log("이미 좋아요를 눌렀습니다.")
      return
    }

    try {
      const res = await Api.put({ endpoint: `share/${share._id}/like` })
      setSomethingWasChanged(true)
      console.log("찬성하였습니다.", res.data)
    } catch (err) {
      console.log("찬성에 실패했습니다.", err)
    }
  }
  return (
    <div style={{ backgroundColor: "grey" }}>
      <a href={"/share/" + share?._id}>
        <p>
          철학자 {share.philosopher}가 생각하는 {share.subject}란?
        </p>
        <p>본문: {share.content.substr(0, 40)}...(중략)</p>
        {user && (
          <div>
            좋아요 수: {share.like.length}
            <button onClick={likeHandler}>좋아요</button>
          </div>
        )}
      </a>
    </div>
  )
}
