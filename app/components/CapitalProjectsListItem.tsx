import { Box, Flex, Heading } from "@nycplanning/streetscape";

export interface CapitalProjectsListItemProps {
    description: string;
    minDate: string;
    maxDate: string;
    agency: string;
}

export const CapitalProjectsListItem = ({
    description,
    minDate,
    maxDate,
    agency,
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
                <Heading color="gray.600" fontWeight={"medium"}>
                    {description}
                </Heading>
            </Box>
        </Flex>
    )
}