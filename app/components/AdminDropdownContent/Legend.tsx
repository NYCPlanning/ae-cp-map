import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@nycplanning/streetscape";

export function Legend() {
  return (
    <>
      <Accordion
        allowToggle
        borderBottomRadius={"base"}
        padding={{ base: 3, lg: "10px 12px 0 12px" }}
        background={"white"}
        width={{ base: "full", lg: "full" }}
        maxW={{ base: "21.25rem", lg: "unset" }}
        borderTopWidth={"1px"}
        borderTopColor={"gray.50"}
      >
        <AccordionItem border="none">
          <AccordionButton aria-label="Toggle welcome panel" px={0}>
            <Heading
              fontSize="sm"
              fontStyle={"normal"}
              fontWeight="bold"
              lineHeight={"20px"}
              display={"flex"}
              justifyContent={"space-between"}
              flex="1"
            >
              Legend
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel
            pb={0}
            px={0}
            borderBottomStyle={"solid"}
            borderBottomColor={"gray.200"}
            // borderBottomWidth={"1px"}
          >
            <Box>
              <Box marginBottom={3}></Box>
              <Text fontSize={"small"}>LEGEND CONTENT</Text>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
