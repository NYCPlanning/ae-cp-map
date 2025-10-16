import {
  Heading,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@nycplanning/streetscape";
import { ChevronDownIcon } from "@chakra-ui/icons";

export function ReverseAccordion({
  children,
  accordionHeading,
}: {
  children: React.ReactNode;
  accordionHeading: string;
}) {
  return (
    <Accordion
      width={"100%"}
      maxHeight={"100%"}
      defaultIndex={[0]}
      allowToggle
      overflowY={"scroll"}
    >
      <AccordionItem borderTop={"none"}>
        {({ isExpanded }) => (
          <>
            <AccordionButton aria-label="Toggle project list panel" p={0}>
              <Heading
                flex="1"
                textAlign="left"
                fontSize="medium"
                fontWeight="bold"
                lineHeight="32px"
              >
                {accordionHeading}
              </Heading>
              <ChevronDownIcon
                transform={isExpanded ? "rotate(0deg)" : "rotate(180deg)"}
              />
            </AccordionButton>
            <AccordionPanel
              padding={"0px"}
              overflowY={"hidden"}
              overflow={"scroll"}
            >
              {children}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
