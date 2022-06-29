import { Grid, Typography } from "@mui/material"

const headerStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "crimson",
  background:
    "-webkit-linear-gradient(left, rgba(181,0,255,1) 0%, rgba(255,0,226,1) 10%)",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
}

const detailStyle = {
  fontSize: "16px",
}

export default function LikedBooks() {
  return (
    <>
      <Typography style={headerStyle}>좋아요한 책</Typography>
      <Typography style={detailStyle}>
        <Grid container sx={{ m: 2, mt: 0 }}>
          <Grid item xs={12}>
            프린키피아
          </Grid>
          <Grid item xs={12}>
            멋쟁이 사자들과 유목민 코더
          </Grid>
          <Grid item xs={12}>
            이상한 나라의 엘리스 코딩
          </Grid>
        </Grid>
      </Typography>
    </>
  )
}
