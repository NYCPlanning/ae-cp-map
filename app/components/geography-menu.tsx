import { Flex, Heading } from "@nycplanning/streetscape";
import { ReactNode } from "react";
import { GeographyTypeSelector } from "./geography-type-selector";

export function GeographyMenu({ children }: { children: ReactNode }) {
  return (
    <Flex
      borderRadius={"base"}
      padding={{ base: 3, lg: 4 }}
      background={"white"}
      direction={"column"}
      boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
      width={"100%"}
      height={"100%"}
    >
      <Heading
        fontSize={"lg"}
        fontWeight={"medium"}
        textAlign={"left"}
        borderBottomStyle={"dotted"}
        borderBottomWidth={"1px"}
        borderBottomColor={"gray.400"}
      >
        Filter by geography
      </Heading>
      {children}
    </Flex>
  );
}
