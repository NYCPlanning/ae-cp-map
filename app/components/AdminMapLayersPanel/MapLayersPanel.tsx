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
      px={{ base: 3, lg: 3 }}
      paddingTop={{ md: "0" }}
      paddingBottom={{ md: "0" }}
      width={{ base: "full", lg: "full" }}
      maxW={{ base: "21.25rem", lg: "unset" }}
      borderBottomRadius="base"
    >
      <AccordionItem border="none">
        <AccordionButton px={0} aria-label="Toggle layers panel">
          <Heading
            flex="1"
            textAlign="left"
            fontSize="lg"
            fontWeight="medium"
            lineHeight="32px"
            mb="1dvh"
          >
            Capital Planning Layers
          </Heading>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel px={0}>
          <Box>{children}</Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
