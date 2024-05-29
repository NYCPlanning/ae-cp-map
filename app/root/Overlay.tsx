import { Grid } from "@nycplanning/streetscape";
import { ReactNode } from "react";
import { Outlet } from "@remix-run/react";
import { FilterMenu } from "../components/FilterMenu";

export const Overlay = () => {
  return (
    <Grid position="absolute" zIndex={1}>
      <FilterMenu onClose={() => null} />
      <Outlet />
    </Grid>
  );
};

export interface OverlayProps {
  children: ReactNode;
}
