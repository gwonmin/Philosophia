import { TextFieldAtom } from "../atoms/textInputs"
import { handleChange } from "../../util"
import { COMMON_ROUTE } from "../../route/Routes"
import * as Api from "../../api"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

//-------------------------------------------Devate-------------------------------------------//
function Devate({ path }: { path: string }) {
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    tag: "",
  })
  const navigate = useNavigate()
  const handlePost = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: path ?? "",
        data: postInfo,
      })
      console.log(path, "의 post요청이 성공했습니다. data: ", res.data)
      navigate(-1)
    } catch (err) {
      console.log("게시글 등록에 실패하였습니다.\n", err)
    }
  }
  const onChange = (e: any) => handleChange({ event: e, someState: postInfo, setSomeState: setPostInfo })
  return (
    <>
      <TextFieldAtom id="title" label="title" name="title" value={postInfo.title} onChange={onChange} />
      <TextFieldAtom id="content" label="content" name="content" value={postInfo.content} onChange={onChange} />
      <TextFieldAtom id="tag" label="tag" name="tag" value={postInfo.tag} onChange={onChange} />
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

//-------------------------------------------Philosopher-------------------------------------------//
function Philosopher({ path }: { path: string }) {
  const navigate = useNavigate()
  const params = useParams()
  const philosopher = params.who
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
  })
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPostInfo({
      ...postInfo,
      [name]: value,
    })
  }
  const postPost = async () => {
    if (!philosopher) {
      console.log("URI의 철학자 정보가 잘못되었습니다.")
      return
    }
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: philosopher,
        data: postInfo,
      })
      navigate(-1)
    } catch (err) {
      console.log("등록에 실패하였습니다.\n", err)
    }
  }

  return (
    <div>
      <TextFieldAtom id="title" label="title" name="title" value={postInfo.title} onChange={onChange} />
      <TextFieldAtom id="content" label="content" name="content" value={postInfo.content} onChange={onChange} />
      <button onClick={postPost}>게시물 등록하기</button>
      <button
        onClick={() => {
          navigate(-1)
        }}
      >
        취소
      </button>
    </div>
  )
}

//-------------------------------------------exchange-------------------------------------------//
export default function ComoonPostAddForm({ path }: { path: string }) {
  switch (path) {
    case "devates":
      return <Devate path={path} />
    case "philosopher":
      return <Philosopher path={path} />
    default:
      return <p>잘못된 경로입니다.</p>
  }
}
