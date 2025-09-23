import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Hide,
  IconButton,
  Show,
} from "@nycplanning/streetscape";
import { WelcomeContent, WelcomeHeader } from ".";
import { InfoIcon } from "@chakra-ui/icons";
import { analyticsWelcomePanelToggle } from "../../utils/analytics";
import { isWelcomeHidden, WelcomeGetStarted } from "./WelcomeGetStarted";
import { showRedesign } from "../../utils/envFlags";
import { useState } from "react";

export function WelcomePanel() {
  const [isMobileExpanded, setIsMobileExpanded] = useState(true);
  const [isDismissed, setIsDismissed] = useState<boolean>(() =>
    typeof window !== "undefined" ? isWelcomeHidden() : false,
  );

  const toggleMobileExpanded = () =>
    setIsMobileExpanded((isMobileExpanded) => !isMobileExpanded);

  if (isDismissed) return null;

  if (showRedesign) {
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
            display={{
              base: "none",
              md: "initial",
            }}
          >
            <Accordion
              defaultIndex={[0]}
              allowToggle
              margin={"1dvh 1dvw 0 1dvw"}
            >
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
            display={{
              base: "initial",
              md: "none",
              lg: "none",
              xl: "none",
              "2xl": "none",
            }}
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

  return (
    <>
      <Show above="lg">
        <Accordion
          allowToggle
          borderBottomRadius={"base"}
          padding={{ base: 3, lg: 4 }}
          background={"white"}
          width={{ base: "full", lg: "21.25rem" }}
          maxW={{ base: "21.25rem", lg: "unset" }}
          boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
          borderTopWidth={"1px"}
          borderTopColor={"gray.50"}
          defaultIndex={0}
          onChange={analyticsWelcomePanelToggle}
        >
          <AccordionItem border="none">
            <AccordionButton aria-label="Toggle welcome panel" px={0}>
              <WelcomeHeader />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={0} px={0}>
              <WelcomeContent />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Show>
      <Hide above="lg">
        <Box width={"21.25rem"} paddingTop={3}>
          <IconButton
            aria-label="information about the capital planning portal"
            icon={<InfoIcon boxSize={5} />}
            borderColor={"white"}
            borderStyle="solid"
            borderWidth="5px"
            borderRadius={"100%"}
            color="black"
            minHeight="auto"
            minWidth="auto"
            height="fit-content"
            width="fit-content"
            backgroundColor={"white"}
            _hover={{
              border: "none",
              backgroundColor: "blackAlpha.100",
            }}
            onClick={toggleMobileExpanded}
          />
          <Drawer
            placement="bottom"
            isOpen={isMobileExpanded}
            onClose={toggleMobileExpanded}
          >
            <DrawerOverlay />
            <DrawerContent overflowY="auto" borderTopRadius={"12px"}>
              <Box paddingX={3} paddingY={4}>
                <Flex paddingBottom={3}>
                  <WelcomeHeader />
                  <DrawerCloseButton position={"static"} />
                </Flex>
                <WelcomeContent />
              </Box>
            </DrawerContent>
          </Drawer>
        </Box>
      </Hide>
    </>
  );
}
