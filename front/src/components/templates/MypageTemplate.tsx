import UserDetail from "../organisms/UserDetail"
import UserInfoCardMolecule from "../organisms/UserInfoCardMolecule"

import { Grid, Typography } from "@mui/material"

export default function MypageTemplate({ userInfo }: any) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ border: "1px black solid" }}>
          <UserInfoCardMolecule />
        </Grid>
        <Grid item xs={12} sx={{ border: "1px black solid" }}>
          <UserDetail />
        </Grid>
      </Grid>
    </>
  )
}
