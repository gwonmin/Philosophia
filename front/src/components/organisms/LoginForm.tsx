import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import * as Api from "../../api";

import { TextFieldAtom } from "../atoms/textInputs";
import { GreenButton } from "../atoms/buttons";
import { DispatchContext } from "../pages/RootPage";

export default function LoginForm({
  login,
  userInfo,
}: {
  login: boolean;
  userInfo: { email: string; password: string; name: string };
}) {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  //user의 로그인 정보를 객체로 다룬다.
  const [loginData, setLoginData] = useState({
    email: userInfo.email,
    password: userInfo.password,
  });
  const email = loginData.email;
  const password = loginData.password;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email: string | null) => {
    if (typeof email === "string") {
      return email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
  };
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;

  const testLogin = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: "user/login",
        data: {
          email: "test@test.com",
          password: "0000",
        },
      });

      const user = res.data.user;
      console.log(user);

      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      if (!dispatch) {
        console.log("Dispatch가 존재하지 않습니다.");
        return;
      }
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({ endpoint: "user/login", data: loginData });

      const user = res.data.user;
      console.log(user);

      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      if (!dispatch) {
        console.log("Dispatch가 존재하지 않습니다.");
        return;
      }
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        로그인
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldAtom
              id="email"
              label="이메일"
              name="email"
              value={email}
              disabled={login ? false : true}
              autoComplete="email"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldAtom
              id="password"
              label="비밀번호"
              name="password"
              value={password}
              autoComplete="new-password"
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <GreenButton onClick={handleSubmit}>
          {login ? "로그인" : "인증하기"}
        </GreenButton>
        <GreenButton onClick={testLogin}>테스트 로그인</GreenButton>
      </Box>
    </Box>
  );
}
