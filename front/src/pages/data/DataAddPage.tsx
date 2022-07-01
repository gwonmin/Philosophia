import DataPostAddForm from "../../components/organisms/DataPostAddForm"
import Header from "../../components/organisms/Header"
import Footer from "../../components/organisms/Footer"
import { Container, Typography } from "@mui/material"

const addFormHeaderStyle = {
  fontWeight: "bold",
  borderBottom: "2px black solid",
  mb: 2,
}

export default function DataAddPage() {
  //변수 초기화
  return (
    <>
      <Container component="main" maxWidth="md">
        <Typography variant="h5" sx={addFormHeaderStyle}>
          새 글 작성하기
        </Typography>
        <DataPostAddForm />
      </Container>
    </>
  )
}
