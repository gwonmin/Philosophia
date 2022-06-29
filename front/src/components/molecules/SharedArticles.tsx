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

export default function SharedArticles() {
  return (
    <>
      <Typography style={headerStyle}>공유한 글</Typography>
      <Typography style={detailStyle}>
        <Grid container sx={{ m: 2, mt: 0 }}>
          <Grid item xs={12}>
            공유한 글 예시1
          </Grid>
          <Grid item xs={12}>
            공유한 글 예시2
          </Grid>
          <Grid item xs={12}>
            공유한 글 예시3
          </Grid>
        </Grid>
      </Typography>
    </>
  )
}
