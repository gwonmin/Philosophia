import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import * as Api from "../../api"

import { TextFieldAtom } from "../atoms/textInputs"
import { GreenButton } from "../atoms/buttons"
import { Certification, NoticeTextField } from "../molecules/certification"

export default function RegisterForm({ register, userInfo }: { register: boolean; userInfo: any }) {
  const navigate = useNavigate()
  //user의 가입 정보를 객체로 다룬다.
  const [userData, setUserData] = useState({
    email: userInfo.email,
    password: userInfo.password,
    name: userInfo.name,
  })
  const email = userData.email
  const [certification, setCertification] = useState("인증을 진행해주세요.")
  const password = userData.password
  const [confirmPassword, setConfirmPassword] = useState("")
  const name = userData.name
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email: string) => {
    const val = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )

    if (val == null) {
      return false
    }
    return true
  }

  const isEmailValid = validateEmail(email)
  const isSended = certification != "인증을 진행해주세요."
  const [isAuth, setIsAuth] = useState(false)
  const isPasswordValid = password.length >= 4
  const isPasswordSame = password === confirmPassword
  const isNameValid = name.length >= 2
  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame && isNameValid && isAuth

  const handleSubmit = async (): Promise<void> => {
    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post({ endpoint: "user/register", data: userData })
      //dispatch

      // 로그인 페이지로 이동함.
      navigate("/login")
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err)
    }
  }

  const mailHandler = async () => {
    //나중에 메일 관련 api를 만들고 채울 부분
    console.log("메일로 인증번호가 발송됩니다.")
    try {
      await Api.post({ endpoint: "user/send-email", data: { email } })
      setCertification("")
    } catch (err) {
      console.log("메일 발송에 실패하였습니다.", err)
    }
  }

  const authHandler = async () => {
    //나중에 인증 관련 api와 연결할 함수
    console.log("인증번호를 확인합니다.")
    try {
      await Api.post({
        endpoint: "user/email-auth",
        data: { userAuthNum: certification, email: email },
      })
      setIsAuth(true)
    } catch (err) {
      console.log("인증에 실패하였습니다.", err)
    }
  }

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
              disabled={!isEmailValid}
              condition={!isEmailValid}
              notice="이메일 형식이 올바르지 않습니다."
              onChange={onChange}
              onClick={mailHandler}
              buttonText="인증번호 받기"
            />
          </Grid>
          {<p></p>}
          <Grid item xs={12}>
            <Certification
              id="Certification"
              label="인증번호"
              name="Certification"
              value={certification}
              textDisabled={!isSended}
              disabled={!isSended}
              onChange={(e: { target: { value: React.SetStateAction<string> } }) => {
                setCertification(e.target.value)
              }}
              onClick={authHandler}
              buttonText="확인"
              condition={false}
              notice={undefined}
            />
          </Grid>
          <Grid item xs={12}>
            <NoticeTextField
              id="password"
              label={register ? "비밀번호" : "변경 비밀번호"}
              name="password"
              value={password}
              autoComplete="new-password"
              condition={!isPasswordValid}
              notice="비밀번호가 너무 짧습니다."
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <NoticeTextField
              name="confirmPassword"
              label="비밀번호 재확인"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              autoComplete="new-password"
              condition={!isPasswordSame}
              notice="비밀번호가 일치하지 않습니다."
              onChange={(e: { target: { value: React.SetStateAction<string> } }) => {
                setConfirmPassword(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <NoticeTextField
              autoComplete="given-name"
              name="name"
              id="name"
              label="이름"
              value={name}
              condition={!isNameValid}
              notice="이름이 너무 짧습니다."
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <GreenButton onClick={handleSubmit} disabled={!isFormValid}>
          {register ? "가입완료" : "수정완료"}
        </GreenButton>
      </Box>
    </Box>
  )
}
