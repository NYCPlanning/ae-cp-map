import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Hide,
  Show,
} from "@nycplanning/streetscape";
import { WelcomeContent, WelcomeHeader } from ".";
import { analyticsWelcomePanelToggle } from "../../utils/analytics";
import { isWelcomeHidden, WelcomeGetStarted } from "./WelcomeGetStarted";
import { useState } from "react";

export function WelcomePanel() {
  const [isDismissed, setIsDismissed] = useState<boolean>(() =>
    typeof window !== "undefined" ? isWelcomeHidden() : false,
  );

  if (isDismissed) return null;

  return (
    <>
      <Show above="sm">
        <Flex
          background={"white"}
          direction={"column"}
          borderTopLeftRadius={"base"}
          borderTopRightRadius={"base"}
          borderBottomLeftRadius={"base"}
          borderBottomRightRadius={"base"}
          width={"full"}
        >
          <Accordion defaultIndex={[0]} allowToggle margin={"1dvh 1dvw 0 1dvw"}>
            <AccordionItem
              border="none"
              display={{ md: "flex" }}
              flexDirection={{ md: "column" }}
              rowGap={"1dvh"}
              padding={"0.5dvh 0"}
            >
              <AccordionButton
                padding="0px"
                aria-label="Toggle project list panel"
                height={"initial"}
              >
                <Box as="span" flex="1" textAlign="left">
                  <WelcomeHeader />
                </Box>
                <AccordionIcon size="lg" />
                <Box paddingBottom={4} />
              </AccordionButton>
              <AccordionPanel
                padding={"0px"}
                overflowY={"hidden"}
                display={{ base: "flex" }}
                flexDirection={{ base: "column" }}
              >
                <WelcomeContent />
              </AccordionPanel>
              <AccordionPanel
                paddingInlineStart={"0"}
                paddingInlineEnd={"0"}
                paddingBottom={"0"}
              >
                <WelcomeGetStarted onDismiss={() => setIsDismissed(true)} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Show>
      <Hide above="sm">
        <Flex
          background={"white"}
          direction={"column"}
          borderTopLeftRadius={"base"}
          borderTopRightRadius={"base"}
          width={"full"}
        >
          <Accordion
            defaultIndex={[0]}
            allowToggle
            marginLeft={{ base: "3dvw" }}
            marginRight={{ base: "3dvw" }}
          >
            <AccordionItem border="none">
              <AccordionButton
                padding="0px"
                aria-label="Toggle project list panel"
                height={{ base: "7dvh" }}
              >
                <Box as="span" flex="1" textAlign="left">
                  <WelcomeHeader />
                </Box>
                <AccordionIcon size="lg" />
              </AccordionButton>
              <AccordionPanel
                padding={"0px"}
                overflowY={"hidden"}
                height={{ base: "68dvh" }}
                overflow={{ base: "scroll" }}
                display={{ base: "flex" }}
                flexDirection={{ base: "column" }}
              >
                <WelcomeContent />
              </AccordionPanel>
              <AccordionPanel
                paddingInlineStart={"0"}
                paddingInlineEnd={"0"}
                paddingBottom={"0"}
              >
                <WelcomeGetStarted onDismiss={() => setIsDismissed(true)} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Hide>
    </>
  );
}
