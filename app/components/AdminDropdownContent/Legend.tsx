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
        padding={{ base: 3, lg: "0 12px" }}
        width={{ base: "full", lg: "full" }}
        maxW={{ base: "21.25rem", lg: "unset" }}
      >
        <AccordionItem border="none">
          <AccordionButton aria-label="Toggle welcome panel" px={0}>
            <Heading
              flex="1"
              textAlign="left"
              fontSize="md"
              fontWeight="bold"
              lineHeight={"32px"}
              pb={0}
            >
              Legend
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={0} px={0}>
            <Box>
              <Text fontSize={"small"}>LEGEND CONTENT</Text>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
