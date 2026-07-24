import { useEffect, useRef, useState } from "react";
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
import { useOutletContext } from "react-router";

export function WelcomePanel() {
  const isLargeScreen =
    useBreakpointValue({
      base: false,
      md: false,
      lg: true,
    }) ?? false;

  const { isPanelOpen, setIsPanelOpen } = useOutletContext<{
    isPanelOpen: boolean;
    setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  useEffect(() => {
    setIsPanelOpen(isLargeScreen);
  }, [isLargeScreen, setIsPanelOpen]);

  const [isDismissed, setIsDismissed] = useState<boolean>(() =>
    typeof window !== "undefined" ? isWelcomeHidden() : false,
  );

  if (isDismissed) return null;

  return (
    <Accordion
      allowToggle
      width={"100%"}
      maxHeight={{ base: "full", lg: "100%" }}
      index={isPanelOpen ? 0 : -1}
      onChange={(nextIndex) => {
        setIsPanelOpen(nextIndex === 0);
      }}
      className={"welcomeContainer"}
    >
      <AccordionItem border={"none"}>
        <AccordionButton padding="0px" aria-label="Toggle project list panel">
          <WelcomeHeader />
          <AccordionIcon size={"lg"} />
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
