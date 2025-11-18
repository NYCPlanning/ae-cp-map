import {
  Card,
  CardBody,
  ChevronRightIcon,
  Flex,
  Heading,
  Icon,
  Skeleton,
  Text,
} from "@nycplanning/streetscape";

export function CommunityBoardBudgetRequestListItemSkeleton() {
  return (
    <Card
      variant={"calm"}
      direction={"row"}
      width={"100%"}
      justifyContent={"space-between"}
    >
      <Flex direction={"row"}>
        <Skeleton height={10} width={10} borderRadius={"35px"}>
          <Icon boxSize={10} />
        </Skeleton>
        <CardBody marginLeft={5} marginRight={6}>
          <Skeleton maxH={5} minW={"100%"}>
            <Heading fontSize={"sm"} fontWeight={"bold"}>
              Sample Community Board Budget Request Name
            </Heading>
          </Skeleton>
          <Skeleton maxH={4} mt={1} maxW={"fit-content"}>
            <Text fontSize={"xs"}>Communty Board SI99</Text>
          </Skeleton>
        </CardBody>
      </Flex>
      <ChevronRightIcon boxSize={6} marginY={"auto"} />
    </Card>
  );
}
