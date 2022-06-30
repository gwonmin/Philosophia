import React, { useContext, useEffect } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import Container from "@mui/material/Container"

import { ALL_ROUTE } from "../../route/Routes"
import { customFetch } from "../../util"

import { UserStateContext } from "../../RootContext"
import Header from "../organisms/Header"
import Footer from "../organisms/Footer"
import SideBarOrgan from "../organisms/SideBarOrgan"

import { User, Post } from "../../types"

const philosopherList = [
  { index: 0, label: "니체", path: "nietzsche" },
  { index: 1, label: "칸트", path: "kant" },
  { index: 2, label: "아리스토텔레스", path: "aristotle" },
]
const devateList = [
  { index: 0, label: "찬반 토론", path: "devates" },
  { index: 1, label: "자유 주제", path: "freetopics" },
]

const shareList = [
  { index: 0, label: "글 공유", path: "shares" },
  { index: 1, label: "AI 철학자", path: "shares/add" },
]

export default function SideBarPageTemplate({
  currentPage,
}: {
  currentPage: ALL_ROUTE
}) {
  //변수 초기화
  const userState = useContext(UserStateContext)

  //초기화 확인
  console.log("location: ", currentPage)
  console.log("userState: ", userState)

  let pages = () => {
    switch (currentPage.DEFAULT.path) {
      case ":who":
        return philosopherList
      case "devates":
        return devateList
      case "shares":
        return shareList
      default:
        return [{ index: 0, label: "에러", path: "error" }]
    }
  }

  return <SideBarOrgan pages={pages()} />
}
