import { Container } from "@mui/material"

import Header from "../organisms/Header"
import Footer from "../organisms/Footer"
import { COMMON_ROUTE } from "../../route/Routes"
import CommonPostAddForm from "../organisms/CommonPostAddForm"

export default function CommonAddPageTemplate({ currentPage }: { currentPage: COMMON_ROUTE }) {
  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <p>{currentPage.POST.label} 페이지입니다.</p>
        <CommonPostAddForm path={currentPage.DEFAULT.path ?? ""} />
      </Container>
      <Footer />
    </div>
  )
}
