import { Flex, Heading } from "@nycplanning/streetscape";
import { Agency, CapitalProject } from "~/gen";
import { CapitalProjectsList } from "./CapitalProjectsList";
import { useState } from "react";
import { MobilePanelResizeBar } from "../MobilePanelResizeBar";

export interface CapitalProjectsDrawerProps {
  capitalProjects: Array<CapitalProject>;
  district: string;
  agencies: Agency[];
  children: React.ReactNode;
}

export const CapitalProjectsDrawer = ({
  capitalProjects,
  district,
  agencies,
  children,
}: CapitalProjectsDrawerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Flex
      padding={{ base: 3, lg: 4 }}
      background={"white"}
      direction={"column"}
      borderTopLeftRadius={"base"}
      borderTopRightRadius={"base"}
      gap={4}
      position={{ base: "fixed", lg: "static" }}
    >
      <MobilePanelResizeBar
        isExpanded={isExpanded}
        isExpandedToggle={() => setIsExpanded(!isExpanded)}
      />
      <Heading color="gray.600" fontWeight={"bold"} fontSize={"lg"}>
        {district}
      </Heading>
      <Flex direction={"column"}>
        <CapitalProjectsList
          capitalProjects={capitalProjects}
          agencies={agencies}
          isExpanded={isExpanded}
        />
        {children}
      </Flex>
    </Flex>
  );
};
