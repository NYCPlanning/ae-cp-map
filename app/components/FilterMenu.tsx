import { ReactNode } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@nycplanning/streetscape";

export const FilterMenu = ({ children, defaultIndex }: FilterMenuProps) => (
  <Accordion
    allowToggle
    allowMultiple
    borderRadius={"base"}
    padding={{ base: 3, lg: 4 }}
    background={"white"}
    direction={"column"}
    width={{ base: "full", lg: "21.25rem" }}
    maxW={{ base: "21.25rem", lg: "unset" }}
    boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
    defaultIndex={defaultIndex}
  >
    <AccordionItem borderTopWidth="0" value="1">
      <AccordionButton aria-label="Close geography filter menu" px={0}>
        <Box
          as="span"
          flex="1"
          textAlign="left"
          fontSize="large"
          fontWeight="medium"
        >
          Filter by District
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={0} borderTopWidth="1px" borderColor="gray.200" px={0}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export interface FilterMenuProps {
  children: ReactNode;
  defaultIndex?: number;
}
