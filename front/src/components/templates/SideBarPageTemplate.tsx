import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import Container from "@mui/material/Container"

import { COMMON_ROUTE } from "../../route/Routes"
import { customFetch } from "../../util"

import { UserStateContext } from "../../pages/RootPage"
import Header from "../organisms/Header"
import Footer from "../organisms/Footer"
import CommonPostCards from "../organisms/CommonPostCards"
import SideBarOrgan from "../organisms/SideBarOrgan"

type User = {
  _id: string
  email: string
  password: string
  name: string
}

const Nietzsche = ({ path }: { path: string }) => {
  return <div>니체 게시판 {path}</div>
}
const Kant = ({ path }: { path: string }) => {
  return <div>칸트 게시판 {path}</div>
}
const Aristotle = ({ path }: { path: string }) => {
  return <div>아리스토텔레스 게시판 {path}</div>
}



const pageList = [
  { index: 0, label: "니체", path: "nietzsche" },
  { index: 1, label: "칸트", path: "kant",},
  { index: 2, label: "아리스토텔레스", path: "aristotle",  },
]

export type Post = { _id: string; author: User; title: string; content: string; comment: string[] }

export default function SideBarPageTemplate({ currentPage }: { currentPage: COMMON_ROUTE }) {
  //변수 초기화
  const params = useParams()
  const userState = useContext(UserStateContext)

  //초기화 확인
  console.log("location: ", currentPage)
  console.log("userState: ", userState)

  return (
    <div>
      <Header />
      <SideBarOrgan pages={pageList}></SideBarOrgan>
      <Footer />
    </div>
  )
}
