import { WarningIcon } from "@chakra-ui/icons";
import { Card, CardBody } from "@chakra-ui/react";
import { Flex, Heading, Text } from "@nycplanning/streetscape";

export function ResultsPanelNoResultsWarning() {
  return (
    <Card
      direction={"row"}
      padding={"0.75rem"}
      width={"100%"}
      backgroundColor={"gray.50"}
      borderRadius={"0.5rem"}
      justifyContent={"space-between"}
    >
      <Flex direction={"row"}>
        <WarningIcon color={"state.warning"} fontSize={"1.5rem"} margin={2} />
        <CardBody marginLeft={"1.25rem"} marginRight={"1.5rem"}>
          <Heading fontSize={"sm"} fontWeight={"bold"}>
            No results
          </Heading>
          <Text fontSize={"xs"}>
            No available results with current filters applied.
          </Text>
        </CardBody>
      </Flex>
    </Card>
  );
}
