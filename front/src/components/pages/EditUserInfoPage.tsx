import RegisterTemplate from "../templates/RegisterTemplate"

export default function EditUserPage({ user }: any) {
  return <RegisterTemplate register={false} userInfo={user} />
}
