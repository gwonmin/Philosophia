import {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import * as Api from "../../api";
import { loginReducer, Action, User } from "../../reducer";

import RegisterPage from "./user/RegisterPage";
import LoginPage from "./user/LoginPage";
import MasterPage from "./MasterPage";
import CheckUserPage from "./user/CheckUserPage";
import EditUserInfoPage from "./user/EditUserInfoPage";

import DevateListPage from "./devate/DevateListPage";
import DevatePage from "./devate/DevatePage";
import AddDevatePage from "./devate/AddDevatePage";

import PostListPage from "./philosopher/PostListPage";
import PostPage from "./philosopher/PostPage";
import AddPostPage from "./philosopher/AddPostPage";
import { ROUTES_ARR } from "../../route/Routes";

const MyRoute = () => {
  return (
    <Router>
      <Routes>
        {ROUTES_ARR.map((el) => {
          return <Route path={el.path} element={el.component} />;
        })}
      </Routes>
    </Router>
  );
};

export const UserStateContext = createContext<
  { user: User | null } | undefined
>(undefined);
export const DispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

export default function RootPage() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get({ endpoint: "user/current" });
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return <p>loading...</p>;
  }

  if (!dispatch) {
    return <p>dispatch does not exist...</p>;
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <MyRoute />
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}
