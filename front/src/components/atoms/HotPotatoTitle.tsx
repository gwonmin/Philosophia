import React from "react"
import Typography from "@mui/material/Typography"

const HotPotatoTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        mb: 2,
      }}
    >
      {title}
    </Typography>
  )
}

export default HotPotatoTitle
