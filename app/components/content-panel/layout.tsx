import { Flex, GridItem } from "@nycplanning/streetscape";
import { ReactNode } from "react";

export default function ContentPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <GridItem
      zIndex={1}
      gridColumnStart={42}
      gridColumnEnd={64}
      gridRowStart={2}
      gridRowEnd={30}
    >
      <Flex
        borderRadius={"base"}
        padding={{ base: 3, lg: 4 }}
        background={"white"}
        direction={"column"}
        boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
        width={"100%"}
        height={"100%"}
      >
        {children}
      </Flex>
    </GridItem>
  );
}
