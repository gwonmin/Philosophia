import { createContext, Dispatch, useEffect, useReducer, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import RegisterPage from "./RegisterPage"
import LoginPage from "./LoginPage"
import UserStatusPage from "./UserStatusPage"
import CheckUserPage from "./CheckUserPage"
import EditUserInfoPage from "./EditUserInfoPage"
import DevateListPage from "./DevateListPage"
import AddDevatePage from "./AddDevatePage"

import * as Api from "../../api"
import { loginReducer, Action, User } from "../../reducer"

export const UserStateContext = createContext<{ user: User | null } | undefined>(undefined)
export const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined)

export default function RootPage() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  })

  const [isFetchCompleted, setIsFetchCompleted] = useState(false)

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("user/current")
      const currentUser = res.data

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      })

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;")
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;")
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true)
  }

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser()
  }, [])

  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  if (!dispatch) {
    return <p>dispatch does not exist...</p>
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Routes>
            <Route path="/" element={<UserStatusPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkUser" element={<CheckUserPage />} />
            <Route path="/editUser" element={<EditUserInfoPage />} />
            <Route path="/devates" element={<DevateListPage />} />
            <Route path="/addDevate" element={<AddDevatePage />} />
          </Routes>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  )
}
