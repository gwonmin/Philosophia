import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { customFetch } from "../util"

import { Devate_Post, Free_Post, Post, Props } from "../types"
import { Grid, Typography, Paper } from "@mui/material"
import { MainlineMolecule, PostListItemContainerAtom } from "../components/organisms/PostCards"

// @ts-ignore
import BannerImage from "../../public/img/banner.png"
// @ts-ignore
import TSMan from "../../public/img/ts_man.avif"
import HotPotatoTitle from "../components/atoms/HotPotatoTitle"
import SublineAtom from "../components/atoms/SublineAtom"

const SectionPage: React.FC<Props & { xs?: number }> = ({ children, xs = 12 }) => {
  return (
    <Grid item xs={xs}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 3px 20px #1d26260d",
          borderRadius: "15px",
          // transform: perspective(1px) translateZ(0);
          transitionDuration: "0.3s",
          transitionProperty: "transform",
          transitionTimingFunction: "ease-out",
          "&:hover": {
            transform: "translateY(-8px)",
          },
        }}
      >
        {children}
      </Paper>
    </Grid>
  )
}
const ImageSectionPage: React.FC<{
  source: any
  height?: number
  xs?: number
}> = ({ source, height = 200, xs = 12 }) => {
  return (
    <Grid item xs={xs} sx={{ height: height }}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 3px 20px #1d26260d",
          borderRadius: "15px",
          height: "100%",
          // transform: perspective(1px) translateZ(0);
          transitionDuration: "0.3s",
          transitionProperty: "transform",
          transitionTimingFunction: "ease-out",
          backgroundImage: `url(${source})`,
          backgroundSize: "cover",
          "&:hover": {
            transform: "translateY(-8px)",
          },
        }}
      />
    </Grid>
  )
}

export default function TrendPage() {
  type Trend = {
    devatePosts: Devate_Post[]
    freePosts: Free_Post[]
    sharePosts: any[]
  }
  const [trend, setTrend] = useState<Trend | null>(null)
  const [isFetchCompleted, setIsFetchCompleted] = useState<boolean>(false)
  const navigate = useNavigate()
  console.log(trend)
  useEffect(() => {
    customFetch({
      endpoint: "trend",
      setValue: setTrend,
      callback: setIsFetchCompleted,
    })
  }, [])

  if (!isFetchCompleted) {
    return <p>loading...</p>
  }
  if (!trend) return <p>게시물이 없습니다.</p>
  return (
    <>
      {/* first column */}
      <Grid container item xs={6} rowSpacing={1.5}>
        <ImageSectionPage source={BannerImage} height={160} />
        <SectionPage>
          <HotPotatoTitle title="화제의 찬반 토론" />
          {trend.devatePosts.map((post, idx) => {
            const yesRatio = (post.yes.length / Math.max(1, post.yes.length + post.no.length)) * 100
            const noRatio = (post.no.length / Math.max(1, post.yes.length + post.no.length)) * 100
            return (
              <PostListItemContainerAtom
                key={`trend-chanban-${idx}`}
                onClick={() => {
                  navigate(`/devates/${post._id}`)
                }}
              >
                <Grid container>
                  <Grid container xs={8} item direction="column" alignItems="flex-start" justifyContent="center">
                    <Grid item>
                      <MainlineMolecule title={post.title} />
                    </Grid>
                    <Grid item>
                      <SublineAtom subtext={post.author.name} />
                    </Grid>
                  </Grid>
                  <Grid container xs={4}>
                    <SublineAtom yes={yesRatio.toFixed(1) + "%"} no={noRatio.toFixed(1) + "%"} />
                  </Grid>
                </Grid>
              </PostListItemContainerAtom>
            )
          })}
        </SectionPage>
      </Grid>

      {/* second column */}
      <Grid container item xs={3} rowSpacing={3}>
        <SectionPage>
          <HotPotatoTitle title="화제의 자유토론" />
          {trend.freePosts.map((post, idx) => {
            return (
              <PostListItemContainerAtom
                key={`trend-free-${idx}`}
                onClick={() => {
                  navigate(`/freetopics/${post._id}`)
                }}
              >
                <MainlineMolecule title={post.title.length > 8 ? `${post.title.substring(0, 8)}...` : post.title} />
                <SublineAtom subtext={post.author.name} />
              </PostListItemContainerAtom>
            )
          })}
        </SectionPage>
        <ImageSectionPage source={TSMan} height={250} />
      </Grid>

      {/* third column */}
      <Grid container item xs={3} rowSpacing={3}>
        <SectionPage>
          <HotPotatoTitle title="화제의 AI 철학" />
          {trend.sharePosts.map((post, idx) => {
            return (
              <PostListItemContainerAtom
                key={`trend-share-${post._id}`}
                onClick={() => {
                  navigate(`/shares/${post._id}`)
                }}
              >
                <MainlineMolecule title={`${post.philosopher}(이)가 생각하는 ${post.subject}(이)란?`} />
                <SublineAtom subtext={post.author.name} />
              </PostListItemContainerAtom>
            )
          })}
        </SectionPage>
      </Grid>
    </>
  )
}
