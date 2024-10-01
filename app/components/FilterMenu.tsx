import { ReactNode } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@nycplanning/streetscape";
import { analyticsTrackFilterByDistrictToggle } from "~/utils/analytics";

export const FilterMenu = ({ children, defaultIndex }: FilterMenuProps) => (
  <Accordion
    allowToggle
    borderTopRadius={"base"}
    borderBottomRadius={{ base: "base", lg: "none" }}
    padding={{ base: 3, lg: 4 }}
    background={"white"}
    width={{ base: "full", lg: "21.25rem" }}
    maxW={{ base: "21.25rem", lg: "unset" }}
    boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
    defaultIndex={defaultIndex}
    onChange={analyticsTrackFilterByDistrictToggle}
  >
    <AccordionItem borderTopWidth="0">
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
