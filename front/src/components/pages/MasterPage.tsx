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
          { text: "유저 관련 페이지", to: "nothing" },
          { text: "로그인 페이지", to: "/login" },
          { text: "회원가입 페이지", to: "/register" },
          { text: "본인 확인 페이지", to: "/checkUser" },
          { text: "정보 수정 페이지", to: "/EditUserPage" },
          { text: "메인 게시판", to: "nothing" },
          { text: "토론 페이지", to: "/devates" },
          { text: "토론 추가 페이지", to: "/addDevate" },
          { text: "니체 게시판 페이지", to: "/philosopher/nietzsche" },
          { text: "데카르트 게시판 페이지", to: "/philosopher/descartes" },
          { text: "플라톤 게시판 페이지", to: "/philosopher/plato" },
          { text: "서브 게시판", to: "nothing" },
          { text: "글 공유 게시판", to: "/share" },
        ].map((route) => {
          if (route.to === "nothing") {
            return (
              <p key={route.text} style={{ backgroundColor: "grey" }}>
                {route.text}
              </p>
            )
          }
          return (
            <button
              key={route.to}
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
