import {
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  WarningIcon,
} from "@nycplanning/streetscape";

export function NoResultsWarning() {
  return (
    <Card
      variant={"calm"}
      direction={"row"}
      width={"100%"}
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
