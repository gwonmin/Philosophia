import React from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import AssignmentIcon from "@mui/icons-material/Assignment"

import { useNavigate } from "react-router-dom"
import { ActionPath, RoutePath } from "./route/RoutesURL"

const SidebarMainList = () => {
  const navigate = useNavigate()
  return (
    <>
      <ListSubheader component="div" inset>
        기타
      </ListSubheader>
      <ListItemButton
        onClick={() => {
          navigate(`/${RoutePath.SERVICE}`)
        }}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="필로소피아" />
      </ListItemButton>
    </>
  )
}

export default SidebarMainList
