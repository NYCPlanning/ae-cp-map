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
  return (
    <Accordion width={"100%"} maxHeight={"100%"} defaultIndex={[0]} allowToggle>
      <AccordionItem borderTop={"none"}>
        <AccordionButton aria-label="Toggle project list panel" p={0}>
          <Heading
            flex="1"
            textAlign="left"
            fontSize="medium"
            fontWeight="bold"
            lineHeight="32px"
          >
            {capitalProjectsTotal} Results
          </Heading>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          padding={"0px"}
          overflowY={"hidden"}
          overflow={"scroll"}
        >
          <CapitalProjectsList
            capitalProjects={capitalProjects}
            agencies={agencies}
            capitalProjectsTotal={capitalProjectsTotal}
          />
          {children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
