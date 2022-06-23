import { Link } from "react-router-dom"
import { Post } from "../templates/CommonPageTemplate"

export default function CommonPostCards({ currentPage, postList }: { currentPage: any; postList: Post[] }) {
  return (
    <div>
      {postList.length == 0 && <p>아직 게시물이 없네요.</p>}
      {postList != [] && <Exchange path={currentPage.DEFAULT.path} postList={postList} />}
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

//-------------------------------------------Devate-------------------------------------------//
function Devate({ postList }: { postList: Post[] }) {
  console.log("location: Devate, postList: ", postList)
  return (
    <>
      <p>토론 목록:</p>
      {postList.map((post: Post) => {
        return (
          <div key={post._id} style={{ backgroundColor: "grey" }}>
            <Link to={post._id}>
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
      })}
    </>
  )
}

//-------------------------------------------Philosopher-------------------------------------------//
function Philosopher({ postList }: { postList: Post[] }) {
  console.log("location: Philosopher, postList: ", postList)
  return (
    <>
      <p>토론 목록:</p>
      {postList.map((post: Post) => {
        return (
          <div key={post._id} style={{ backgroundColor: "grey" }}>
            <Link to={post._id}>
              <p>제목: {post.title}</p>
              <p>글쓴이: {post.author.name}</p>
              <p>덧글 수: {post.comment.length}</p>
            </Link>
          </div>
        )
      })}
    </>
  )
}
