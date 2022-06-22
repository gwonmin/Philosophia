import { Link } from "react-router-dom"
import { Post, DevatePost } from "../templates/CommonTemplate"

export default function CommonPostCards({ currentPage, postList }: { currentPage: any; postList: Post[] }) {
  return (
    <div>
      {postList.length == 0 && <p>아직 게시물이 없네요.</p>}
      {postList != [] && (
        <div>
          <p>게시물 목록:</p>
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
        </div>
      )}
    </div>
  )
}
