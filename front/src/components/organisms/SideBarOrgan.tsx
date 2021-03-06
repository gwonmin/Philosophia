import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import { UserStateContext } from "../../RootContext"

import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

import { customFetch } from "../../util"

import Exchange from "../organisms/PostCards"
import SharePostAddForm from "./SharePostAddForm"
import { GetPostResponse, Post } from "../../types"
import WriteFabAtom from "../atoms/WriteFabAtom"
import PaginationAtom from "../atoms/PaginationAtom"
import TabPanel from "../atoms/TabPanel"
import Loading from "../atoms/Loading"

interface Page {
  index: number
  label: string
  path: string
}

export default function SideBarOrgan({ pages }: { pages: Page[] }) {
  const [value, setValue] = useState<number>(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue)

  const userState = useContext(UserStateContext)
  const [postList, setPostList] = useState<Post[]>([])
  const [isFetchCompleted, setIsFetchCompleted] = useState<boolean>(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState<boolean>(false)

  //fetch
  useEffect(() => {
    if (pages[value].path === "shares/add") {
      setIsFetchCompleted(true)
      return
    }
    setPostList([])
    customFetch({
      endpoint: `${pages[value].path}` ?? "",
      setValue: (res: GetPostResponse) => {
        setPostList(res.posts)
      },
      callback: setIsFetchCompleted,
    })
  }, [value, somethingWasChanged])

  if (!isFetchCompleted) {
    return <Loading />
  }

  const GoodComponent = ({ postList }: { postList: Post[] }) => {
    if (!isFetchCompleted) {
      return <Loading />
    }
    return (
      <>
        {postList && postList.length === 0 ? (
          <Typography variant="h4">아직 게시물이 없습니다.</Typography>
        ) : (
          <>
            {postList?.map((post: Post) => {
              return (
                <Exchange
                  key={post._id}
                  path={pages[value].path}
                  post={post}
                  somethingWasChanged={somethingWasChanged}
                  setSomethingWasChanged={setSomethingWasChanged}
                />
              )
            })}
          </>
        )}

        {userState?.user?.name && <WriteFabAtom path={`/${pages[value].path}/add`} />}
      </>
    )
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tab test"
        // sx={{ borderBottom: 1, borderColor: "divider" }}
        centered
        sx={{ mb: 1 }}
      >
        {pages.map((page) => {
          return <Tab key={page.index} label={page.label} />
        })}
      </Tabs>

      {pages.map((page) => {
        if (page.label === "AI 철학자") {
          return (
            <TabPanel key={page.index} index={page.index} value={value}>
              <SharePostAddForm />
            </TabPanel>
          )
        }
        return (
          <TabPanel
            style={{
              width: "100%",
              overflow: "auto",
              height: "65vh",
            }}
            key={page.index}
            index={page.index}
            value={value}
          >
            <GoodComponent postList={postList} />
          </TabPanel>
        )
      })}
    </Box>
  )
}
