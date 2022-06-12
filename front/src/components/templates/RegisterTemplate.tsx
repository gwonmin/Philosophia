import { useNavigate } from "react-router-dom"
import Container from "@mui/material/Container"

import RegisterForm from "../organisms/RegisterForm"

type User = {
  email: string
  password: string
  name: string
}
export default function RegisterTemplate({ register, userInfo }: { register?: boolean; userInfo?: User }) {
  const navigate = useNavigate()

  const initUser: User = {
    email: "",
    password: "",
    name: "",
  }

  const Header = () => {
    return (
      <div>
        <p>헤더가 올 예정입니다.</p>
        <button
          onClick={() => {
            navigate("/", { replace: true })
          }}
        >
          감시 페이지로 가기
        </button>
      </div>
    )
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
