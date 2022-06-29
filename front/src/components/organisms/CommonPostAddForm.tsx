import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

import { TextFieldAtom } from "../atoms/textInputs"
import { TextFieldMultilineAtom } from "../atoms/textInputsMultiline"
import { handleChange } from "../../util"
import * as Api from "../../api"
import { NewPost } from "../../types"

import "../../../public/index.scss"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { Typography } from "@mui/material"

//-------------------------------------------Devate-------------------------------------------//
function Devate({ postInfo, onChange }: { postInfo: any; onChange: any }) {
  return (
    <>
      <TextFieldAtom
        id="title"
        placeholder="제목을 입력해주세요"
        name="title"
        value={postInfo.title}
        onChange={onChange}
      />
      <TextFieldMultilineAtom
        id="content"
        placeholder="본문은 입력해주세요"
        name="content"
        value={postInfo.content}
        onChange={onChange}
      />
      <TextFieldAtom
        id="tag"
        placeholder="태그를 입력해주세요"
        name="tag"
        value={postInfo.tag}
        onChange={onChange}
      />
    </>
  )
}

//-------------------------------------------Default-------------------------------------------//
function Default({ postInfo, onChange }: { postInfo: any; onChange: any }) {
  return (
    <Box sx={{ p: 1, mb: 3, mt: 4 }}>
      <TextFieldAtom
        id="title"
        placeholder="제목을 입력해주세요"
        name="title"
        value={postInfo.title}
        onChange={onChange}
      />
      <TextFieldMultilineAtom
        id="content"
        placeholder="본문을 입력해주세요"
        name="content"
        value={postInfo.content}
        onChange={onChange}
      />
    </Box>
  )
}

//-------------------------------------------exchange-------------------------------------------//
function Exchange({
  path,
  postInfo,
  onChange,
}: {
  path: string
  postInfo: any
  onChange: any
}) {
  switch (path) {
    case "devates":
      return <Devate postInfo={postInfo} onChange={onChange} />
    default:
      return <Default postInfo={postInfo} onChange={onChange} />
  }
}

export default function CommonPostAddForm({ path }: { path: string }) {
  const [postInfo, setPostInfo] = useState<NewPost>({
    title: "",
    content: "",
    tag: "",
  })
  const params = useParams()
  const philosopher = params.who
  const navigate = useNavigate()
  const endpoint = path === ":who" ? philosopher : path

  const onChange = (e: any) =>
    handleChange({ event: e, someState: postInfo, setSomeState: setPostInfo })
  const handlePost = async () => {
    if (!endpoint) {
      console.log(
        "location: CommonPostAddForm, err: post 경로가 잘못되었습니다."
      )
      return
    }
    try {
      const res = await Api.post({
        endpoint: endpoint,
        data: postInfo,
      })
      console.log(path, "의 post요청이 성공했습니다. data: ", res.data)
      navigate(-1)
    } catch (err) {
      console.log("게시글 등록에 실패하였습니다.\n", err)
    }
  }

  return (
    <>
      <Exchange path={path} postInfo={postInfo} onChange={onChange} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mr: 1,
        }}
      >
        <Button
          sx={{ mr: 1.5 }}
          variant="outlined"
          onClick={() => {
            navigate(-1)
          }}
        >
          취소
        </Button>
        <Button variant="contained" onClick={handlePost}>
          게시글 등록하기
        </Button>
      </Box>
    </>
  )
}
