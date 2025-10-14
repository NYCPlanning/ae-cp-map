import {
  Heading,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  useMediaQuery,
} from "@nycplanning/streetscape";

export function ContentPanelAccordion({
  children,
  accordionHeading,
}: {
  children: React.ReactNode;
  accordionHeading: string;
}) {
  const iconShouldFlip = useMediaQuery("(max-width: 767px)")[0];

  return (
    <Accordion
      width={"100%"}
      maxHeight={"100%"}
      defaultIndex={[0]}
      allowToggle
      overflowY={"scroll"}
      sx={{ scrollbarWidth: "none" }}
    >
      <AccordionItem border={"none"}>
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
              {iconShouldFlip ? (
                <AccordionIcon
                  transform={isExpanded ? "rotate(0deg)" : "rotate(180deg)"}
                />
              ) : (
                <AccordionIcon />
              )}
            </AccordionButton>
            <AccordionPanel
              padding={"0px"}
              overflowY={"hidden"}
              overflow={"scroll"}
              sx={{ scrollbarWidth: "none" }}
            >
              {children}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
