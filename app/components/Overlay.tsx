import { Flex } from "@nycplanning/streetscape";
import { ReactNode } from "react";

export interface OverlayProps {
  children: ReactNode;
}

export const Overlay = ({ children }: OverlayProps) => {
  return (
    <Flex
      position="relative"
      paddingX={{ base: 0, lg: 8 }}
      paddingBottom={{ base: 0, lg: 8 }}
      paddingTop={{ base: 3, lg: 8 }}
      height={"100vh"}
      width={"100vw"}
      direction={{ base: "column", lg: "row" }}
      justify={{ base: "flex-start", lg: "space-between" }}
      align={{ base: "center", lg: "flex-start" }}
      pointerEvents={"none"}
      sx={{
        "*": {
          pointerEvents: "auto",
        },
      }}
    >
      {children}
    </Flex>
  );
};
