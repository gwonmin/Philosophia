import React from "react"
import { SxProps, Typography } from "@mui/material"

const SublineAtom: React.FC<{
  subtext?: string
  yes?: number
  no?: number
  sx?: SxProps
}> = ({ subtext, yes, no, sx }) => {
  return (
    <Typography variant="body1" sx={{ fontSize: 14, color: "#666666", ...sx }}>
      {subtext} {yes !== undefined ? `· 👍: ${yes}` : ""}
      {no !== undefined ? ` / 👎: ${no}` : ""}
    </Typography>
  )
}

export default SublineAtom
