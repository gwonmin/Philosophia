import { Container } from "@mui/material"

import { TextFieldAtom } from "../atoms/textInputs"
import { handleChange, handleEdit } from "../../util"

//-------------------------------------------Devate-------------------------------------------//
function Devate({ path, setIsEditing, postInfo, setPostInfo }: { path: string; setIsEditing: any; postInfo: any; setPostInfo: any }) {
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

//-------------------------------------------Philosopher-------------------------------------------//
function Philosopher({ path, setIsEditing, postInfo, setPostInfo }: { path: string; setIsEditing: any; postInfo: any; setPostInfo: any }) {
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

//-------------------------------------------exchange-------------------------------------------//
function Exchange({ path, postList }: { path: string; postList: Post[] }) {
  switch (path) {
    case "devates":
      return <Devate postList={postList} />
    case "philosopher":
      return <Philosopher postList={postList} />
    default:
      return <p>잘못된 경로입니다.</p>
  }
}

export default function CommonPostEditForm() {}
