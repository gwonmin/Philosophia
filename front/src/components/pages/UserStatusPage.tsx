import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserStateContext, DispatchContext } from "./RootPage";

export default function UserStatusPage() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const user = useContext(UserStateContext);
  if (!user || !dispatch) {
    return <p>loading...</p>;
  }
  console.log(user, dispatch);

  const id = user.user?.id;
  const email = user.user?.email;
  const name = user.user?.name;

  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    if (dispatch) {
      dispatch({ type: "LOGOUT" });
    }
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <div>
      <h1>상태: {user.user == null ? "로그아웃" : "로그인"}</h1>
      {!user && (
        <div>
          <p>id: {id}</p>
          <p>email: {email}</p>
          <p>name: {name}</p>
        </div>
      )}
      <div>
        <button onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
}
