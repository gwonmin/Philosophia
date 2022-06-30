import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import { UserStateContext, DispatchContext } from "../../pages/RootPage"

import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"

import Container from "@mui/material/Container"

import { COMMON_ROUTE } from "../../route/Routes"
import { customFetch } from "../../util"

import Exchange from "../organisms/PostCards"
import SharePostAddForm from "./SharePostAddForm"
import { Post } from "../../types"
import { HeaderText } from "../atoms/textboxs"
import Divider from "@mui/material/Divider"
import { Grid, Paper } from "@mui/material"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
interface Page {
  index: number
  label: string
  path: string
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function SideBarOrgan({ path, pages }: { path: string; pages: Page[] }) {
  const [value, setValue] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue)
  const navigate = useNavigate()
  const userState = useContext(UserStateContext)
  const [pageInfo, setPageInfo] = useState<{ posts: Post[]; maxPage: number } | null>(null)
  const [isFetchCompleted, setIsFetchCompleted] = useState<boolean>(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState<boolean>(false)

  const label = () => {
    switch (path) {
      case ":who":
        return "철학자 게시판"
      case "devates":
        return "토론 게시판"
      case "shares":
        return "AI 철학자 게시판"
      default:
        return "에러"
    }
  }

  //fetch
  useEffect(() => {
    setPageInfo(null)
    customFetch({
      endpoint: pages[value].path + `?page=${page}` ?? "",
      setValue: setPageInfo,
      callback: setIsFetchCompleted,
    })
  }, [value, somethingWasChanged])
  if (!isFetchCompleted) return <p>loading...</p>
  if (!pageInfo) return <p>loading...</p>

  const GoodComponent = ({ postList }: { postList: Post[] }) => {
    return (
      <div>
        {postList != [] && (
          <div>
            {postList.map((post: Post) => {
              return (
                <div key={post._id}>
                  <Exchange path={pages[value].path} post={post} somethingWasChanged={somethingWasChanged} setSomethingWasChanged={setSomethingWasChanged} />
                </div>
              )
            })}
          </div>
        )}
        {postList.length == 0 && <p></p>}
        <p></p>
        {userState?.user && pages[value].path !== "shares" && (
          <Grid sx={{ display: "flex", justifyContent: "right" }}>
            <button
              onClick={() => {
                navigate("/" + pages[value].path + "/add")
              }}
            >
              글쓰기
            </button>
          </Grid>
        )}
      </div>
    )
  }

  const lastlabel = () => {
    switch (pages[value].path) {
      case "devates":
        return "찬/반"
      case "freetopics":
        return "조회수"
      case "shares":
        return
      case "data":
        return
      default:
        return "미정"
    }
  }

  const handlePage = (num: number) => {
    setPage(num + 1)
    setSomethingWasChanged(!somethingWasChanged)
  }

  return (
    <Container component="main" sx={{ p: 2 }}>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="tab" sx={{ mt: 2, borderRight: 1, borderColor: "divider" }} centered>
          {pages.map((page) => {
            return <Tab key={page.index} label={page.label} />
          })}
        </Tabs>
        <Container maxWidth="md">
          <Paper variant="outlined" sx={{ mb: 2 }}>
            {pages.map((page) => {
              return (
                <TabPanel key={page.index} index={page.index} value={value}>
                  <Box sx={{ pb: 1, borderBottom: 1.5, borderColor: "black" }}>
                    <Box sx={{ pb: 1, borderBottom: 1.5, borderColor: "divider" }}>
                      <HeaderText level={"h2"}>{label()}</HeaderText>
                      <HeaderText level={"h5"}>{` > ${label()} > ${pages[value].label}`}</HeaderText>
                    </Box>
                    <Grid container spacing={2} sx={{ pt: 1 }}>
                      <Grid item xs={6} alignItems="center">
                        <Typography align="center">제목</Typography>
                      </Grid>
                      <Grid item xs={2} alignItems="center">
                        <Typography align="center">글쓴이</Typography>
                      </Grid>
                      <Grid item xs={2} alignItems="center">
                        <Typography align="center">작성일</Typography>
                      </Grid>
                      <Grid item xs={2} alignItems="center">
                        <Typography align="center">{lastlabel()}</Typography>{" "}
                      </Grid>
                    </Grid>
                  </Box>
                  <GoodComponent postList={pageInfo.posts} />
                </TabPanel>
              )
            })}
          </Paper>
          <Stack direction="row" spacing={1} justifyContent="center">
            {parseInt(`${pageInfo.maxPage / 10}`) < parseInt(`${page / 10}`) && <button>{"< 이전"}</button>}
            {Array.from({ length: Math.max(1, pageInfo.maxPage <= 10 ? pageInfo.maxPage : 10) }, (x, i) => i).map((num) => {
              return (
                <button
                  key={num}
                  style={{ backgroundColor: num + 1 == page ? "black" : "none", color: num + 1 == page ? "white" : "none" }}
                  onClick={() => handlePage(num)}
                >
                  {num + 1}
                </button>
              )
            })}
            {parseInt(`${pageInfo.maxPage / 10}`) > parseInt(`${page / 10}`) && <button>{"다음 >"}</button>}
          </Stack>
        </Container>
      </Stack>
    </Container>
  )
}
