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

export default function LikedPhilosopher() {
  const mockupData = ["아리스토텔레스", "니체", "데카르트"]
  return (
    <>
      <Typography style={headerStyle}>좋아요한 철학자</Typography>
      <Typography style={detailStyle}>
        <Grid container sx={{ m: 2, mt: 0 }}>
          <Grid item xs={4}>
            아리스토텔레스
          </Grid>
          <Grid item xs={4}>
            데카르트
          </Grid>
          <Grid item xs={4}>
            니체
          </Grid>
        </Grid>
      </Typography>
    </>
  )
}
