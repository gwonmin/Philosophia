import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "../../route/Routes"
import { RoutePath, ActionPath } from "../../route/RoutesURL"
import { UserStateContext, DispatchContext } from "../../pages/RootPage"
import { HeaderText } from "../atoms/textboxs"
import Divider from "@mui/material/Divider/Divider"
import Stack from "@mui/material/Stack"
import { Grid, Typography, Link } from "@mui/material"

import banner from "../../../public/img/banner.png"

import MyPage from "../../pages/user/MyPage"

const HEADER_ROUTES = [
  { path: RoutePath.TREND, label: "트렌드 페이지" },
  { path: RoutePath.DEVATES, label: "토론 게시판" },
  { path: "philosopher", label: "철학자 게시판" },
  { path: RoutePath.SHARE, label: "AI 철학자 게시판" },
  { path: RoutePath.DATA, label: "자료 게시판" },
  { path: "service", label: "필로소피아" },
]

export default function Header() {
  const navigate = useNavigate()
  const userStateContext = useContext(UserStateContext)
  const user = userStateContext?.user

  return (
    <Grid container rowSpacing={2}>
      <Grid
        item
        xs={2}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">환영합니다</Typography>
        <Typography>{user ? user?.name : "익명의 사용자"}님</Typography>
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
      >
        {user && <MyPage />}
        {user ? (
          <Link>로그아웃</Link>
        ) : (
          <Link
            onClick={() => {
              navigate("/user/login")
            }}
          >
            로그인
          </Link>
        )}
      </Grid>
      <Grid item xs={12}>
        <Divider>
          <Stack direction="row" spacing={2}>
            {HEADER_ROUTES.map((route) => (
              <button
                className="fill"
                key={route.label}
                onClick={() => {
                  navigate("/" + route.path)
                }}
              >
                {route.label}
              </button>
            ))}
          </Stack>
        </Divider>
      </Grid>
    </Grid>
  )
}
