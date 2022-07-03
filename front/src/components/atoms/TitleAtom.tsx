import { Typography } from "@mui/material"
import React from "react"

const TitleAtom: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <>
      {title !== undefined && (
        <Typography variant="h4" align="left" sx={{ fontSize: 20, color: "#111111", mr: 0.5 }}>
          {title}
        </Typography>
      )}
    </>
  )
}

export default TitleAtom
