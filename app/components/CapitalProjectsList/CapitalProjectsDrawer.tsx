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
    <Flex
      // height={{ base: isExpanded ? "90vh" : "70vh", lg: "auto" }}
    >

    
    <Drawer
      isOpen={true}
      placement="bottom"
      onClose={() => {
        return;
      }}
    >
      <DrawerContent>
        <Flex
          padding={{ base: 3, lg: 4 }}
          background={"white"}
          direction={"column"}
          height={{ base: isExpanded ? "90vh" : "70vh", lg: "auto" }}
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
              height={{ base: "auto" }}
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
    </Flex>
  );
};
