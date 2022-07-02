import { Avatar, Box, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material"

const forMap = [
  { name: "[AI]양권민", photo: " " },
  { name: "[AI]정예승", photo: " " },
  { name: "[FE]주강현", photo: " " },
  { name: "[BE]유하얀", photo: " " },
  { name: "[BE]장준수", photo: " " },
]
export default function ServicePage() {
  return (
    <>
      <Typography variant="h5" sx={{ p: 2 }}>
        필로소피아란?
      </Typography>
      <Typography variant="body1" sx={{ p: 2 }}>
        필로소피아는 철학(Philosophy)와 Utopia의 합성어인 동시에 철학의 어원인 Philosophia로의 회귀를 의미합니다. 철학(Philosophy)의 어원은 사랑(Philos) +
        지식(Sophia)입니다. 저희는 지식을 사랑하는 사람들이 모여 누구나 철학에 대해 이야기할 수 있는 이상적인 토론의 장을 만들고자 하였습니다.
      </Typography>
      <Typography variant="body1" sx={{ p: 2 }}>
        철학은 재미없고 따분하다고 생각하는 사람들이 많습니다. 필로소피아는 이런 선입견에서 벗어나 누구나 자유롭게 철학적인 주제에 대해 이야기 나눌 수 있는 장을
        만드려고 합니다.
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2, mt: 2 }} />
      <Typography variant="h5" sx={{ p: 2 }}>
        AI와 함께하는 철학
      </Typography>
      <Typography variant="body1" sx={{ p: 2 }}>
        서로를 비방하는 언행을 자제하며, 철학을 주제로 건전한 대화를 나눌 수 있는 양질의 토론장을 조성하기 위해 비속어 탐지 AI를 댓글에 적용하였습니다. 가벼운
        찬반 토론, 정답이 없는 문제에 대해서는 자유 토론, 특정 철학자에 대해 더 깊게 얘기할 수 있는 철학자별 게시판을 마련하여 건설적이고 지적인 대화를 나눌 수
        있습니다.
      </Typography>
      <Typography variant="body1" sx={{ p: 2 }}>
        철학 책을 읽다 헷갈리는 개념이 나온다면 AI 철학자에게 물어보는 건 어떨까요? AI 철학자 게시판에서는 영어로 제시어를 입력하면 철학자들의 책을 학습한 AI가
        제시어에 대한 글을 생성해줍니다. 마음에 드는 글이 생성되었다면 그 글을 다른 유저들과 공유할 수 있습니다.
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2, mt: 2 }} />
      <Typography variant="h5" sx={{ p: 2 }}>
        팀 소개
      </Typography>
      <Typography variant="body1" sx={{ p: 2 }}></Typography>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ pb: 5 }}>
        {forMap.map((profile) => {
          return (
            <Card sx={{ minWidth: 200, minHeight: 300 }}>
              <CardContent sx={{ alignItems: "center" }}>
                <Avatar alt={profile.name} src={profile.photo} sx={{ width: 100, height: 100, mt: 5, mb: 2, ml: "auto", mr: "auto" }} />
                <Typography variant="h5" align={"center"} sx={{ mt: 5 }}>
                  {profile.name}
                </Typography>
              </CardContent>
            </Card>
          )
        })}
      </Stack>
    </>
  )
}
