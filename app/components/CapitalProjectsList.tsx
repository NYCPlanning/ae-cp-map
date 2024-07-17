import { Box, Flex, Hide, FlexProps, VStack, HStack, IconButton, Link} from "@nycplanning/streetscape";
import { useState } from "react";
import { Agency, CapitalProject } from "~/gen";
import { getYear, getMonth, compareAsc } from "date-fns";
import { CapitalProjectsListItem } from "./CapitalProjectsListItem";
import { Button } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon, Icon } from "@chakra-ui/icons";
import { Pagination } from "./Pagination";
import ReactPaginate from 'react-paginate';
import { useSearchParams } from "@remix-run/react";

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

    const [searchParams] = useSearchParams();
    console.log(searchParams);

    function setSearchParamsString(
        searchParams: URLSearchParams,
        changes: Record<string, string | number | undefined>,
      ) {
        const newSearchParams = new URLSearchParams(searchParams)
        for (const [key, value] of Object.entries(changes)) {
          if (value === undefined) {
            newSearchParams.delete(key)
            continue
          }
          newSearchParams.set(key, String(value))
        }
        // Print string manually to avoid over-encoding the URL
        // Browsers are ok with $ nowadays
        // optional: return newSearchParams.toString()
        return Array.from(newSearchParams.entries())
          .map(([key, value]) =>
            value ? `${key}=${encodeURIComponent(value)}` : key,
          )
          .join("&")
      }

    const [isExpanded, setIsExpanded] = useState(false);

    const numberOfPages = total / limit;
    // Invoke when user click to request another page.

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
        <>
        <Flex
        direction={"column"}
        overflow={"hidden"}
        >

    
        <Box
            height={{ base: isExpanded ? "70vh" : "70vh"}}
            overflowY={{ base: "scroll" }}
        >
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