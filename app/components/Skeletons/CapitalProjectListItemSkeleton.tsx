import {
  Card,
  CardBody,
  ChevronRightIcon,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@nycplanning/streetscape";

export function CapitalProjectListItemSkeleton() {
  return (
    <Card
      variant={"calm"}
      direction={"row"}
      width={"100%"}
      justifyContent={"space-between"}
    >
      <CardBody
        marginRight={6}
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Flex direction={"column"} marginRight={2}>
          <Skeleton maxH={5}>
            <Heading fontSize={"sm"} fontWeight={"bold"}>
              Capital Project Sample Description
            </Heading>
          </Skeleton>
          <Skeleton maxH={4} mt={1} maxW={"fit-content"}>
            <Text fontSize={"xs"}>Department of City Planning</Text>
          </Skeleton>
        </Flex>
        <Skeleton maxH={4}>
          <Text fontSize={"xs"} textAlign={"right"}>
            FY2000-FY2999
          </Text>
        </Skeleton>
      </CardBody>
      <ChevronRightIcon boxSize={6} marginY={"auto"} />
    </Card>
  );
}
