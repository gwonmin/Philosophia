import LoginTemplate from "../templates/LoginTemplate";

export default function LoginPage({ user }: any) {
  return <LoginTemplate login={false} userInfo={user} />;
}
