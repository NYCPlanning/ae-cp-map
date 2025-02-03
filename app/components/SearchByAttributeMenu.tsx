import { ReactNode } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@nycplanning/streetscape";
import { analyticsTrackSearchByAttributeToggle } from "~/utils/analytics";

export const SearchByAttributeMenu = ({
  children,
  defaultIndex,
}: SearchByAttributeMenuProps) => (
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
    onChange={analyticsTrackSearchByAttributeToggle}
  >
    <AccordionItem borderTopWidth="0">
      <AccordionButton aria-label="Close search by attribute menu" px={0}>
        <Box
          as="span"
          flex="1"
          textAlign="left"
          fontSize="large"
          fontWeight="medium"
        >
          Search By Attribute
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={0} borderTopWidth="1px" borderColor="gray.200" px={0}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export interface SearchByAttributeMenuProps {
  children: ReactNode;
  defaultIndex?: number;
}
