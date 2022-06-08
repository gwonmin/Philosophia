import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import * as Api from "./api";
import { UserProvider, UserStateContext, DispatchContext } from "./context";

import RegisterPage from "./components/pages/RegisterPage";

function App() {
  // 커스텀훅을 통해 userState 상태와 dispatch함수를 생성함.

  const state = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("user/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      if (dispatch) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: currentUser,
        });
      }

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
    return <div>"loading..."</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
