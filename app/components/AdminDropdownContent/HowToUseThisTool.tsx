import {
  Heading,
  Text,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@nycplanning/streetscape";

export function HowToUseThisTool() {
  return (
    <AccordionItem borderBottom={"none"}>
      <AccordionButton aria-label="Toggle how to use this tool panel" p={0}>
        <Heading
          flex="1"
          textAlign="left"
          fontSize={"sm"}
          fontWeight="bold"
          lineHeight="32px"
          pb={0}
        >
          How to Use This Tool
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel px={0}>
        <Text fontSize={"small"}>
          Select a project on the map to learn more about the relevant agencies
          and capital commitments, or select a Community Board capital budget
          request to learn more about the request and response from the relevant
          agency. Filter by specific geographies to see all projects and
          requests in that area, and export your selection as a CSV table. The
          tool also includes a database of city, state and federal facilities
          and housing growth data (past, latest, and projected Class A
          residential units) aggregated at the NTA, CDTA, and borough levels.
        </Text>
      </AccordionPanel>
    </AccordionItem>
  );
}
