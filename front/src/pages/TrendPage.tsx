import { useEffect, useState } from "react"

import { customFetch } from "../util"

export default function TrendPage() {
  type Trend = {
    devatePosts: any[]
    freePosts: any[]
  }
  const [trend, setTrend] = useState<Trend | null>(null)
  const [isFetchCompleted, setIsFetchCompleted] = useState(false)

  useEffect(() => {
    customFetch({ endpoint: "trend", setValue: setTrend, callback: setIsFetchCompleted })
  }, [])

  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  if (!trend) return <p>게시물이 없습니다.</p>
  return (
    <div>
      <p>트렌드 페이지</p>
      <div>
        <p>화제의 찬반 토론</p>
        {trend.devatePosts?.map((post) => {
          return (
            <div>
              <p>제목: { }</p>
            </div>
          )
        })}
      </div>
      <div>
        <p>화제의 자유 토론</p>
      </div>
      <div>
        <p>화제의 공유 글</p>
      </div>
    </div>
  )
}
