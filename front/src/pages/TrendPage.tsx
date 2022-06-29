import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { customFetch } from "../util"
import Header from "../components/organisms/Header"

export default function TrendPage() {
  type Trend = {
    devatePosts: any[]
    freePosts: any[]
  }
  const [trend, setTrend] = useState<Trend | null>(null)
  const [isFetchCompleted, setIsFetchCompleted] = useState<boolean>(false)

  useEffect(() => {
    customFetch({ endpoint: "trend", setValue: setTrend, callback: setIsFetchCompleted })
  }, [])

  if (!isFetchCompleted) {
    return <p>loading...</p>
  }
  if (!trend) return <p>게시물이 없습니다.</p>
  return (
    <div>
      <Header />
      <p>트렌드 페이지</p>
      <div style={{ border: "3px solid black" }}>
        <p>화제의 찬반 토론</p>
        {trend.devatePosts.map((post) => {
          const yesRatio = (post.yes.length / (post.yes.length + post.no.length)) * 100
          const noRatio = (post.no.length / (post.yes.length + post.no.length)) * 100
          return (
            <div key={post._id} style={{ backgroundColor: "grey" }}>
              <Link to={"/devates/" + post._id}>
                <p>제목: {post.title}</p>
                <p>찬성: {yesRatio.toFixed(2)}%</p>
                <p>반성: {noRatio.toFixed(2)}%</p>
              </Link>
            </div>
          )
        })}
      </div>
      <div style={{ border: "3px solid black" }}>
        <p>화제의 자유 토론</p>
        {trend.freePosts.map((post) => {
          return (
            <div key={post._id} style={{ backgroundColor: "grey" }}>
              <Link to={"/freetopics/" + post._id}>
                <p>제목: {post.title}</p>
                <p>조회수: {post.visited}</p>
              </Link>
            </div>
          )
        })}
      </div>
      <div style={{ border: "3px solid black" }}>
        <p>화제의 AI 철학</p>
      </div>
    </div>
  )
}
