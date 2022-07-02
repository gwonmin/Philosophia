import { SetStateAction, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import HeartIcon from "@mui/icons-material/Favorite"
import HeartBorderIcon from "@mui/icons-material/FavoriteBorder"
import { UserStateContext } from "../../RootContext"
import { DataPost, Devate_Post, Post, Share_Post } from "../../types"
import * as Api from "../../api"
import { Props } from "../../types"
import { RoutePath } from "../../route/RoutesURL"
import TagsAtom from "../atoms/TagsAtom"
import SublineAtom from "../atoms/SublineAtom"
import { formatDateString } from "../../util"
import TitleAtom from "../atoms/TitleAtom"
import { Grid } from "@mui/material"

const NumberInBracketAtom: React.FC<{ number?: number }> = ({ number }) => {
  if (!number) return <></>
  return <>{number !== undefined && <Typography sx={{ fontSize: 13, mr: 1, color: "#666666" }}>({number})</Typography>}</>
}

export const MainlineMolecule: React.FC<{
  title?: string
  number?: number
  name?: string
}> = ({ title, number, name }) => {
  return (
    <Box sx={{ display: "flex", mb: 1, width: "100%", alignItems: "center" }}>
      <TitleAtom title={title} />
      <NumberInBracketAtom number={number} />
    </Box>
  )
}

export const PostListItemContainerAtom: React.FC<Props & { onClick: () => void }> = ({ children, onClick }) => {
  return (
    <>
      <Button fullWidth onClick={onClick} sx={{ pt: 2, pb: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          {children}
        </Box>
      </Button>
      <Divider />
    </>
  )
}

//-------------------------------------------Devate-------------------------------------------//
function Devate({ path, post }: { path: string; post: Devate_Post }) {
  const navigate = useNavigate()
  const toTheDetailPage = () => {
    navigate(`/${path}/${post._id}`)
  }
  if (!post.no) return <p>loading...</p>

  return (
    <PostListItemContainerAtom onClick={toTheDetailPage}>
      <Grid container spacing={2}>
        <Grid container item xs={4} direction="column" alignItems="flex-start" justifyContent="center">
          <Grid item>
            <MainlineMolecule title={post.title} number={post.comment.length} />
          </Grid>
          <Grid item>
            <SublineAtom subtext={post.author.name} />
          </Grid>
        </Grid>
        <Grid item xs={6} alignItems="center" justifyContent="center">
          <SublineAtom subtext={post.content.length > 40 ? `${post.content.substring(0, 40)}...` : post.content} />
        </Grid>
        <Grid item xs={2} alignItems="center" justifyContent="center">
          <SublineAtom yes={post.yes.length} no={post.no.length} />
        </Grid>
      </Grid>
    </PostListItemContainerAtom>
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
  post: Share_Post
  somethingWasChanged: boolean
  setSomethingWasChanged: React.Dispatch<SetStateAction<boolean>>
}) {
  const user = useContext(UserStateContext)?.user
  const didLike = user?._id ? post.like.includes(user?._id) : false
  const navigate = useNavigate()
  const toTheDetailPage = () => {
    navigate(`/${path}/${post._id}`)
  }
  const likeHandler = async () => {
    if (!user) {
      return <p>user does not exist(even null)</p>
    }

    try {
      await Api.put({ endpoint: `shares/${post._id}/like` })
      setSomethingWasChanged(!somethingWasChanged)

      alert("좋아요를 " + (didLike ? "취소하였습니다." : "눌렀습니다."))
    } catch (err) {
      alert("좋아요에 실패했습니다.")
    }
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <PostListItemContainerAtom onClick={toTheDetailPage}>
        <MainlineMolecule title={`철학자 ${post.philosopher}(이)가 생각하는 ${post.subject}(이)란?`} />
        <SublineAtom subtext={post.content.length > 40 ? `${post.content.substring(0, 40)}...` : post.content} like={post.like.length} />
      </PostListItemContainerAtom>

      {/* 좋아요 버튼 */}
      {user && (
        <Box>
          <IconButton onClick={likeHandler}>
            {didLike ? (
              <div>
                <HeartIcon color="primary" />
                {post.like.length}
              </div>
            ) : (
              <div>
                <HeartBorderIcon color="primary" />
                {post.like.length}
              </div>
            )}
          </IconButton>
        </Box>
      )}
    </Box>
  )
}

//---------------------------------------------Data---------------------------------------------//
function Data({ post }: { post: DataPost }) {
  const navigate = useNavigate()
  const toTheDetailPage = () => {
    navigate(`/${RoutePath.DATA}/${post._id}`)
  }

  return (
    <PostListItemContainerAtom onClick={toTheDetailPage}>
      <MainlineMolecule title={post.title} name={post.author.name} />
      <SublineAtom subtext={`${post.author.name} | ${formatDateString(post.createdAt)}`} />
    </PostListItemContainerAtom>
  )
}

//-------------------------------------------Default-------------------------------------------//
function Default({ path, post }: { path: string; post: Post }) {
  const navigate = useNavigate()
  const toTheDetailPage = () => {
    navigate(`/${path}/${post._id}`)
  }
  return (
    <PostListItemContainerAtom onClick={toTheDetailPage}>
      <Grid container spacing={2}>
        <Grid container item xs={4} direction="column" alignItems="flex-start" justifyContent="center">
          <Grid item>
            <MainlineMolecule title={post.title} number={post.comment.length} />
          </Grid>
          <Grid item>
            <SublineAtom subtext={post.author.name} />
          </Grid>
        </Grid>
        <Grid item xs={8} alignItems="center" justifyContent="center">
          <SublineAtom subtext={post.content.length > 40 ? `${post.content.substring(0, 40)}...` : post.content} />
        </Grid>
      </Grid>
    </PostListItemContainerAtom>
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
  post: Post
  somethingWasChanged: boolean
  setSomethingWasChanged: React.Dispatch<SetStateAction<boolean>>
}) {
  switch (path) {
    case "devates":
      return <Devate path={path} post={post} />
    case "shares":
      return <Share path={path} post={post} somethingWasChanged={somethingWasChanged} setSomethingWasChanged={setSomethingWasChanged} />
    case "data":
      return <Data post={post} />
    default:
      return <Default path={path} post={post} />
  }
}
