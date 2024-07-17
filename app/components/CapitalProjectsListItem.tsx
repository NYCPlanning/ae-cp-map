import { Box, HStack, Heading, VStack, Text, Spacer } from "@nycplanning/streetscape";
import { Icon, createIcon, Flex } from '@chakra-ui/react'
import { Pagination } from "./Pagination";

export interface CapitalProjectsListItemProps {
    description: string;
    minDate: string;
    maxDate: string;
    agency: string | undefined;
    yearRange: string;
}

export const CapitalProjectsListItem = ({
    description,
    minDate,
    maxDate,
    agency,
    yearRange,
}: CapitalProjectsListItemProps) => {
    return (
        <Flex
            height={{ lg: "auto" }}
            overflowY={{ base: "scroll", lg: "auto" }}
            direction={"column"}
            transition={"height 0.5s ease-in-out"}
            gap={4}
        >
            <Box
                backgroundColor="gray.50"
                paddingY={3}
                paddingX={2}
                borderRadius={"base"}
            >
                <HStack spacing={2}>
                    <Flex gap={6}>
                        <Flex basis="80%">
                        <VStack align='justify'>
                            <Heading color="gray.600" fontWeight={"medium"}>
                                {description}
                            </Heading>
                            <Text textStyle='micro'>{agency}</Text>
                        </VStack>
                        </Flex>
                        
                        <Flex basis="20%">
                        <Text textStyle='micro'>{yearRange}</Text>
                            </Flex>
                    </Flex>
                
                </HStack>
                
            </Box>
        </Flex>
    )
}