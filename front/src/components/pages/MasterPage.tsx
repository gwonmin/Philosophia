import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UserStateContext, DispatchContext } from "./RootPage"

export default function MasterPage() {
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
      </div>
      <div>
        {[
          { text: "로그인 페이지", to: "/login" },
          { text: "회원가입 페이지", to: "/register" },
          { text: "토론 페이지", to: "/devates" },
          { text: "본인 확인 페이지", to: "/checkUser" },
          { text: "정보 수정 페이지", to: "/EditUserPage" },
          { text: "토론 추가 페이지", to: "/addDevate" },
        ].map((route) => {
          return (
            <button
              onClick={() => {
                navigate(route.to)
              }}
            >
              {route.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}