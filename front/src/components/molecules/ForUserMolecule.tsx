import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"

const map: { [key: string]: any } = {
  yes: {
    label: "찬성",
    color: "#000080",
  },
  no: {
    label: "반대",
    color: "#660000",
  },
  grey: {
    label: "중립",
    color: "#666666",
  },
  "투표를 하지 않았습니다": {
    label: "투표를 하지 않았습니다",
    color: "#AA0000",
  },
}

export default function ForUserMolcule({
  postInfo,
  userName,
  handleChangeStance,
  handleLike,
}: {
  postInfo: any
  userName: string
  handleChangeStance: any
  handleLike: any
}) {
  return (
    <>
      {userName && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {postInfo.userStance && (
            <Chip
              label={map[postInfo.userStance].label}
              sx={{
                backgroundColor: map[postInfo.userStance].color,
                color: "#EFEFEF",
                m: 1.5,
              }}
            />
          )}
          {postInfo.yes && (
            <Box
              className="devate"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" onClick={() => handleChangeStance("yes")} sx={{ m: 1.5, backgroundColor: "navy" }}>
                찬성
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  handleChangeStance("no")
                }}
                sx={{ m: 1.5, color: "navy", borderColor: "navy" }}
              >
                반대
              </Button>
            </Box>
          )}
        </Box>
      )}
    </>
  )
}
