import { ReactNode } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@nycplanning/streetscape";
import { analyticsTrackFilterByDistrictToggle } from "../utils/analytics";
import { showRedesign } from "../utils/envFlags";

export const FilterMenu = ({ children, defaultIndex }: FilterMenuProps) => (
  <Accordion
    defaultIndex={defaultIndex}
    allowToggle
    allowMultiple={showRedesign ? false : true}
    borderRadius={"none"}
    padding={3}
    paddingTop={{ md: 0 }}
    paddingBottom={{ md: 0 }}
    background={"white"}
    width={{ base: "full", lg: showRedesign ? "full" : "21.25rem" }}
    maxW={{ base: "21.25rem", lg: "unset" }}
    onChange={analyticsTrackFilterByDistrictToggle}
  >
    {showRedesign ? (
      <AccordionItem borderBottomWidth="0 !important" borderTopWidth="0">
        <AccordionButton aria-label="Close geography filter menu" px={0}>
          <Heading
            flex="1"
            textAlign="left"
            fontSize="medium"
            fontWeight="bold"
            lineHeight="32px"
          >
            Filter by Location
          </Heading>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={3}>{children}</AccordionPanel>
      </AccordionItem>
    ) : (
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
        <AccordionPanel
          pb={0}
          borderTopWidth="1px"
          borderColor="gray.200"
          px={0}
        >
          {children}
        </AccordionPanel>
      </AccordionItem>
    )}
  </Accordion>
);

export interface FilterMenuProps {
  children: ReactNode;
  defaultIndex?: number;
}
