import { Container } from "@mui/material"

import Header from "../organisms/Header"
import SharePostAddForm from "../organisms/SharePostAddForm"

export default function ShareAddPageTemplate() {
  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <p>글 공유 페이지입니다.</p>
        <SharePostAddForm />
      </Container>
    </div>
  )
}
