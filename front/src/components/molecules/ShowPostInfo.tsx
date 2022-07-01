import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import HotPotatoTitle from "../atoms/HotPotatoTitle"
import TagsAtom from "../atoms/TagsAtom"
import SublineAtom from "../atoms/SublineAtom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { formatDateString } from "../../util"

export default function showPostInfo({ postInfo }: { postInfo: any }) {
  const navigate = useNavigate()
  return (
    <Box>
      {/* 뒤로 */}
      <IconButton
        onClick={() => {
          navigate(-1)
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* 제목 */}
      {postInfo.title && <HotPotatoTitle title={postInfo.title} />}

      <SublineAtom subtext={`작성자: ${postInfo.author?.name} / ${formatDateString(postInfo.createdAt)}`} sx={{ textAlign: "right", mr: 1 }} />

      <Box sx={{ p: 2 }}>
        <Typography>{postInfo.content}</Typography>
      </Box>

      {/* 찬성, 반대 */}
      {postInfo.yes && postInfo.no && <SublineAtom sx={{ textAlign: "center" }} yes={postInfo.yes.length} no={postInfo.no.length} />}

      {/* 좋아요 */}
      {postInfo.like && <Typography>❤️: {postInfo.like.length}</Typography>}
    </Box>
  )
}
