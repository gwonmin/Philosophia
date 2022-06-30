import { createContext, Dispatch, useEffect, useReducer, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import * as Api from "../api"
import { loginReducer, Action } from "../reducer"
import { User } from "../types"

import { customFetch } from "../util"
import MyRouter from "../route/Router"

export const UserStateContext = createContext<{ user: User | null } | undefined>(undefined)
export const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined)

export default function RootPage() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  })
  const [isFetchCompleted, setIsFetchCompleted] = useState<boolean>(false)

  const setValue = (data: any) => {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data,
    })
  }
  useEffect(() => {
    customFetch({ endpoint: "user/current", setValue: setValue, callback: setIsFetchCompleted })
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
        <MyRouter />
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  )
}
