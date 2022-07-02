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
import { RoutePath } from "./route/RoutesURL"

const ForMap: { path: string; icon?: any; label: string }[] = [
  { path: RoutePath.TREND, icon: DashboardIcon, label: "트렌드 페이지" },
  { path: RoutePath.DEVATES, icon: ForumIcon, label: "토론 게시판" },
  { path: RoutePath.PHILOSOPHER, icon: PeopleIcon, label: "철학자 게시판" },
  { path: RoutePath.SHARE, icon: ShareIcon, label: "AI 철학자(Beta)" },
]

const MainList = () => {
  const navigate = useNavigate()
  const navi = (val: string) => {
    navigate(`/${val}`)
  }
  return (
    <>
      {ForMap.map((item) => {
        return (
          <ListItemButton key={item.label} onClick={() => navi(item.path)}>
            {item.icon && (
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
            )}
            <ListItemText primary={item.label} />
          </ListItemButton>
        )
      })}
    </>
  )
}

export default MainList
