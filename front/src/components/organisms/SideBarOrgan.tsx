import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import { UserStateContext, DispatchContext } from "../../pages/RootPage"

import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

import Container from "@mui/material/Container"

import { COMMON_ROUTE } from "../../route/Routes"
import { customFetch } from "../../util"

import Header from "../organisms/Header"
import Footer from "../organisms/Footer"
import CommonPostCards from "../organisms/CommonPostCards"
import { Post } from "../templates/CommonPageTemplate"

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}

export default function SideBarOrgan({ pages }: { pages: Page[] }) {
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const navigate = useNavigate()
  const userState = useContext(UserStateContext)
  const [postList, setPostList] = useState<Post[]>([])
  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState(false)

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

  function Default({ post }: { post: any }) {
    return (
      <div key={post._id} style={{ backgroundColor: "grey" }}>
        <Link to={"/" + pages[value].path + "/" + post._id}>
          <p>제목: {post.title}</p>
          <p>글쓴이: {post.author.name}</p>
          <p>덧글 수: {post.comment.length}</p>
        </Link>
      </div>
    )
  }

  const GoodComponent = ({ postList }: { postList: Post[] }) => {
    return (
      <div>
        {postList != [] && (
          <div>
            <p>게시물 목록:</p>
            {postList.map((post: Post) => {
              return (
                <div key={post._id} style={{ backgroundColor: "grey" }}>
                  <Default post={post} />
                </div>
              )
            })}
            {postList.length == 0 && <p>아직 게시물이 없네요.</p>}
          </div>
        )}
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
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
      <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="tab test" sx={{ borderRight: 1, borderColor: "divider" }} centered>
        {pages.map((page) => {
          return <Tab key={page.index} label={page.label} />
        })}
      </Tabs>
      {pages.map((page) => {
        return (
          <TabPanel key={page.index} index={page.index} value={value}>
            <GoodComponent postList={postList} />
          </TabPanel>
        )
      })}
    </Box>
  )
}
