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
        defaultIndex={[0]}
        borderBottomRadius={"base"}
        padding={{ base: 3, lg: 3 }}
        paddingTop={{ lg: "0" }}
        paddingBottom={{ lg: "3" }}
        background={"white"}
        width={{ base: "full", lg: "full" }}
        maxW={{ base: "21.25rem", lg: "unset" }}
        boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
      >
        <AccordionItem>
          <AccordionButton aria-label="Toggle welcome panel" px={0}>
            <Heading
              display={"flex"}
              flex="1"
              justifyContent={"space-between"}
              fontSize="medium"
              fontWeight="bold"
              lineHeight={"32px"}
              pb={0}
            >
              How to Use This Tool
            </Heading>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={0}>
            <Box>
              <Text fontSize={"small"} pb={3}>
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
