import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../context";

export default function UserStatusPage({ user }: any) {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  console.log(dispatch);

  const id = user?.id;
  const email = user?.email;
  const name = user?.name;

  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    console.log("로그아웃");
    // dispatch 함수를 이용해 로그아웃함.
    if (dispatch) {
      dispatch({ type: "LOGOUT" });
    }
    // 기본 페이지로 돌아감.
    navigate("/");
  };
  return (
    <div>
      <h1>상태: {user == null ? "로그아웃" : "로그인"}</h1>
      {user && (
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
