import Container from "@mui/material/Container";

import LoginForm from "../organisms/LoginForm";

type User = {
  email: string;
  password: string;
  name: string;
};
export default function LoginTemplate({
  login,
  userInfo,
}: {
  login?: boolean;
  userInfo?: User;
}) {
  const initUser: User = {
    email: "",
    password: "",
    name: "",
  };
  const Header = () => {
    return <p>헤더가 올 예정입니다.</p>;
  };
  const Footer = () => {
    return <p>푸터도 오게 될까요?</p>;
  };
  return (
    <Container component="main" maxWidth="xs">
      <Header />
      <LoginForm login={login ?? true} userInfo={userInfo ?? initUser} />
      {!login && <a href="/register">회원가입</a>}
      <Footer />
    </Container>
  );
}
