import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Box,
} from "@chakra-ui/react";

export function MapLayersPanel({ children }: { children: React.ReactNode }) {
  return (
    <Accordion
      defaultIndex={[0]}
      allowToggle
      borderTopWidth="1px"
      borderTopColor="gray.50"
      bg="white"
      padding={{ base: 3, lg: 3 }}
      paddingTop={{ lg: "0" }}
      paddingBottom={{ lg: "0" }}
      width={{ base: "full", lg: "full" }}
      maxW={{ base: "21.25rem", lg: "unset" }}
      borderBottomRadius="base"
    >
      <AccordionItem borderTopWidth="0">
        <AccordionButton px={0} aria-label="Toggle layers panel">
          <Heading
            flex="1"
            textAlign="left"
            fontSize="md"
            fontWeight="bold"
            lineHeight="32px"
            pb={0}
          >
            Capital Planning Layers
          </Heading>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel px={0} borderTopWidth="1px" borderColor="gray.200">
          <Box>{children}</Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
