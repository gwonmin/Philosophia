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

const NumberInBracketAtom: React.FC<{ number?: number }> = ({ number }) => {
  return (
    <>
      {number !== undefined && (
        <Typography sx={{ fontSize: 13, mr: 1, color: "#666666" }}>
          ({number})
        </Typography>
      )}
    </>
  )
}

export const MainlineMolecule: React.FC<{
  title?: string
  number?: number
  tags?: string[]
}> = ({ title, tags, number }) => {
  return (
    <Box sx={{ display: "flex", mb: 1, width: "100%", alignItems: "center" }}>
      <TitleAtom title={title} />
      <NumberInBracketAtom number={number} />
      <TagsAtom tags={tags} />
    </Box>
  )
}

export const PostListItemContainerAtom: React.FC<
  Props & { onClick: () => void }
> = ({ children, onClick }) => {
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
  return (
    <PostListItemContainerAtom onClick={toTheDetailPage}>
      <MainlineMolecule
        title={post.title}
        tags={post.tag}
        number={post.comment.length}
      />
      <SublineAtom
        subtext={post.content}
        yes={post.yes.length}
        no={post.no.length}
      />
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
      const res = await Api.put({ endpoint: `shares/${post._id}/like` })
      setSomethingWasChanged(!somethingWasChanged)

      console.log(
        "좋아요를 " + (didLike ? "취소하였습니다." : "눌렀습니다."),
        res.data,
        post.like,
        user
      )
    } catch (err) {
      console.log("좋아요에 실패했습니다.", err)
    }
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <PostListItemContainerAtom onClick={toTheDetailPage}>
        <MainlineMolecule
          title={`철학자 ${post.philosopher}(이)가 생각하는 ${post.subject}(이)란?`}
        />
        <SublineAtom
          subtext={
            post.content.length > 40
              ? `${post.content.substring(0, 40)}...`
              : post.content
          }
          yes={post.like.length}
        />
      </PostListItemContainerAtom>

      {/* 좋아요 버튼 */}
      {user && (
        <Box>
          <IconButton onClick={likeHandler}>
            {didLike ? (
              <HeartIcon color="primary" />
            ) : (
              <HeartBorderIcon color="primary" />
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
      <MainlineMolecule title={post.title} />
      <SublineAtom
        subtext={`${post.author.name} | ${formatDateString(post.createdAt)}`}
      />
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
      <MainlineMolecule title={post.title} number={post.comment.length} />
      <SublineAtom subtext={post.content} />
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
    case "freetopics":
      return <Devate path={path} post={post} />
    case "shares":
      return (
        <Share
          path={path}
          post={post}
          somethingWasChanged={somethingWasChanged}
          setSomethingWasChanged={setSomethingWasChanged}
        />
      )
    case "data":
      return <Data post={post} />
    default:
      return <Default path={path} post={post} />
  }
}
