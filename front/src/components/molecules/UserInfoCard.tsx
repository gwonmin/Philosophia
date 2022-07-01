import { Grid, Typography } from "@mui/material"

import * as React from "react"
import { useNavigate } from "react-router-dom"
import { UserStateContext } from "../../RootContext"

const nameStyle = {
  fontSize: "24px",
  fontWeight: "bold",
}

// userInfo card for mypage
export default function UserInfoCard() {
  const navigate = useNavigate()

  const userState = React.useContext(UserStateContext)
  const curUser = userState?.user

  return (
    <>
      <Grid container>
        <Grid item xs={3} sx={{ p: 2 }}>
          <img
            src={curUser.image}
            alt="user-profile-image"
            style={{ width: "100%", borderRadius: "50%" }}
          ></img>
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            display: "flex",
            verticalAlign: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Grid container>
            <Grid xs={12}>
              <span style={nameStyle}>생각하는 자, {curUser.name}</span>님
            </Grid>
            <Grid xs={12}>{curUser.email}</Grid>
            <Grid xs={12}>
              <button onClick={() => navigate("edit")}>
                회원정보 수정하기
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
