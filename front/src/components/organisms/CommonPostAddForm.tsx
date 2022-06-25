import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

import { TextFieldAtom } from "../atoms/textInputs"
import { handleChange } from "../../util"
import * as Api from "../../api"

export default function ComoonPostAddForm({ path }: { path: string }) {
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
      console.log("location: ComoonPostAddForm, err: post 경로가 잘못되었습니다.")
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

  //-------------------------------------------Default-------------------------------------------//
  function Default() {
    return (
      <>
        <TextFieldAtom id="title" label="title" name="title" value={postInfo.title} onChange={onChange} />
        <TextFieldAtom id="content" label="content" name="content" value={postInfo.content} onChange={onChange} />
      </>
    )
  }

  //-------------------------------------------exchange-------------------------------------------//
  function Exchange() {
    switch (path) {
      case "devates":
        return <Devate />
      default:
        return <Default />
    }
  }

  return (
    <>
      <Exchange />
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
