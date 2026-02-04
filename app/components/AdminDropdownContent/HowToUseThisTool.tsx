import {
  Heading,
  Text,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@nycplanning/streetscape";
import { env } from "~/utils/env";

export function HowToUseThisTool() {
  return (
    <AccordionItem borderBottom={ env.facDbPhase1 == "ON" ? "none" : ""}>
      <AccordionButton aria-label="Toggle how to use this tool panel" p={0}>
        <Heading
          flex="1"
          textAlign="left"
          fontSize={env.facDbPhase1 == "ON" ? "sm" : "md"}
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
          request to learn more about the request and response from relevant
          agency. Filter by specific geographies to see all projects and
          requests in that area. You can also export your selection as a CSV
          table.
        </Text>
      </AccordionPanel>
    </AccordionItem>
  );
}
