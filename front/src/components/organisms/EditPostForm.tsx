import { Container } from "@mui/material"

import { TextFieldAtom } from "../atoms/textInputs"
import { handleChange, handleEdit } from "../../util"

export default function EditPostForm({ path, setIsEditing, postInfo, setPostInfo }: { path: string; setIsEditing: any; postInfo: any; setPostInfo: any }) {
  const onChange = (e: any) => handleChange({ event: e, someState: postInfo, setSomeState: setPostInfo })
  const onClick = () => handleEdit({ endpoint: `${path}/${postInfo._id}`, data: postInfo, callback: setIsEditing })

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <TextFieldAtom id="title" label="title" name="title" value={postInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={postInfo.content} onChange={onChange} />
        <TextFieldAtom id="tag" label="tag" name="tag" value={postInfo.tag} onChange={onChange} />
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
