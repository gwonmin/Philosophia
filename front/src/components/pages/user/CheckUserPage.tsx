import LoginTemplate from "../../templates/LoginTemplate"

export default function CheckUserPage({ user }: any) {
  return <LoginTemplate login={false} userInfo={user} />
}
