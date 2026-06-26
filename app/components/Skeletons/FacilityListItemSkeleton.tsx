import {
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Skeleton,
} from "@nycplanning/streetscape";

export function FacilityListItemSkeleton() {
    return (
        <Card
            variant={"calm"}
            direction={"row"}
            width={"100%"}
            justifyContent={"space-between"}
        >
            <Flex direction={"row"}>
                <Skeleton height={2} width={2} borderRadius={"35px"}>
                    <Icon boxSize={2} />
                </Skeleton>
                <CardBody marginLeft={5} marginRight={6}>
                    <Skeleton maxH={5} minW={"100%"}>
                        <Heading fontSize={"sm"} fontWeight={"bold"}>
                            Sample Facility Name
                        </Heading>
                    </Skeleton>
                </CardBody>
            </Flex>
        </Card>
    );
}