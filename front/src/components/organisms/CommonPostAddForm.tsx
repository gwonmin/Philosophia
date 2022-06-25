import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

import { TextFieldAtom } from "../atoms/textInputs"
import { handleChange } from "../../util"
import * as Api from "../../api"

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

export default function CommonPostAddForm({ path }: { path: string }) {
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    tag: "",
  })
  const params = useParams()
  const philosopher = params.who
  const navigate = useNavigate()
  const endpoint = path === "philosopher" ? philosopher : path

  const onChange = (e: any) => handleChange({ event: e, someState: postInfo, setSomeState: setPostInfo })
  const handlePost = async () => {
    if (!endpoint) {
      console.log("location: CommonPostAddForm, err: post 경로가 잘못되었습니다.")
      return
    }
    try {
      // "user/login" 엔드포인트로 post요청함.
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
      <button onClick={handlePost}>게시글 등록하기</button>
      <button
        onClick={() => {
          navigate(-1)
        }}
      >
        취소
      </button>
    </>
  )
}
