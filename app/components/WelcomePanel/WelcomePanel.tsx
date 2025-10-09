import { useState } from "react";
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
import { isWelcomeHidden, WelcomeGetStarted } from "./WelcomeGetStarted";
import { analyticsWelcomePanelToggle } from "../../utils/analytics";

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
          borderRadius={"base"}
          width={"full"}
        >
          <Accordion
            defaultIndex={[0]}
            allowToggle
            // marginLeft={"2dvw"}
            // marginRight={"2dvw"}
          >
            <AccordionItem border="none">
              <AccordionButton
                padding="0px"
                aria-label="Toggle project list panel"
              >
                <WelcomeHeader />
                <AccordionIcon size="lg" />
              </AccordionButton>
              <AccordionPanel
                padding={"0px"}
                display={"flex"}
                flexDirection={"column"}
              >
                <WelcomeContent />
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
          <Accordion defaultIndex={[0]} allowToggle width={"100%"}>
            <AccordionItem borderTop="none">
              <AccordionButton
                padding={"0"}
                aria-label="Toggle project list panel"
                // height={"7dvh"}
              >
                {/* <Box as="span" flex="1" textAlign="left"> */}
                <WelcomeHeader />
                {/* </Box> */}
                <AccordionIcon size="lg" />
              </AccordionButton>
              <AccordionPanel
                padding={"0px"}
                display={"flex"}
                flexDirection={"column"}
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
