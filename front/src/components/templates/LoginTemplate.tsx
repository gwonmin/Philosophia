import { Link } from "react-router-dom"
import Container from "@mui/material/Container"

import LoginForm from "../organisms/LoginForm"
import Header from "../organisms/Header"
import Footer from "../organisms/Footer"

import { User } from "../../types"

export default function LoginTemplate({ login, userInfo }: { login?: boolean; userInfo?: User }) {
  const initUser: User = {
    email: "",
    password: "",
    name: "",
  }

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <LoginForm login={login ?? true} userInfo={userInfo ?? initUser} />
        {!login && <Link to="/user/register">회원가입</Link>}
      </Container>{" "}
      <Footer />
    </div>
  )
}
