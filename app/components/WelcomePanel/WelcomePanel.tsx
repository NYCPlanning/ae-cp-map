import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
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
import { useState } from "react";

export function WelcomePanel() {
  const [isMobileExpanded, setIsMobileExpanded] = useState(true);

  const toggleMobileExpanded = () =>
    setIsMobileExpanded((isMobileExpanded) => !isMobileExpanded);
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
