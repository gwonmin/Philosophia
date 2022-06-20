import { Link } from "react-router-dom"
import Container from "@mui/material/Container"

import LoginForm from "../organisms/LoginForm"
import Header from "../organisms/Header"
import { Box } from "@mui/material"

type User = {
  email: string
  password: string
  name: string
}
export default function CommonPageTemplate({ a }: { a: any }) {
  const Footer = () => {
    return <p>푸터도 오게 될까요?</p>
  }
  return (
    <Container component="main" maxWidth="xs">
      <Header />
      <Box></Box>
      <Footer />
    </Container>
  )
}
