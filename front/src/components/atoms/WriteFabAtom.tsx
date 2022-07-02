import React from "react"
import { useNavigate } from "react-router-dom"
import Fab from "@mui/material/Fab"
import Edit from "@mui/icons-material/Edit"

const WriteFabAtom: React.FC<{ path: string }> = ({ path }) => {
  const navigate = useNavigate()
  return (
    <Fab
      size="medium"
      color="primary"
      aria-label="add"
      onClick={() => {
        navigate(path)
      }}
      sx={{ position: "fixed", bottom: 40, right: 40 }}
    >
      <Edit />
    </Fab>
  )
}

export default WriteFabAtom
