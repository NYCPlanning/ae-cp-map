import { Box, Flex, Hide, FlexProps, VStack, HStack, IconButton} from "@nycplanning/streetscape";
import { useState } from "react";
import { CapitalProject } from "~/gen";
import { getYear, getMonth, compareAsc } from "date-fns";
import { CapitalProjectsListItem } from "./CapitalProjectsListItem";
import { Button } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Pagination } from "./Pagination";

export interface CapitalProjectsListProps {
    capitalProjects: Array<CapitalProject>;
    limit: number;
    offset: number;
    total: number;
}

export const CapitalProjectsList = ({
    capitalProjects, limit, offset, total,
}: CapitalProjectsListProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const numberOfPages = total / limit;

    const getFiscalYearForDate = (date: Date): number => {
        const year = getYear(date);
        const month = getMonth(date);
        return month <= 6 ? year : year + 1;
      };
      
      const formatFiscalYearRange = (minDate: Date, maxDate: Date) => {
        return compareAsc(minDate, maxDate) === 0
          ? `FY${getFiscalYearForDate(minDate)}`
          : `FY${getFiscalYearForDate(minDate)}-FY${getFiscalYearForDate(maxDate)}`;
      };

    // const Pagination = () => <Button colorScheme="blue" borderRadius="0" aria-label="Page" size="xs">{offset+1}</Button>
    return (

        // <Hide above="lg">
        // <Box
        //     height={"4px"}
        //     width={20}
        //     backgroundColor={"gray.300"}
        //     borderRadius="2px"
        //     alignSelf={"center"}
        //     role="button"
        //     aria-label={
        //       isExpanded
        //         ? "Collapse project detail panel"
        //         : "Expand project detail panel"
        //     }
        //     onClick={() => {
        //       setIsExpanded(!isExpanded);
        //     }}
        // />
        // </Hide>
        <>
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
                        yearRange={formatFiscalYearRange(
                            new Date(capitalProject.minDate),
                            new Date(capitalProject.maxDate),
                          )}
                    />
                )
            })}
            </VStack>
        </Box>
        <HStack>
            <Pagination total={total} />
            {/* <HStack>
            <IconButton variant="ghost" aria-label='Search database' icon={<ArrowLeftIcon />} />
            <Pagination />   
            <IconButton variant="ghost" aria-label='Search database' icon={<ArrowRightIcon />} /> 
            </HStack> */}
            
        </HStack>
        
        </>
    );
}