import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

import { TextFieldAtom } from "../atoms/textInputs"
import { TextFieldMultilineAtom } from "../atoms/textInputsMultiline"
import { handleChange, handleEdit } from "../../util"
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
      <TextFieldAtom id="title" placeholder="제목을 입력해주세요" name="title" value={postInfo.title} onChange={onChange} />
      <TextFieldMultilineAtom id="content" name="content" value={postInfo.content} onChange={onChange} />
    </>
  )
}

//-------------------------------------------Default-------------------------------------------//
function Default({ postInfo, onChange }: { postInfo: any; onChange: any }) {
  return (
    <Box sx={{ p: 1, mb: 3, mt: 4 }}>
      <TextFieldAtom id="title" placeholder="제목을 입력해주세요" name="title" value={postInfo.title} onChange={onChange} />
      <TextFieldMultilineAtom id="content" name="content" value={postInfo.content} onChange={onChange} />
    </Box>
  )
}

//-------------------------------------------exchange-------------------------------------------//
function Exchange({ path, postInfo, onChange }: { path: string; postInfo: any; onChange: any }) {
  switch (path) {
    case "devates":
      return <Devate postInfo={postInfo} onChange={onChange} />
    default:
      return <Default postInfo={postInfo} onChange={onChange} />
  }
}

export default function CommonPostEditForm({
  path,
  setIsEditing,
  postInfo,
  setPostInfo,
}: {
  path: string
  setIsEditing: any
  postInfo: any
  setPostInfo: any
}) {
  const onChange = (e: any) => handleChange({ event: e, someState: postInfo, setSomeState: setPostInfo })
  const onClick = () => handleEdit({ endpoint: `${path}/${postInfo._id}`, data: postInfo, callback: setIsEditing })
  const navigate = useNavigate()
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
            setIsEditing(false)
          }}
        >
          취소
        </Button>
        <Button variant="contained" onClick={onClick}>
          게시글 등록하기
        </Button>
      </Box>
    </>
  )
}
