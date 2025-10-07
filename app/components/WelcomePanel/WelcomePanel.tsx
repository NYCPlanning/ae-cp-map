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
        <Accordion
          backgroundColor={"white"}
          borderRadius={"base"}
          defaultIndex={[0]}
          height={"fit-content"}
          maxHeight={"89dvh"}
          allowToggle
        >
          <AccordionItem
            borderRadius={"base"}
            height={"fit-content"}
            maxHeight={"100%"}
            overflow={"auto"}
          >
            <AccordionButton
              aria-label="Toggle project list panel"
              borderRadius={"base"}
              height={"fit-content"}
              maxHeight={"7dvh"}
              overflow={"clip"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <WelcomeHeader />
              <AccordionIcon size="lg" />
            </AccordionButton>
            <AccordionPanel
              display={{ base: "flex" }}
              flexDirection={{ base: "column" }}
              padding={0}
              height={"fit-content"}
              maxHeight={"82dvh"}
              overflow={"auto"}
            >
              <WelcomeContent />

              <WelcomeGetStarted onDismiss={() => setIsDismissed(true)} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
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
