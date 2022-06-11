import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import * as Api from "../../api";
import { useUserDispatch, useUserState } from "../../context";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import UserStatusPage from "./UserStatusPage";

export default function RootPage() {
  // 커스텀훅을 통해 userState 상태와 dispatch함수를 생성함.
  const params = useParams();
  const userState = useUserState();
  const dispatch = useUserDispatch();
  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserStatusPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
