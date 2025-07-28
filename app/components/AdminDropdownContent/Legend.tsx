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
        padding={{ base: 3, lg: 4 }}
        background={"white"}
        width={{ base: "full", lg: "full" }}
        maxW={{ base: "21.25rem", lg: "unset" }}
        // boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
        borderTopWidth={"1px"}
        borderTopColor={"gray.50"}
        // defaultIndex={0}
        className={"Legend"}
        // onChange={analyticsWelcomePanelToggle}
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
              Legend
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
              <Text fontSize={"small"}>LEGEND CONTENT</Text>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
