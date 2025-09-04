import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
} from "@nycplanning/streetscape";
import { Agency, CapitalProject, AgencyBudget } from "~/gen";
import { CapitalProjectsList } from "./CapitalProjectsList";
import { analyticsTrackSelectedDistrictToggle } from "~/utils/analytics";
import { MobilePanelResizeBar } from "../MobilePanelResizeBar";
import { useEffect, useState } from "react";
import { showRedesign } from "~/utils/envFlags";
export interface CapitalProjectsAccordionPanelProps {
  capitalProjects: Array<CapitalProject>;
  agencies: Agency[];
  capitalProjectsTotal: number;
  agencyBudgets: AgencyBudget[];
  children: React.ReactNode;
}

export interface LegacyCapitalProjectsAccordionPanelProps {
  capitalProjects: Array<CapitalProject>;
  agencies: Agency[];
  capitalProjectsTotal: number;
  children: React.ReactNode;
}

export const CapitalProjectsAccordionPanel = ({
  capitalProjects,
  capitalProjectsTotal,
  agencies,
  children,
}:
  | CapitalProjectsAccordionPanelProps
  | LegacyCapitalProjectsAccordionPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (showRedesign) {
    return (
      <>
        <Flex
          background={"white"}
          direction={"column"}
          borderTopLeftRadius={"base"}
          borderTopRightRadius={"base"}
          width={"full"}
          zIndex={{ base: "2" }}
          className={"accordianWrapper"}
        >
          <Accordion
            defaultIndex={[0]}
            // allowMultiple={false}
            allowToggle
            onChange={analyticsTrackSelectedDistrictToggle}
            margin={{
              base: "0 3dvw 2dvh 3dvw",
              md: "1dvh 1dvw .5dvh 1dvw",
            }}
            className={"capProjAccordian"}
          >
            <AccordionItem border="none" className={"capProjAccordianItem"}>
              <AccordionButton
                padding="0px"
                aria-label="Toggle project list panel"
                height={{
                  base: "7dvh",
                  md: "initial",
                }}
              >
                <Box as="span" flex="1" textAlign="left">
                  <Heading
                    color="gray.600"
                    fontWeight={"bold"}
                    fontSize={"lg"}
                    marginBottom={{ md: "1dvh" }}
                    padding={{ md: "0.5dvh 0" }}
                  >
                    {/* remove star after "Results" before deployment */}
                    {capitalProjectsTotal} Results *
                  </Heading>
                </Box>
                <AccordionIcon size="lg" className={"collapseButton"} />
                <Box borderTopWidth={"1px"} paddingBottom={4} />
              </AccordionButton>
              <AccordionPanel
                padding={"0px"}
                className={"accordianPanelSubItem"}
                overflowY={"hidden"}
                height={{ base: "83dvh", md: "initial" }}
                display={{ base: "flex" }}
                flexDirection={{ base: "column" }}
              >
                <CapitalProjectsList
                  capitalProjects={capitalProjects}
                  agencies={agencies}
                  capitalProjectsTotal={capitalProjectsTotal}
                  isExpanded={isExpanded}
                />
                {children}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Flex
        borderRadius={"base"}
        padding={{ base: 3, lg: 4 }}
        background={"white"}
        direction={"column"}
        width={{ base: "full", lg: "21.25rem" }}
        maxW={{ base: "21.25rem", lg: "unset" }}
        boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
        gap={4}
      >
        <Accordion
          defaultIndex={[0]}
          allowToggle
          onChange={analyticsTrackSelectedDistrictToggle}
        >
          <AccordionItem border="none">
            <AccordionButton
              padding="0px"
              aria-label="Toggle project list panel"
            >
              <Box as="span" flex="1" textAlign="left">
                <Heading
                  color="gray.600"
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  paddingBottom={"8px"}
                >
                  {capitalProjectsTotal} Results
                </Heading>
              </Box>
              <AccordionIcon size="lg" />
            </AccordionButton>
            <Box
              borderTopWidth={"1px"}
              borderTopColor={"gray.400"}
              paddingBottom={4}
            />
            <AccordionPanel padding={"0px"}>
              <CapitalProjectsList
                capitalProjects={capitalProjects}
                agencies={agencies}
                capitalProjectsTotal={capitalProjectsTotal}
                isExpanded={true}
              />
              {children}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </>
  );
};
