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
import { useState } from "react";
export interface CapitalProjectsAccordionPanelProps {
  capitalProjects: Array<CapitalProject>;
  agencies: Agency[];
  capitalProjectsTotal: number;
  agencyBudgets: AgencyBudget[];
  children: React.ReactNode;
}

export const CapitalProjectsAccordionPanel = ({
  capitalProjects,
  capitalProjectsTotal,
  agencies,
  children,
}: CapitalProjectsAccordionPanelProps) => {
  const [isExpanded] = useState(false);

  return (
    <>
      <Flex
        background={"white"}
        direction={"column"}
        borderTopLeftRadius={"base"}
        borderTopRightRadius={"base"}
        width={"full"}
        zIndex={{ base: "2" }}
      >
        <Accordion
          defaultIndex={[0]}
          allowToggle
          margin={{
            base: "0 3dvw",
            md: "1dvh 1dvw .5dvh 1dvw",
          }}
        >
          <AccordionItem border="none">
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
                  {capitalProjectsTotal} Results
                </Heading>
              </Box>
              <AccordionIcon size="lg" />
              <Box borderTopWidth={"1px"} paddingBottom={4} />
            </AccordionButton>
            <AccordionPanel
              padding={"0px"}
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
};
