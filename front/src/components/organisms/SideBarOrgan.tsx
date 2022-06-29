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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue)

  const navigate = useNavigate()
  const userState = useContext(UserStateContext)
  const [postList, setPostList] = useState<Post[]>([])
  const [isFetchCompleted, setIsFetchCompleted] = useState<boolean>(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState<boolean>(false)

  const label = () => {
    switch (path) {
      case ":who":
        return "철학자 게시판"
      case "devates":
        return "토론 게시판"
      case "shares":
        return "공유 게시판"
      default:
        return "에러"
    }
  }

  //fetch
  useEffect(() => {
    customFetch({
      endpoint: pages[value].path ?? "",
      setValue: setPostList,
      callback: setIsFetchCompleted,
    })
  }, [value, somethingWasChanged])
  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

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
        {postList.length == 0 && <p>아직 게시물이 없네요.</p>}
        <p></p>
        {userState?.user && (
          <button
            onClick={() => {
              navigate("/" + pages[value].path + "/add")
            }}
          >
            글쓰기
          </button>
        )}
      </div>
    )
  }

  return (
    <Container component="main">
      <Stack direction="row" spacing={1} justifyContent="center">
        <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="tab" sx={{ mt: 2, borderRight: 1, borderColor: "divider" }} centered>
          {pages.map((page) => {
            return <Tab key={page.index} label={page.label} />
          })}
        </Tabs>
        <Container maxWidth="md">
          {pages.map((page) => {
            if (page.label === "AI 철학자") {
              return (
                <TabPanel key={page.index} index={page.index} value={value}>
                  <SharePostAddForm />
                </TabPanel>
              )
            }
            return (
              <TabPanel key={page.index} index={page.index} value={value}>
                <Box sx={{ pb: 2, borderBottom: 1.5, borderColor: "divider" }}>
                  <HeaderText level={"h2"}>{label()}</HeaderText>
                  <HeaderText level={"h5"}>{`${label()} > ${pages[value].label}`}</HeaderText>
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  sx={{ mt: 1 }}
                >
                  <div>제목</div>
                  <div>글쓴이</div>
                  <div>작성일</div>
                  <div>조회수</div>
                </Stack>
                <Box sx={{ borderRight: 1.5, borderColor: "black" }}>
                  <p></p>
                </Box>
                <GoodComponent postList={postList} />
              </TabPanel>
            )
          })}
        </Container>
      </Stack>
    </Container>
  )
}
