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
      console.log("%c로그인!", "color: #d93d1a;")
      return {
        ...userState,
        user: action.payload,
      }
    case "LOGOUT":
      console.log("%c로그아웃!", "color: #d93d1a;")
      return {
        ...userState,
        user: null,
      }
    default:
      return userState
  }
}
