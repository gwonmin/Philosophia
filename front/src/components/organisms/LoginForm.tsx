import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import * as Api from "../../api"
import { GreenButton } from "../atoms/buttons"
import { DispatchContext } from "../../RootContext"
import { NoticeTextField } from "../molecules/certification"

export default function LoginForm({ login, userInfo }: { login: boolean; userInfo: { email: string; password: string; name: string } }) {
  const navigate = useNavigate()
  const dispatch = useContext(DispatchContext)

  //user의 로그인 정보를 객체로 다룬다.
  const [loginData, setLoginData] = useState({
    email: userInfo.email,
    password: userInfo.password,
  })
  const email = loginData.email
  const password = loginData.password
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
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
  const isPasswordValid = password.length >= 4
  const isFormValid = isEmailValid && isPasswordValid

  const handleSubmit = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({ endpoint: "user/login", data: loginData })
      const user = res.data.user
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = res.data.accessToken
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken)
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      if (!dispatch) {
        alert("dispatch가 존재하지 않습니다. 새로고침을 해 주세요!")
        return
      }
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      })
      // 기본 페이지로 이동함.
      alert("로그인에 성공하였습니다.")
      navigate("/", { replace: true })
    } catch (err) {
      alert("로그인에 실패하였습니다.")
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        {login ? "로그인" : "본인 확인"}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <NoticeTextField
              id="email"
              label="이메일"
              name="email"
              value={email}
              disabled={login ? false : true}
              autoComplete="email"
              onChange={onChange}
              condition={!isEmailValid}
              notice="이메일 형식이 올바르지 않습니다."
            />
          </Grid>
          <Grid item xs={12}>
            <NoticeTextField
              id="password"
              label={"비밀번호"}
              name="password"
              type="password"
              value={password}
              autoComplete="new-password"
              condition={!isPasswordValid}
              notice="비밀번호가 너무 짧습니다."
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "right" }}>
          <GreenButton onClick={handleSubmit} disabled={!isFormValid}>
            {login ? "로그인" : "인증하기"}
          </GreenButton>
        </Grid>
      </Box>
    </Box>
  )
}
