import { Grid, GridItem } from "@nycplanning/streetscape";
import { Atlas } from "./atlas.client";
import { useScreenPortraitQuery } from "../components/ui";
import { Outlet } from "@remix-run/react";

export default function Layout() {
  const isScreenPortrait = useScreenPortraitQuery();
  // console.debug("isScreenPortrait", isScreenPortrait);

  return (
    <Grid
      position="absolute"
      height="100%"
      width="100%"
      gridTemplateColumns={"repeat(64, 1fr)"}
      gridTemplateRows={"repeat(32, 1fr)"}
    >
      <Outlet />
      <GridItem>
        <Atlas />
      </GridItem>
    </Grid>
  );
}
