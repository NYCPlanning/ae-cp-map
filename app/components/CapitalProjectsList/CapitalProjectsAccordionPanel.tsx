import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
} from "@nycplanning/streetscape";

export interface CapitalProjectsAccordionPanelProps {
  district: string;
  children: React.ReactNode;
}

export const CapitalProjectsAccordionPanel = ({
  district,
  children,
}: CapitalProjectsAccordionPanelProps) => {
  return (
    <Flex
      borderRadius={"base"}
      padding={{ base: 3, lg: 4 }}
      background={"white"}
      direction={"column"}
      width={{ base: "full", lg: "21.25rem" }}
      maxW={{ base: "21.25rem", lg: "unset" }}
      boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
      gap={4}
    >
      <Accordion defaultIndex={[0]} allowToggle>
        <AccordionItem border="none">
          <h2>
            <AccordionButton padding="0px">
              <Box as="span" flex="1" textAlign="left">
                <Heading
                  color="gray.600"
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  paddingBottom={"8px"}
                >
                  {district}
                </Heading>
              </Box>
              <AccordionIcon size="lg" />
            </AccordionButton>
          </h2>

          <AccordionPanel padding={"0px"}>{children}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};
