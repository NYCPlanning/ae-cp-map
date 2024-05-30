import { useMediaQuery } from "@nycplanning/streetscape";

export const useScreenPortraitQuery = () =>
  useMediaQuery("(orientation: portrait)");
