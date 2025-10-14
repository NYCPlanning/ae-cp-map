import { AccordionPanel } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Flex,
  Heading,
} from "@nycplanning/streetscape";
import { Pagination } from "../Pagination";

export interface ResultsPanelLayoutProps {
  totalResults: number;
}

export function ResultsPanelLayout({ totalResults }: ResultsPanelLayoutProps) {
  return (
    <Accordion width={"100%"} maxHeight={"100%"} defaultIndex={[0]} allowToggle>
      <AccordionItem borderTop={"none"}>
        <AccordionButton aria-label="Toggle results panel" p={0}>
          <Heading
            flex="1"
            textAlign="left"
            fontSize="medium"
            fontWeight="bold"
            lineHeight="32px"
          >
            {totalResults} Results
          </Heading>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          padding={"0px"}
          overflowY={"hidden"}
          overflow={"scroll"}
        >
          <Flex
            paddingTop={4}
            alignItems="center"
            justifyContent={"space-between"}
            marginTop={"auto"}
            marginBottom={{ base: "1rem", md: "0rem" }}
          >
            <Pagination total={totalResults} />
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
