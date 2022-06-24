import { Link } from "react-router-dom"
import { Post } from "../templates/CommonPageTemplate"

export default function CommonPostCards({ currentPage, postList }: { currentPage: any; postList: Post[] }) {
  //-------------------------------------------Devate-------------------------------------------//
  function Devate({ post }: { post: any }) {
    return (
      <>
        <p>제목: {post.title}</p>
        <p>글쓴이: {post.author.name}</p>
        <p>태그: {post.tag}</p>
        <p>
          찬성: {post.yes.length}, 반대: {post.no.length}
        </p>
        <p>덧글 수: {post.comment.length}</p>
      </>
    )
  }

  //-------------------------------------------Philosopher-------------------------------------------//
  function Philosopher({ post }: { post: any }) {
    return (
      <>
        <p>제목: {post.title}</p>
        <p>글쓴이: {post.author.name}</p>
        <p>덧글 수: {post.comment.length}</p>
      </>
    )
  }

  //-------------------------------------------exchange-------------------------------------------//
  function Exchange({ post }: { post: any }) {
    console.log("locatiom: Exchange, post: ", post)
    switch (currentPage.DEFAULT.path) {
      case "devates":
        return <Devate post={post} />
      case ":who":
        return <Philosopher post={post} />
      default:
        return <p>잘못된 경로입니다.</p>
    }
  }
  return (
    <div>
      {postList.length == 0 && <p>아직 게시물이 없네요.</p>}
      {postList != [] && (
        <div>
          <p>토론 목록:</p>
          {postList.map((post: Post) => {
            return (
              <div key={post._id} style={{ backgroundColor: "grey" }}>
                <Link to={post._id}>
                  <Exchange post={post} />
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
