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
        borderRadius={"base"}
        width={"full"}
      >
        <Accordion
          defaultIndex={[0]}
          allowToggle
          marginLeft={"2dvw"}
          marginRight={"2dvw"}
        >
          <AccordionItem border="none">
            <AccordionButton
              padding="0px"
              aria-label="Toggle project list panel"
              height={"7dvh"}
            >
              <Box as="span" flex="1" textAlign="left">
                {capitalProjectsTotal} Results
              </Box>
              <AccordionIcon size="lg" />
            </AccordionButton>
            <AccordionPanel
              padding={"0px"}
              overflowY={"hidden"}
              height={{ md: "65dvh", xl: "50dvh" }}
              overflow={"scroll"}
            >
              <CapitalProjectsList
                capitalProjects={capitalProjects}
                agencies={agencies}
                capitalProjectsTotal={capitalProjectsTotal}
                isExpanded={isExpanded}
              />
              {/* {children} */}
            </AccordionPanel>
            <AccordionPanel
              paddingInlineStart={"0"}
              paddingInlineEnd={"0"}
              paddingBottom={"1dvh"}
            >
              {children}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </>
  );
};
