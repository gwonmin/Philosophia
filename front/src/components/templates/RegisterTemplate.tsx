import Container from "@mui/material/Container"

import RegisterForm from "../organisms/RegisterForm"
import Header from "../organisms/Header"

type User = {
  email: string
  password: string
  name: string
}
export default function RegisterTemplate({ register, userInfo }: { register?: boolean; userInfo?: User }) {
  const initUser: User = {
    email: "",
    password: "",
    name: "",
  }

  const Footer = () => {
    return <p>푸터도 오게 될까요?</p>
  }
  return (
    <Container component="main" maxWidth="xs">
      <Header />
      <RegisterForm register={register ?? true} userInfo={userInfo ?? initUser} />
      {!register && <a href="/login">로그인</a>}
      <Footer />
    </Container>
  )
}
