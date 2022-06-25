import { useNavigate } from "react-router-dom"

export default function showPostInfo({ postInfo }: { postInfo: any }) {
  const navigate = useNavigate()
  return (
    <div style={{ border: "3px solid black" }}>
      {postInfo.title && <p>제목: {postInfo.title}</p>}
      <p>글쓴이: {postInfo.author.name}</p>
      <p>작성일: {postInfo.createdAt}</p>
      <p>내용: {postInfo.content}</p>
      {postInfo.tag && <p>태그: {postInfo.tag}</p>}
      {postInfo.yes && postInfo.no && (
        <p>
          찬성: {postInfo.yes.length}, 반대: {postInfo.no.length}
        </p>
      )}
      <button
        onClick={() => {
          navigate(-1)
        }}
      >
        목록
      </button>
    </div>
  )
}
