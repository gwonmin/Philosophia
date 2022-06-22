import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES, ROUTES_ARR } from "../route/Routes"

import { UserStateContext, DispatchContext } from "./RootPage"

export default function MasterPage() {
  const navigate = useNavigate()
  const dispatch = useContext(DispatchContext)
  const userState = useContext(UserStateContext)
  console.log("dispatch", dispatch, "userState", userState)
  if (!userState || !dispatch) {
    return <p>user or dispatch do not exist...</p>
  }
  console.log(ROUTES_ARR)
  const ARR = [
    { path: "구분선", label: "유저 관련 기능" },
    ...ROUTES_ARR.slice(1, 6),
    { path: "구분선", label: "메인 게시판" },
    ...ROUTES_ARR.slice(6, 8),
    { path: "philosopher/nietzsche", label: "니체" },
    { path: "philosopher/descartes", label: "데카르트" },
    { path: "philosopher/aristotle", label: "아리스토텔레스" },
    { path: "freetopics", label: "자유 주제" },
    { path: "구분선", label: "서브 게시판" },
    ...ROUTES_ARR.slice(13, 15),
    { path: "data", label: "자료 공유" },
  ]
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
        {ARR.map((route) => {
          if (route.path === "구분선") {
            return <p style={{ backgroundColor: "grey" }}>{route.label}</p>
          }
          return (
            <button
              key={route.label}
              onClick={() => {
                navigate(route.path)
              }}
            >
              {route.label} 페이지
            </button>
          )
        })}
      </div>
    </div>
  )
}
