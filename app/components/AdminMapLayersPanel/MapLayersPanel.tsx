import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@nycplanning/streetscape";
import React from "react";

export function MapLayersPanel({ children }: { children: React.ReactNode }) {
  return (
    <AccordionItem borderTop={"none"}>
      <AccordionButton p={0} aria-label="Toggle layers panel">
        <Heading
          flex="1"
          textAlign="left"
          fontSize="md"
          fontWeight="bold"
          lineHeight="32px"
          pb={0}
        >
          Capital Planning Data
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel px={0} py={3}>
        <Box>{children}</Box>
      </AccordionPanel>
    </AccordionItem>
  );
}
