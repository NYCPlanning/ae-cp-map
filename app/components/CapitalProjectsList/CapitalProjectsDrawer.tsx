import { Flex, Heading } from "@nycplanning/streetscape";
import { Agency, CapitalProject, AgencyBudget } from "~/gen";
import { CapitalProjectsList } from "./CapitalProjectsList";
import { useState } from "react";
import { MobilePanelResizeBar } from "../MobilePanelResizeBar";

export interface CapitalProjectsDrawerProps {
  capitalProjects: Array<CapitalProject>;
  agencies: Agency[];
  capitalProjectsTotal: number;
  agencyBudgets: AgencyBudget[];
  children: React.ReactNode;
}

export const CapitalProjectsDrawer = ({
  capitalProjects,
  capitalProjectsTotal,
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
      width={"full"}
    >
      <MobilePanelResizeBar
        isExpanded={isExpanded}
        isExpandedToggle={() => setIsExpanded(!isExpanded)}
      />
      <Heading color="gray.600" fontWeight={"bold"} fontSize={"lg"}>
        {capitalProjectsTotal} Results
      </Heading>
      <Flex direction={"column"}>
        <CapitalProjectsList
          capitalProjects={capitalProjects}
          agencies={agencies}
          capitalProjectsTotal={capitalProjectsTotal}
          isExpanded={isExpanded}
        />
        {children}
      </Flex>
    </Flex>
  );
};
