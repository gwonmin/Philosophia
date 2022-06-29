import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "../../route/Routes"
import { RoutePath, ActionPath } from "../../route/RoutesURL"
import { UserStateContext, DispatchContext } from "../../pages/RootPage"
import { HeaderText } from "../atoms/textboxs"
import Divider from "@mui/material/Divider/Divider"
import Stack from "@mui/material/Stack"
import { Grid } from "@mui/material"

import logo from "../../../public/img/logo.png"
import banner from "../../../public/img/banner.png"

const HEADER_ROUTES = [
  { path: RoutePath.MASTER, label: "마스터 페이지(삭제예정)" },
  { path: RoutePath.TREND, label: "트렌드 페이지" },
  { path: RoutePath.DEVATES, label: "토론 게시판" },
  { path: "philosopher", label: "철학자 게시판" },
  { path: RoutePath.SHARE, label: "글 공유 게시판" },
  { path: RoutePath.DATA, label: "자료 게시판" },
  { path: "service", label: "필로소피아" },
]

export default function Header() {
  const navigate = useNavigate()

  return (
    <Grid container>
      <Grid item xs={2}>
        {/* 로고 중앙정렬을 위한 빈 그리드 */}
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={banner}
          style={{
            height: "20vh",
          }}
        ></img>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          pr: 5,
        }}
      ></Grid>
      <Grid item xs={12}>
        <Divider>
          <Stack direction="row" spacing={2}>
            {HEADER_ROUTES.map((route) => {
              return (
                <button
                  key={route.label}
                  onClick={() => {
                    navigate("/" + route.path)
                  }}
                >
                  {route.label}
                </button>
              )
            })}
          </Stack>
        </Divider>
      </Grid>
    </Grid>
  )
}
