import { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
    <Accordion defaultIndex={[0]} allowToggle width={"100%"} maxHeight={"100%"}>
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
