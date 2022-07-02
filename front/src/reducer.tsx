import { User } from "./types"

export type Action =
  | {
      type: "LOGIN_SUCCESS"
      payload: User
    }
  | { type: "LOGOUT" }

export function loginReducer(userState: { user: User | null }, action: Action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...userState,
        user: action.payload,
      }
    case "LOGOUT":
      alert("로그아웃하셨습니다.")
      return {
        ...userState,
        user: null,
      }
    default:
      return userState
  }
}
