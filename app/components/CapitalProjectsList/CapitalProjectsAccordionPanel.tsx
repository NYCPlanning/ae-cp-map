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
import { Agency, CapitalProject } from "~/gen";
import { CapitalProjectsList } from "./CapitalProjectsList";

export interface CapitalProjectsAccordionPanelProps {
  capitalProjects: Array<CapitalProject>;
  district: string;
  agencies: Agency[];
  children: React.ReactNode;
}

export const CapitalProjectsAccordionPanel = ({
  capitalProjects,
  district,
  agencies,
  children,
}: CapitalProjectsAccordionPanelProps) => {
  return (
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
      <Accordion defaultIndex={[0]} allowToggle>
        <AccordionItem border="none">
          <AccordionButton padding="0px" aria-label="Toggle project list panel">
            <Box as="span" flex="1" textAlign="left">
              <Heading
                color="gray.600"
                fontWeight={"bold"}
                fontSize={"lg"}
                paddingBottom={"8px"}
              >
                {district}
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
            />
            {children}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};