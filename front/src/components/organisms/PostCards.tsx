import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserStateContext } from "../../RootContext"
import { Post } from "../../types"
import * as Api from "../../api"

//-------------------------------------------Devate-------------------------------------------//
function Devate({ path, post }: { path: string; post: any }) {
  return (
    <div key={post._id} style={{ backgroundColor: "grey" }}>
      <Link to={"/" + path + "/" + post._id}>
        <p>제목: {post.title}</p>
        <p>글쓴이: {post.author.name}</p>
        <p>태그: {post.tag}</p>
        <p>
          찬성: {post.yes.length}, 반대: {post.no.length}
        </p>
        <p>덧글 수: {post.comment.length}</p>
      </Link>
    </div>
  )
}

//-------------------------------------------Share-------------------------------------------//
function Share({
  path,
  post,
  somethingWasChanged,
  setSomethingWasChanged,
}: {
  path: string
  post: any
  somethingWasChanged: any
  setSomethingWasChanged: any
}) {
  const user = useContext(UserStateContext)?.user
  const didLike = post.like.includes(user?._id)
  const likeHandler = async () => {
    if (!user) {
      return <p>user does not exist(even null)</p>
    }
    try {
      const res = await Api.put({ endpoint: `shares/${post._id}/like` })
      setSomethingWasChanged(!somethingWasChanged)
      console.log(
        "좋아요를 " + (didLike ? "취소하였습니다." : "눌렀습니다."),
        res.data,
        post.like,
        user
      )
    } catch (err) {
      console.log("좋아요에 실패했습니다.", err)
    }
  }
  return (
    <div key={post._id} style={{ backgroundColor: "grey" }}>
      <Link to={"/" + path + "/" + post._id}>
        <p>
          철학자 {post.philosopher}(이)가 생각하는 {post.subject}(이)란?
        </p>
        <p>
          본문:{" "}
          {post.content.length > 40
            ? post.content.substr(0, 40) + "...(중략)"
            : post.content}
        </p>
        <p>좋아요 수: {post.like.length}</p>
      </Link>
      {user && (
        <div>
          <button onClick={likeHandler}>
            {didLike ? "좋아요 취소" : "좋아요"}
          </button>
        </div>
      )}
    </div>
  )
}

//---------------------------------------------Data---------------------------------------------//
function Data({ post }: { post: any }) {
  console.log("in Data function")
  return (
    <div key={post._id} style={{ backgroundColor: "grey" }}>
      <Link to={post._id}>
        <p>제목: {post.title}</p>
        <p>공유 날짜: {post.createdAt}</p>
        <p>마지막 업데이트: {post.updatedAt}</p>
      </Link>
    </div>
  )
}

//-------------------------------------------Default-------------------------------------------//
function Default({ path, post }: { path: string; post: any }) {
  return (
    <div key={post._id} style={{ backgroundColor: "grey" }}>
      <Link to={"/" + path + "/" + post._id}>
        <p>제목: {post.title}</p>
        <p>글쓴이: {post.author.name}</p>
        <p>덧글 수: {post.comment.length}</p>
      </Link>
    </div>
  )
}

//-------------------------------------------exchange-------------------------------------------//
export default function Exchange({
  path,
  post,
  somethingWasChanged,
  setSomethingWasChanged,
}: {
  path: string
  post: any
  somethingWasChanged: any
  setSomethingWasChanged: any
}) {
  console.log("locatiom: Exchange, post: ", post)
  switch (path) {
    case "devates":
      return <Devate path={path} post={post} />
    case "shares":
      return (
        <Share
          path={path}
          post={post}
          somethingWasChanged={somethingWasChanged}
          setSomethingWasChanged={setSomethingWasChanged}
        />
      )
    case "data":
      console.log("in data case")
      return <Data post={post} />
    default:
      return <Default path={path} post={post} />
  }
}
