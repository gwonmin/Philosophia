import { Typography } from "@mui/material"
import { HeaderProps } from "../models/TextboxProps"

export function HeaderText({ level, variant, children, color }: HeaderProps) {
  let fontSize: string
  let fontWeight: Array<String> = []

  if (level === "h1") {
    fontSize = "32px"
    fontWeight.push("bold")
  } else if (level == "h2") {
    fontSize = "24px"
    fontWeight.push("bold")
  } else if (level == "h3") {
    fontSize = "18px"
    fontWeight.push("bold")
  } else if (level == "h4") {
    fontSize = "12px"
  } else if (level == "h5") {
    fontSize = "8px"
  } else fontSize = "10px" // default

  if (variant.includes("bold")) fontWeight.push("bold")
  if (variant.includes("italic")) fontWeight.push("italic")

  return (
    <Typography
      sx={{
        fontSize: fontSize,
        fontWeight: fontWeight.join(" "),
        color: color,
      }}
    >
      {children}
    </Typography>
  )
}
