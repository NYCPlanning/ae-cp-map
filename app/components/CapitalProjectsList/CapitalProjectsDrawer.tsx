import { Box, Flex, Heading } from "@nycplanning/streetscape";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { Agency, CapitalProject } from "~/gen";
import { CapitalProjectsList } from "./CapitalProjectsList";
import { useState } from "react";

export interface CapitalProjectsDrawerProps {
  capitalProjects: Array<CapitalProject>;
  district: string;
  agencies: Agency[];
  children: React.ReactNode;
}

export const CapitalProjectsDrawer = ({
  capitalProjects,
  district,
  agencies,
  children,
}: CapitalProjectsDrawerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Drawer
      isOpen={true}
      placement="bottom"
      onClose={() => {
        return;
      }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Flex
          borderTopRadius={"base"}
          padding={{ base: 3, lg: 4 }}
          background={"white"}
          direction={"column"}
        >
          <Box
            height={"4px"}
            width={20}
            backgroundColor={"gray.300"}
            borderRadius="px"
            alignSelf={"center"}
            role="button"
            aria-label={
              isExpanded
                ? "Collapse project list panel"
                : "Expand project list panel"
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
              <CapitalProjectsList
                capitalProjects={capitalProjects}
                agencies={agencies}
              />
              {children}
            </Flex>
          </DrawerBody>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
};
