import Header from "../organisms/Header"
import Footer from "../organisms/Footer"

import UserDetail from "../organisms/UserDetail"
import UserInfoCardMolecule from "../organisms/UserInfoCardMolecule"

import { Grid, Typography } from "@mui/material"

export default function MypageTemplate({ userInfo }: any) {
  return (
    <>
      <Header />
      <Grid container columnSpacing={2}>
        <Grid item xs={2} sx={{ border: "1px black solid" }}>
          <UserInfoCardMolecule />
        </Grid>
        <Grid item xs={10} sx={{ border: "1px black solid" }}>
          <UserDetail />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}
