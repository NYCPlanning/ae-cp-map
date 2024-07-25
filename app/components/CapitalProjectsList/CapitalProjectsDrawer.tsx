import { Box, Flex, Heading } from "@nycplanning/streetscape";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { useState } from "react";

export interface CapitalProjectsDrawerProps {
  district: string;
  children: React.ReactNode;
}

export const CapitalProjectsDrawer = ({
  district,
  children,
}: CapitalProjectsDrawerProps) => {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Drawer
      isOpen={true}
      placement="bottom"
      onClose={() => {
        return;
      }}
      // finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Flex
          borderTopRadius={"base"}
          padding={{ base: 3, lg: 4 }}
          background={"white"}
          direction={"column"}
          //   width={{ base: "full", lg: "21.25rem" }}
          //   maxW={{ base: "21.25rem", lg: "unset" }}
          //   boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
          //   gap={4}
        >
          <Box
            height={"4px"}
            width={20}
            backgroundColor={"gray.300"}
            borderRadius="2px"
            alignSelf={"center"}
            role="button"
            aria-label={
              isExpanded
                ? "Collapse project detail panel"
                : "Expand project detail panel"
            }
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          />
          <DrawerHeader>
            <Heading
              color="gray.600"
              fontWeight={"bold"}
              fontSize={"lg"}
              paddingBottom={"8px"}
            >
              {district}
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <Flex
              height={{ base: "436px" }}
              direction={"column"}
              transition={"height 0.5s ease-in-out"}
              gap={4}
            >
              {children}
            </Flex>
          </DrawerBody>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
};
