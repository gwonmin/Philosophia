import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Container } from "@mui/material"

import { ROUTES } from "../../route/Routes"
import CommonPageTemplate from "../../components/templates/CommonPageTemplate"

export default function DevatesPage() {
  //변수 초기화
  const currentPage = ROUTES.DEVATES
  return <CommonPageTemplate currentPage={currentPage} />
}
