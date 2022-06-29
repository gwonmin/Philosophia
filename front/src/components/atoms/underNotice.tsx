import { Grid, Typography } from "@mui/material";

export function UnderNoticeAtom({
  condition,
  children,
}: {
  condition?: boolean;
  children: any;
}) {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ color: "red", ml: 1 }}>
        {condition && <Typography>{children}</Typography>}
      </Grid>
    </Grid>
  );
}
