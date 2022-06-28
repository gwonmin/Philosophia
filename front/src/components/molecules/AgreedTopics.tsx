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

export default function AgreedTopics() {
  return (
    <>
      <Typography style={headerStyle}>찬성합니다!</Typography>
      <Typography style={detailStyle}>
        <Grid container sx={{ m: 2, mt: 0 }}>
          <Grid item xs={12}>
            탕수육은 부먹이 진리다
          </Grid>
          <Grid item xs={12}>
            아이유는 사랑이다
          </Grid>
          <Grid item xs={12}>
            수학은 기호들의 집합이며, 그 자체로 완벽한 학문이다
          </Grid>
        </Grid>
      </Typography>
    </>
  )
}
