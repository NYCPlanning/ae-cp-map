import { ReactNode } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@nycplanning/streetscape";
// import { analyticsTrackSearchByAttributeToggle } from "~/utils/analytics";

export const SearchByAttributeMenu = ({
  children,
  defaultIndex,
}: SearchByAttributeMenuProps) => (
  <Accordion
    allowToggle
    borderRadius={"none"}
    padding={{ base: 3, lg: 4 }}
    background={"white"}
    width={{ base: "full", lg: "21.25rem" }}
    maxW={{ base: "21.25rem", lg: "unset" }}
    marginBottom={{ base: 3, lg: 4 }}
    borderY={"1px solid"}
    borderColor={"gray.300"}
    defaultIndex={defaultIndex}
    // onChange={analyticsTrackSearchByAttributeToggle}
  >
    <AccordionItem border="none">
      <AccordionButton aria-label="Close search by attribute menu" px={0}>
        <Box
          as="span"
          flex="1"
          textAlign="left"
          fontSize="large"
          fontWeight="medium"
        >
          Search by Attribute
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
