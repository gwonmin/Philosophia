import { Link } from "react-router-dom"
import Container from "@mui/material/Container"

import LoginForm from "../organisms/LoginForm"
import Header from "../organisms/Header"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Avatar, Grid } from "@mui/material"

import { User } from "../../types"

export default function LoginTemplate({
  login,
  userInfo,
}: {
  login?: boolean
  userInfo?: User
}) {
  const initUser: User = {
    email: "",
    password: "",
    name: "",
  }

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon></LockOutlinedIcon>
        </Avatar>
      </Grid>
      <Grid item xs={12}>
        <LoginForm login={login ?? true} userInfo={userInfo ?? initUser} />
      </Grid>
      <Grid xs={12} sx={{ display: "flex", justifyContent: "right", mr: 1 }}>
        {!login && (
          <>
            아직 회원이 아니신가요?
            <Link to="/user/register">회원가입</Link>
          </>
        )}
      </Grid>
    </Grid>
  )
}
