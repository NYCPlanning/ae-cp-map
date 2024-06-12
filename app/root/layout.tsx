import { Grid, GridItem } from "@nycplanning/streetscape";
import { Atlas } from "./atlas.client";
import { useScreenPortraitQuery } from "../components/ui";
import { Outlet } from "@remix-run/react";
import WelcomePanelBase, {
  LayoutSetType,
} from "../components/welcome-panel/base";
import { useState } from "react";

export default function Layout() {
  const isScreenPortrait = useScreenPortraitQuery();
  // console.debug("isScreenPortrait", isScreenPortrait);
  const [layoutSet, setLayoutSet] = useState<LayoutSetType>("default");

  return (
    <Grid
      position="absolute"
      height="100%"
      width="100%"
      gridTemplateColumns={"repeat(64, 1fr)"}
      gridTemplateRows={"repeat(32, 1fr)"}
    >
      <WelcomePanelBase layoutSet={layoutSet} setLayoutSet={setLayoutSet} />
      <Outlet />
      <GridItem>
        <Atlas />
      </GridItem>
    </Grid>
  );
}
