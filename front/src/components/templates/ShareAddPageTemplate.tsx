import { Container, Typography } from "@mui/material"
import Footer from "../organisms/Footer"

import Header from "../organisms/Header"
import SharePostAddForm from "../organisms/SharePostAddForm"

const addFormHeaderStyle = {
  fontWeight: "bold",
  borderBottom: "2px black solid",
  mb: 2,
}

export default function ShareAddPageTemplate() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="md">
        <Typography variant="h5" sx={addFormHeaderStyle}>
          AI 철학자 : 새 글 생성하기
        </Typography>
        <SharePostAddForm />
      </Container>
      <Footer />
    </>
  )
}
