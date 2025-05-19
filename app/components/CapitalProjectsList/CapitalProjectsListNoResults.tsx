import { Flex, Heading, Text, VStack } from "@nycplanning/streetscape";
import { WarningIcon } from "@chakra-ui/icons";

export const CapitalProjectsListNoResults = () => {
  return (
    <Flex
      bg={"gray.50"}
      paddingY={3}
      paddingX={2}
      borderRadius={"base"}
      width={"100%"}
    >
      <WarningIcon color={"state.warning"} fontSize={"1.5rem"} margin={2} />
      <VStack align="start" gap={0}>
        <Heading color="gray.600" fontWeight={"medium"}>
          No results
        </Heading>
        <Text textStyle="micro">
          No available results with current filters applied.
        </Text>
      </VStack>
    </Flex>
  );
};
