import React from "react"
import { SxProps, Typography } from "@mui/material"

const SublineAtom: React.FC<{
  subtext?: string
  yes?: number | string
  no?: number | string
  like?: number | string
  sx?: SxProps
}> = ({ subtext, yes, no, sx, like }) => {
  return (
    <Typography variant="body1" sx={{ fontSize: 14, color: "#666666", ...sx }}>
      {subtext} {yes !== undefined ? `ยท ๐: ${yes}` : ""}
      {no !== undefined ? ` / ๐: ${no}` : ""}
    </Typography>
  )
}

export default SublineAtom
