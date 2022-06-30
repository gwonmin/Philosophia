import React from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import LayersIcon from "@mui/icons-material/Layers"
import ForumIcon from "@mui/icons-material/Forum"
import ShareIcon from "@mui/icons-material/Share"
import { useNavigate } from "react-router-dom"

const MainList = () => {
  const navigate = useNavigate()
  return (
    <>
      <ListItemButton onClick={() => navigate("")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="트렌드 페이지" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("")}>
        <ListItemIcon>
          <ForumIcon />
        </ListItemIcon>
        <ListItemText primary="토론 게시판" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="철학자 게시판" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("")}>
        <ListItemIcon>
          <ShareIcon />
        </ListItemIcon>
        <ListItemText primary="글 공유 게시판" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("")}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="자료 게시판" />
      </ListItemButton>
    </>
  )
}

export default MainList
