import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

import * as Api from "../../api"
import axios from "axios"
import { TextFieldAtom } from "../atoms/textInputs"

import { handleChange } from "../../util"
import { ROUTES } from "../../route/Routes"
import { TextFieldMultilineAtom } from "../atoms/textInputsMultiline"
import { Button, Grid } from "@mui/material"
import { styled } from "@mui/material/styles"

const Input = styled("input")({
  display: "none",
})

export default function DataPostAddForm() {
  const path = ROUTES.DATA
  console.log(path)
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    filePath: "",
  })
  const navigate = useNavigate()

  const onChange = (e: any) =>
    handleChange({ event: e, someState: postInfo, setSomeState: setPostInfo })
  const handlePost = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: path.DEFAULT.path,
        data: postInfo,
      })
      console.log(path, "의 post요청이 성공했습니다. data: ", res.data)
      navigate(-1)
    } catch (err) {
      console.log("게시글 등록에 실패하였습니다.\n", err)
    }
  }

  const dataEndpoint = path.DEFAULT.path + "/uploadfile"

  const handleFile = async (e: any) => {
    postInfo.filePath = e.target.value
    const formData = new FormData()
    formData.append("data_file", e.target.files[0])
    try {
      const res = await Api.post({
        endpoint: dataEndpoint,
        data: formData,
      })
      console.log("파일 업로드 성공")
      alert("파일이 정상적으로 업로드되었습니다")
    } catch (err) {
      console.log("파일 업로드 실패", err)
    }
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TextFieldAtom
            id="title"
            placeholder="공유하고자 하는 자료의 제목을 입력해주세요"
            name="title"
            value={postInfo.title}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldMultilineAtom
            id="content"
            placeholder="공유하고자 하는 자료가 어떤 내용인지 요약해주세요"
            name="content"
            value={postInfo.content}
            onChange={onChange}
          />
        </Grid>
        <Grid
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <form encType="multipart/form-data">
            <label htmlFor="contained-button-file">
              <Input
                accept="application/msword, text/plain, application/pdf, image/*"
                id="contained-button-file"
                multiple
                onChange={handleFile}
                type="file"
              />
              <Button variant="contained" component="span">
                파일 업로드
              </Button>
            </label>
          </form>
        </Grid>
        <Grid
          xs={8}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button variant="contained" onClick={handlePost} sx={{ mr: 1.5 }}>
            게시글 등록하기
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(-1)
            }}
          >
            취소
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
