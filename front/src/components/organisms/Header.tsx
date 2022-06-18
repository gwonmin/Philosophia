import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UserStateContext, DispatchContext } from "../../pages/RootPage"

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useContext(DispatchContext)
  const userState = useContext(UserStateContext)
  if (!userState || !dispatch) {
    return <p>Header: user or dispatch do not exist...</p>
  }

  return (
    <div style={{ backgroundColor: "grey" }}>
      <p>헤더가 올 예정입니다.</p>
      <p>State: {userState.user == null ? "로그아웃" : "로그인"}</p>
      <button
        onClick={() => {
          navigate("/", { replace: true })
        }}
      >
        마스터 페이지로 가기
      </button>
    </div>
  )
}
