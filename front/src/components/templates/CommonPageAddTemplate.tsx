import { Container } from "@mui/material"

import Header from "../organisms/Header"
import { COMMON_ROUTE } from "../../route/Routes"
import CommonPostAddForm from "../organisms/CommonPostAddForm"

export default function CommonPageAddTemplate({ currentPage }: { currentPage: COMMON_ROUTE }) {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>{currentPage.POST.label} 페이지입니다.</p>
        <CommonPostAddForm path={currentPage.DEFAULT.path ?? ""} />
      </Container>
    </div>
  )
}
