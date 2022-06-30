import React from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import LayersIcon from "@mui/icons-material/Layers"
import AssignmentIcon from "@mui/icons-material/Assignment"
import ForumIcon from "@mui/icons-material/Forum"
import ShareIcon from "@mui/icons-material/Share"

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="트렌드 페이지" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="토론 게시판" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="철학자 게시판" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShareIcon />
      </ListItemIcon>
      <ListItemText primary="글 공유 게시판" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="자료 게시판" />
    </ListItemButton>
  </React.Fragment>
)

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      기타
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="팀 소개" />
    </ListItemButton>
  </React.Fragment>
)
