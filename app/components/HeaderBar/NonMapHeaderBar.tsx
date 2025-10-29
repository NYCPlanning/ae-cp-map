import { Box } from "@nycplanning/streetscape";
import { HeaderBar } from "./HeaderBar";

export function NonMapHeaderBar() {
  return (
    <Box
      boxShadow={"0 2px 8px 0 rgba(0, 0, 0, 0.16)"}
      height={"7dvh"}
      width={"100dvw"}
      position={"sticky"}
      top={0}
      background={"white"}
    >
      <HeaderBar />
    </Box>
  );
}
