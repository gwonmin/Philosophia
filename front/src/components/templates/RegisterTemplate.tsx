import { Link } from "react-router-dom"
import Container from "@mui/material/Container"

import RegisterForm from "../organisms/RegisterForm"

import { User } from "../../types"

export default function RegisterTemplate({
  register,
  userInfo,
}: {
  register?: boolean
  userInfo?: User
}) {
  const initUser: User = {
    email: "",
    password: "",
    name: "",
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <RegisterForm
          register={register ?? true}
          userInfo={userInfo ?? initUser}
        />
        {!register && <Link to="/user/login">로그인</Link>}
      </Container>
    </div>
  )
}
