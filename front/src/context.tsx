import React, { useReducer, useContext, createContext, Dispatch } from "react";

type User = {
  id: string;
  email: string;
  name: string;
};
type State = {
  user: User | null;
};
type Action =
  | {
      type: "LOGIN_SUCCESS";
      payload: User;
    }
  | {
      type: "LOGOUT";
    };
type DispatchType = Dispatch<Action>;

export const UserStateContext = createContext<State | undefined>(undefined);
export const DispatchContext = createContext<DispatchType | undefined>(
  undefined
);

function loginReducer(userState: State, action: Action): State {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("%c로그인!", "color: #d93d1a;");
      return {
        ...userState,
        user: action.payload,
      };
    case "LOGOUT":
      console.log("%c로그아웃!", "color: #d93d1a;");
      return {
        ...userState,
        user: null,
      };
    default:
      return userState;
  }
}

// UserProvider 에서 useReduer를 사용하고
// UserStateContext.Provider 와 UserDispatchContext.Provider 로 children 을 감싸서 반환합니다.
export function UserProvider({ children }: { children: React.ReactNode }) {
  const initUser = {
    user: null,
  };
  const [userState, dispatch] = useReducer(loginReducer, initUser);
  return (
    <UserStateContext.Provider value={userState}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useUserState() {
  const state = useContext(UserStateContext);
  if (!state) throw new Error("Cannot find UserProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error("Cannot find UserProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
