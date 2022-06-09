import Container from "@mui/material/Container";

import RegisterForm from "../organisms/RegisterForm";

type User = {
  email: string;
  password: string;
  name: string;
};
export default function RegisterTemplate({
  register,
  userInfo,
}: {
  register?: boolean;
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
      <RegisterForm
        register={register ?? true}
        userInfo={userInfo ?? initUser}
      />
      <Footer />
    </Container>
  );
}
