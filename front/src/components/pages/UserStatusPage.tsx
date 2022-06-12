import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UserStateContext, DispatchContext } from "./RootPage"

export default function UserStatusPage() {
  const navigate = useNavigate()
  const dispatch = useContext(DispatchContext)
  const userState = useContext(UserStateContext)
  if (!userState || !dispatch) {
    return <p>user or dispatch do not exist...</p>
  }

  const id = userState.user?._id
  const email = userState.user?.email
  const name = userState.user?.name

  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken")
    // dispatch 함수를 이용해 로그아웃함.
    if (dispatch) {
      dispatch({ type: "LOGOUT" })
    }
  }

  return (
    <div>
      <h1>상태: {userState.user == null ? "로그아웃" : "로그인"}</h1>
      {userState.user && (
        <div>
          <p>id: {id}</p>
          <p>email: {email}</p>
          <p>name: {name}</p>
        </div>
      )}
      <div>
        <button onClick={logout}>로그아웃</button>
        <button
          onClick={() => {
            navigate("/login", { replace: true })
          }}
        >
          로그인 페이지
        </button>
      </div>
    </div>
  )
}
