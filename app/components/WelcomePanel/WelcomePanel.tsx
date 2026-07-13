import { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useBreakpointValue,
} from "@nycplanning/streetscape";
import { WelcomeContent, WelcomeHeader } from ".";
import { isWelcomeHidden, WelcomeGetStarted } from "./WelcomeGetStarted";

export function WelcomePanel() {
  const [isDismissed, setIsDismissed] = useState<boolean>(() =>
    typeof window !== "undefined" ? isWelcomeHidden() : false,
  );

  const index =
    useBreakpointValue({
      base: -1,
      md: 0,
    }) ?? -1;

  if (isDismissed) return null;

  return (
    <Accordion
      width={"100%"}
      maxHeight={"100%"}
      allowToggle
      index={index}
      className="welcomePanel"
    >
      <AccordionItem border="none">
        <AccordionButton padding="0px" aria-label="Toggle project list panel">
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
  );
}
