// user detail infos like "좋아하는 철학자, 좋아하는 글, ..."
import LikedPhilosopher from "../molecules/LikedPhilosopher";
import LikedBooks from "../molecules/LikedBooks";
import SharedArticles from "../molecules/SharedArticles";
import WroteArticles from "../molecules/WroteArticles";
import AgreedTopics from "../molecules/AgreedTopics";
import OpposingTopics from "../molecules/OpposingTopics";

import { Grid } from "@mui/material";

export default function UserDetail() {
  return (
    <>
      <Grid item xs={12}>
        <LikedPhilosopher />
      </Grid>
      <Grid item xs={12}>
        <LikedBooks />
      </Grid>
      <Grid item xs={12}>
        <SharedArticles />
      </Grid>
      <Grid item xs={12}>
        <WroteArticles />
      </Grid>
      <Grid item xs={12}>
        <AgreedTopics />
      </Grid>
      <Grid item xs={12}>
        <OpposingTopics />
      </Grid>
    </>
  );
}
