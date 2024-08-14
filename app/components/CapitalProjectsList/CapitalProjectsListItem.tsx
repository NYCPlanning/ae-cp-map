import {
  Box,
  HStack,
  Heading,
  VStack,
  Text,
  Flex,
} from "@nycplanning/streetscape";
export interface CapitalProjectsListItemProps {
  description: string;
  agency: string | undefined;
  yearRange: string;
}

export const CapitalProjectsListItem = ({
  description,
  agency,
  yearRange,
}: CapitalProjectsListItemProps) => {
  return (
    <Flex
      height={{ lg: "auto" }}
      direction={"column"}
      transition={"height 0.5s ease-in-out"}
      gap={4}
    >
      <Box
        backgroundColor="gray.50"
        paddingY={3}
        paddingX={2}
        borderRadius={"base"}
        width={"100%"}
      >
        <HStack align={"start"}>
          <Flex flex={3}>
            <VStack align="start">
              <Heading color="gray.600" fontWeight={"medium"}>
                {description}
              </Heading>
              <Text textStyle="micro">{agency}</Text>
            </VStack>
          </Flex>
          <Flex flex={1}>
            <Text textStyle="micro">{yearRange}</Text>
          </Flex>
        </HStack>
      </Box>
    </Flex>
  );
};
