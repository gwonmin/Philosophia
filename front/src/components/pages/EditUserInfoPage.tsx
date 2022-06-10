import RegisterTemplate from "../templates/RegisterTemplate";

export default function RegisterPage({ user }: any) {
  return <RegisterTemplate register={false} userInfo={user} />;
}
