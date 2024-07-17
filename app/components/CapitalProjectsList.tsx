import { Box, Flex, Hide, Text, VStack, HStack, IconButton, Link} from "@nycplanning/streetscape";
import { useState } from "react";
import { Agency, CapitalProject } from "~/gen";
import { getYear, getMonth, compareAsc, format } from "date-fns";
import { CapitalProjectsListItem } from "./CapitalProjectsListItem";
import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, Icon } from "@chakra-ui/icons";
import { Pagination } from "./Pagination";


export interface CapitalProjectsListProps {
    capitalProjects: Array<CapitalProject>;
    limit: number;
    offset: number;
    total: number;
    agencies: Agency[];
    path: string;
}

export const CapitalProjectsList = ({
    capitalProjects, limit, offset, total, path, agencies,
}: CapitalProjectsListProps) => {

    const [isExpanded, setIsExpanded] = useState(false);

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

      const currentDate = () => {
        return `${format(new Date(), 'MM/dd/yyyy')}`;
      }

    return (
        <>
        <Box
            borderTopWidth={"1px"}
            borderTopColor={"gray.400"}
            paddingTop={"16px"}
        >
            <Text
                as={"span"}
            >
                Mapped Capital Projects as of <Text as={"b"}>{currentDate()}</Text>
            </Text>
        </Box>
        <Flex
        direction={"column"}
        overflow={"hidden"}
        >

    
        <Box
            height={{ base: isExpanded ? "70vh" : "70vh"}}
            overflowY={{ base: "scroll" }}
        >

                        
            <VStack
                align='stretch'
                paddingTop={"12px"} 
                gap={"12px"}
            >
                
                {capitalProjects.map((capitalProject) => {
                    return (
                        <CapitalProjectsListItem
                            description={capitalProject.description}
                            minDate={capitalProject.minDate}
                            maxDate={capitalProject.maxDate}
                            agency= { agencies.find(
                                (agency) => agency.initials === capitalProject.managingAgency,
                            )?.name }
                            yearRange={formatFiscalYearRange(
                                new Date(capitalProject.minDate),
                                new Date(capitalProject.maxDate),
                            )}
                        />
                    )
                })}
            </VStack>
        </Box>
        </Flex>
        <HStack>
    
        <Pagination total={10} path={path} />            
        </HStack>
        
        </>
    );
}