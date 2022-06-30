import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserStateContext } from "../../pages/RootPage"
import { Post } from "../../types"
import * as Api from "../../api"
import { Box, Divider, Grid, Stack, Typography } from "@mui/material"

//-------------------------------------------Devate-------------------------------------------//
function Devate({ path, post }: { path: string; post: any }) {
  const comment: string = "[" + post.comment.length + "]"
  return (
    <Box sx={{ pl: 1, pt: 1, pb: 1, borderBottom: 1.5, borderColor: "divider" }}>
      <Link to={"/" + path + "/" + post._id} style={{ textDecoration: "none", color: "black" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography align="left">
              {post.title} {post.comment.length > 0 && comment}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align="center">{post.author.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align="center">{post.createdAt.substr(0, 10)}</Typography>
          </Grid>
          <Grid item xs={2}>
            {post.visited >= 0 && <Typography align="center">{post.visited}</Typography>}
            {post.yes && (
              <Typography align="center">
                {post.yes.length} / {post.no.length}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Link>
    </Box>
  )
}

//-------------------------------------------Share-------------------------------------------//
function Share({
  path,
  post,
  somethingWasChanged,
  setSomethingWasChanged,
}: {
  path: string
  post: any
  somethingWasChanged: any
  setSomethingWasChanged: any
}) {
  const user = useContext(UserStateContext)?.user
  const didLike = post.like.includes(user?._id)
  const likeHandler = async () => {
    if (!user) {
      return <p>user does not exist(even null)</p>
    }
    try {
      const res = await Api.put({ endpoint: `shares/${post._id}/like` })
      setSomethingWasChanged(!somethingWasChanged)
      console.log("좋아요를 " + (didLike ? "취소하였습니다." : "눌렀습니다."), res.data, post.like, user)
    } catch (err) {
      console.log("좋아요에 실패했습니다.", err)
    }
  }
  return (
    <>
      <Link to={"/" + path + "/" + post._id} style={{ textDecoration: "none", color: "black" }}>
        <p>
          철학자 {post.philosopher}(이)가 생각하는 {post.subject}(이)란?
        </p>
        <p>본문: {post.content.length > 40 ? post.content.substr(0, 40) + "...(중략)" : post.content}</p>
        <p>좋아요 수: {post.like.length}</p>
      </Link>
      {user && (
        <div>
          <button onClick={likeHandler}>{didLike ? "좋아요 취소" : "좋아요"}</button>
        </div>
      )}
    </>
  )
}

//---------------------------------------------Data---------------------------------------------//
function Data({ post }: { post: any }) {
  console.log("in Data function")
  return (
    <Link to={post._id} style={{ textDecoration: "none", color: "black" }}>
      <p>제목: {post.title}</p>
      <p>공유 날짜: {post.createdAt}</p>
      <p>마지막 업데이트: {post.updatedAt}</p>
    </Link>
  )
}

//-------------------------------------------Default-------------------------------------------//
function Default({ path, post }: { path: string; post: any }) {
  const comment: string = "[" + post.comment.length + "]"
  return (
    <Box sx={{ pl: 1, pt: 1, pb: 1, borderBottom: 1.5, borderColor: "divider" }}>
      <Link to={"/" + path + "/" + post._id} style={{ textDecoration: "none", color: "black" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography align="left">
              {post.title} {post.comment.length > 0 && comment}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align="center">{post.author.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align="center">{post.createdAt.substr(0, 10)}</Typography>
          </Grid>
          <Grid item xs={2}>
            {post.visited >= 0 && <Typography align="center">{post.visited}</Typography>}
          </Grid>
        </Grid>
      </Link>
    </Box>
  )
}

//-------------------------------------------exchange-------------------------------------------//
export default function Exchange({
  path,
  post,
  somethingWasChanged,
  setSomethingWasChanged,
}: {
  path: string
  post: any
  somethingWasChanged: any
  setSomethingWasChanged: any
}) {
  switch (path) {
    case "devates":
      return <Devate path={path} post={post} />
    case "freetopics":
      return <Devate path={path} post={post} />
    case "shares":
      return <Share path={path} post={post} somethingWasChanged={somethingWasChanged} setSomethingWasChanged={setSomethingWasChanged} />
    case "data":
      console.log("in data case")
      return <Data post={post} />
    default:
      return <Default path={path} post={post} />
  }
}
