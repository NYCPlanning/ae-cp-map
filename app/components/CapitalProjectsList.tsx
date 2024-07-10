import { Box, Flex, Hide, FlexProps, VStack} from "@nycplanning/streetscape";
import { useState } from "react";
import { CapitalProject } from "~/gen";
import { CapitalProjectsListItem } from "./CapitalProjectsListItem";

export interface CapitalProjectsListProps extends FlexProps {
    capitalProjects: Array<CapitalProject>;
}

export const CapitalProjectsList = ({
    capitalProjects, ...flexProps
}: CapitalProjectsListProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
    <Flex
        borderRadius={"base"}
      padding={{ base: 3, lg: 4 }}
      background={"white"}
      direction={"column"}
      width={{ base: "full", lg: "21.25rem" }}
      maxW={{ base: "21.25rem", lg: "unset" }}
      boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
      gap={4}
      {...flexProps}
    >
        <Hide above="lg">
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
        </Hide>
        <Box>
            {/* this should be a generic panel for project detail and list */}
            
            {/* we need a separate component for project list item */}
            <VStack
                align='stretch'
            >

            
            {capitalProjects.map((capitalProject) => {
                return (
                    <CapitalProjectsListItem
                        description={capitalProject.description}
                        minDate={capitalProject.minDate}
                        maxDate={capitalProject.maxDate}
                        agency= {capitalProject.managingAgency}
                    />
                )
                // return <p>{capitalProject.description}</p>
            })}
            </VStack>
        </Box>
        
    </Flex>
    );
}