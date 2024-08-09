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
      width={"100%"}
    >
      <Box
        backgroundColor="gray.50"
        paddingY={3}
        paddingX={2}
        borderRadius={"base"}
      >
        <HStack spacing={2} justifyContent={"space-between"}>
          <Flex basis="70%">
            <VStack align="justify">
              <Heading color="gray.600" fontWeight={"medium"}>
                {description}
              </Heading>
              <Text textStyle="micro">{agency}</Text>
            </VStack>
          </Flex>
          <Flex basis="30%">
            <Text textStyle="micro">{yearRange}</Text>
          </Flex>
        </HStack>
      </Box>
    </Flex>
  );
};
