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

export default function OpposingTopics() {
  return (
    <>
      <Typography style={headerStyle}>난 반댈세</Typography>
      <Typography style={detailStyle}>
        <Grid container sx={{ m: 2, mt: 0 }}>
          <Grid item xs={12}>
            민트초코는 음식이다
          </Grid>
          <Grid item xs={12}>
            피자는 파인애플 피자가 제일이다
          </Grid>
          <Grid item xs={12}>
            코코넛 음료, 지코는 맛있다
          </Grid>
        </Grid>
      </Typography>
    </>
  )
}
