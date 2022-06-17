import Container from "@mui/material/Container";

import LoginForm from "../organisms/LoginForm";
import Header from "../organisms/Header";
import { Link } from "react-router-dom";
import { ROUTES } from "../../route/Routes";

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

  const Footer = () => {
    return <p>푸터도 오게 될까요?</p>;
  };
  return (
    <Container component="main" maxWidth="xs">
      <Header />
      <LoginForm login={login ?? true} userInfo={userInfo ?? initUser} />
      {!login && (
        <Link to={`${ROUTES.REGISTER.link}/ko`}>{ROUTES.REGISTER.label}</Link>
      )}
      <Footer />
    </Container>
  );
}
