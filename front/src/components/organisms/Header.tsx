import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "../../route/Routes"
import { RoutePath, ActionPath } from "../../route/RoutesURL"
import { UserStateContext, DispatchContext } from "../../pages/RootPage"
import { HeaderText } from "../atoms/textboxs"
import Divider from "@mui/material/Divider/Divider"
import Stack from "@mui/material/Stack"

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
    <div>
      <div>로고</div>
      <HeaderText level={"h1"} variant={""} color={"black"}>
        Philosophia
      </HeaderText>
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
    </div>
  )
}
