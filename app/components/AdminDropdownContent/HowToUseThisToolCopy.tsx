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

export function HowToUseThisToolCopy() {
  return (
    <>
      <Accordion
        allowToggle
        borderBottomRadius={"base"}
        padding={{ base: 3, lg: 4 }}
        background={"white"}
        width={{ base: "full", lg: "full" }}
        maxW={{ base: "21.25rem", lg: "unset" }}
        boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
        borderTopWidth={"1px"}
        borderTopColor={"gray.50"}
        defaultIndex={0}
        className={"howToUse"}
      >
        <AccordionItem border="none">
          <AccordionButton aria-label="Toggle welcome panel" px={0}>
            <Heading
              fontSize="medium"
              fontWeight="medium"
              lineHeight={"32px"}
              display={"flex"}
              justifyContent={"space-between"}
              flex="1"
            >
              How to Use This Tool
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={0} px={0}>
            <Box>
              <Box
                borderBottomStyle={"solid"}
                borderBottomColor={"gray.200"}
                borderBottomWidth={"1px"}
                marginBottom={3}
              ></Box>
              <Text fontSize={"small"}>
                Select a project on the map to learn more about the relevant
                agencies and capital commitments, or select a Community Board
                capital budget request to learn more about the request and
                response from relevant agency. Filter by specific geographies to
                see all projects and requests in that area. You can also export
                your selection as a CSV table.
              </Text>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
