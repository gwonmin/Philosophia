import { Link } from "react-router-dom"
import Container from "@mui/material/Container"

import LoginForm from "../organisms/LoginForm"
import Header from "../organisms/Header"

import { Avatar, Grid } from "@mui/material"

import { User } from "../../types"

export default function LoginTemplate({ login, userInfo }: { login?: boolean; userInfo?: User }) {
  const initUser: User = {
    email: "",
    password: "",
    name: "",
  }

  const Footer = () => {
    return <p>푸터도 오게 될까요?</p>
  }

  return (
    <div>
      <Header />
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
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
      <Footer />
    </div>
  )
}
