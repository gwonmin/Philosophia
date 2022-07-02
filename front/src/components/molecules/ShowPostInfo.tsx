import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import HotPotatoTitle from "../atoms/HotPotatoTitle"
import TagsAtom from "../atoms/TagsAtom"
import SublineAtom from "../atoms/SublineAtom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { formatDateString } from "../../util"
import HeartIcon from "@mui/icons-material/Favorite"
import HeartBorderIcon from "@mui/icons-material/FavoriteBorder"

export default function showPostInfo({ user, postInfo, handleLike }: { user: any; postInfo: any; handleLike: any }) {
  const navigate = useNavigate()
  const didLike = postInfo.like?.includes(user?._id ?? "")

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

      {postInfo.philosopher && postInfo.subject && <HotPotatoTitle title={`${postInfo.philosopher}(이)가 생각하는 ${postInfo.subject}(이)란?`} />}

      <SublineAtom
        subtext={postInfo.subject ? "공유자" : "작성자" + `: ${postInfo.author?.name ?? "익명"} / ${formatDateString(postInfo.createdAt)}`}
        sx={{ textAlign: "right", mr: 1 }}
      />

      <Box sx={{ p: 2 }}>
        <Typography>{postInfo.content}</Typography>
      </Box>

      {/* 찬성, 반대 */}
      {postInfo.yes && postInfo.no && <SublineAtom sx={{ textAlign: "center" }} yes={postInfo.yes.length} no={postInfo.no.length} />}

      {postInfo.subject && (
        <Box sx={{ textAlign: "center" }}>
          <IconButton onClick={handleLike}>
            {didLike ? (
              <div>
                <HeartIcon color="primary" />
                {postInfo.likeCount}
              </div>
            ) : (
              <div>
                <HeartBorderIcon color="primary" />
                {postInfo.likeCount}
              </div>
            )}
          </IconButton>
        </Box>
      )}
    </Box>
  )
}
