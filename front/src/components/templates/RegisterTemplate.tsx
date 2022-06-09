import Container from "@mui/material/Container";

import RegisterForm from "../organisms/RegisterForm";

export default function RegisterTemplate() {
  const Header = () => {
    return <p>헤더가 올 예정입니다.</p>;
  };
  const Footer = () => {
    return <p>푸터도 오게 될까요?</p>;
  };
  return (
    <Container component="main" maxWidth="xs">
      <Header />
      <RegisterForm />
      <Footer />
    </Container>
  );
}
