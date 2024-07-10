import { Box, Flex, Heading } from "@nycplanning/streetscape";
import { Slide } from "@chakra-ui/transition";
import { Agency, CapitalProject } from "~/gen";
import { CapitalProjectsList } from "./CapitalProjectsList";
import { useState } from "react";

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
    <Slide direction="bottom" in={true} style={{ zIndex: 10 }}>
      <Flex
        padding={{ base: 3, lg: 4 }}
        background={"white"}
        direction={"column"}
        borderTopLeftRadius={"base"}
        borderTopRightRadius={"base"}
        gap={4}
      >
        <Box
          height={"4px"}
          width={20}
          backgroundColor={"gray.300"}
          alignSelf={"center"}
          role="button"
          borderRadius={"2px"}
          aria-label={
            isExpanded
              ? "Collapse project list panel"
              : "Expand project list panel"
          }
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        />
        <Heading color="gray.600" fontWeight={"bold"} fontSize={"lg"}>
          {district}
        </Heading>

        <Flex
          height={{ base: isExpanded ? "85vh" : "40vh", lg: "auto" }}
          direction={"column"}
          transition={"height 0.5s ease-in-out"}
        >
          <CapitalProjectsList
            capitalProjects={capitalProjects}
            agencies={agencies}
          />
          {children}
        </Flex>
      </Flex>
    </Slide>
  );
};
