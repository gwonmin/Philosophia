import { Container } from "@mui/material"

import { TextFieldAtom } from "../atoms/textInputs"
import { handleChange, handleEdit } from "../../util"

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

  //-------------------------------------------Devate-------------------------------------------//
  function Devate() {
    return (
      <>
        <TextFieldAtom id="title" label="title" name="title" value={postInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={postInfo.content} onChange={onChange} />
        <TextFieldAtom id="tag" label="tag" name="tag" value={postInfo.tag} onChange={onChange} />
      </>
    )
  }

  //-------------------------------------------Philosopher-------------------------------------------//
  function Philosopher() {
    return (
      <>
        <TextFieldAtom id="title" label="title" name="title" value={postInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={postInfo.content} onChange={onChange} />
        <TextFieldAtom id="tag" label="tag" name="tag" value={postInfo.tag} onChange={onChange} />
      </>
    )
  }

  //-------------------------------------------exchange-------------------------------------------//
  function Exchange() {
    switch (path) {
      case "devates":
        return <Devate />
      case "philosopher":
        return <Philosopher />
      default:
        return <p>잘못된 경로입니다.</p>
    }
  }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Exchange />
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
