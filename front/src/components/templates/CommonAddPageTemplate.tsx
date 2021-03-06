import { Container, Typography } from "@mui/material"

import { ALL_ROUTE } from "../../route/Routes"
import CommonPostAddForm from "../organisms/CommonPostAddForm"

import "../../../public/index.scss"

const addFormHeaderStyle = {
  fontWeight: "bold",
  borderBottom: "2px black solid",
  mb: 2,
}

export default function CommonAddPageTemplate({
  currentPage,
}: {
  currentPage: ALL_ROUTE
}) {
  return (
    <div>
      <Container component="main" maxWidth="md">
        <Typography variant="h5" sx={addFormHeaderStyle}>
          새 글 작성하기
        </Typography>
        <CommonPostAddForm path={currentPage.DEFAULT.path ?? ""} />
      </Container>
    </div>
  )
}
