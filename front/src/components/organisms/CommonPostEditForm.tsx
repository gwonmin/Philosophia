import { Container } from "@mui/material"

import { TextFieldAtom } from "../atoms/textInputs"
import { handleChange, handleEdit } from "../../util"

//-------------------------------------------Devate-------------------------------------------//
function Devate({ postInfo, onChange }: { postInfo: any; onChange: any }) {
  return (
    <>
      <TextFieldAtom id="title" label="title" name="title" value={postInfo.title} onChange={onChange} />
      <TextFieldAtom id="content" label="content" name="content" value={postInfo.content} onChange={onChange} />
      <TextFieldAtom id="tag" label="tag" name="tag" value={postInfo.tag} onChange={onChange} />
    </>
  )
}

//-------------------------------------------Default-------------------------------------------//
function Default({ postInfo, onChange }: { postInfo: any; onChange: any }) {
  return (
    <>
      <TextFieldAtom id="title" label="title" name="title" value={postInfo.title} onChange={onChange} />
      <TextFieldAtom id="content" label="content" name="content" value={postInfo.content} onChange={onChange} />
    </>
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

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Exchange path={path} postInfo={postInfo} onChange={onChange} />
        <button onClick={onClick}>게시글 수정하기</button>
        <button
          onClick={() => {
            setIsEditing(false)
          }}
        >
          취소
        </button>
      </Container>
    </div>
  )
}
