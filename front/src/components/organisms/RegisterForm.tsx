import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import * as Api from "../../api";

import { TextFieldAtom } from "../atoms/textInputs";
import { GreenButton } from "../atoms/buttons";
import { Certification } from "../molecules/certification";

export default function RegisterForm({
  register,
  userInfo,
}: {
  register: boolean;
  userInfo: any;
}) {
  const navigate = useNavigate();
  //user의 가입 정보를 객체로 다룬다.
  const [userData, setUserData] = useState({
    email: userInfo.email,
    password: userInfo.password,
    name: userInfo.name,
  });
  const email = userData.email;
  const password = userData.password;
  const name = userData.name;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  //confirmPassword는 반복되지 않으므로 state로 다룬다.
  const [certification, setCertification] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

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
  const isPasswordSame = password === confirmPassword;
  const isNameValid = name.length >= 2;
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (): Promise<void> => {
    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post({ endpoint: "user/register", data: userData });

      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  const mailHandler = async () => {
    //나중에 메일 관련 api를 만들고 채울 부분
    console.log("메일로 인증번호가 발송됩니다.");
    try {
      await Api.post({ endpoint: "user/send-email", data: userData });
    } catch (err) {
      console.log("메일 발송에 실패하였습니다.", err);
    }
  };

  const authHandler = async () => {
    //나중에 인증 관련 api와 연결할 함수
    console.log("인증번호를 확인합니다.");
    try {
      await Api.post({
        endpoint: "user/email-auth",
        data: { userAuthNum: certification },
      });
      setIsAuth(true);
    } catch (err) {
      console.log("인증에 실패하였습니다.", err);
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
        회원가입
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Certification
              id="email"
              label="이메일"
              name="email"
              value={email}
              autoComplete="email"
              onChange={onChange}
              onClick={mailHandler}
              buttonText="인증번호 받기"
            />
          </Grid>
          <Grid item xs={12}>
            <Certification
              id="Certification"
              label="인증번호"
              name="Certification"
              value={certification}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => {
                setCertification(e.target.value);
              }}
              onClick={authHandler}
              buttonText="확인"
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldAtom
              id="password"
              label={register ? "비밀번호" : "변경 비밀번호"}
              name="password"
              value={password}
              autoComplete="new-password"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldAtom
              name="confirmPassword"
              label="비밀번호 재확인"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldAtom
              autoComplete="given-name"
              name="name"
              id="name"
              label="이름"
              value={name}
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <GreenButton onClick={handleSubmit}>
          {register ? "가입완료" : "수정완료"}
        </GreenButton>
      </Box>
    </Box>
  );
}
