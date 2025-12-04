import { CommunityBoardBudgetRequest } from "~/gen";
import {
  ChevronLeftIcon,
  InfoIcon,
  Flex,
  Heading,
  HStack,
  IconButton,
  Tag,
  Text,
  Tooltip,
  VStack,
} from "@nycplanning/streetscape";

export type CommunityBoardBudgetRequestDetailProps = {
  cbbr: CommunityBoardBudgetRequest;
  agencyName: string | undefined;
  policyArea: string | undefined;
  agencyCategoryResponse: string | undefined;
  onNavigationClick: () => void;
};

export function CommunityBoardBudgetRequestDetail({
  cbbr,
  agencyName,
  policyArea,
  agencyCategoryResponse,
  onNavigationClick,
}: CommunityBoardBudgetRequestDetailProps) {
  const agencyCategoryResponseAndResponse: Array<string> =
    `${agencyCategoryResponse}. ${cbbr.cbbrAgencyResponse}`
      .split("\\n")
      .filter((line: string) => line !== "");

  return (
    <VStack
      alignItems={"flex-start"}
      gap={2}
      overflowY={"scroll"}
      sx={{ scrollbarWidth: "none" }}
    >
      <HStack align={"center"}>
        <IconButton
          aria-label="Close budget request detail panel"
          icon={<ChevronLeftIcon boxSize={6} />}
          color={"gray.600"}
          backgroundColor={"inherit"}
          _hover={{
            border: "none",
            backgroundColor: "blackAlpha.100",
          }}
          onClick={onNavigationClick}
        />
        <Heading color="gray.600" fontWeight={"bold"} fontSize={"md"}>
          {cbbr.title}
          {cbbr.isContinuedSupport && "*"}
        </Heading>
      </HStack>

      <VStack
        alignItems={"flex-start"}
        borderBottom={"1px solid"}
        borderColor={"gray.200"}
        width="100%"
        paddingBottom={2}
        justifyContent={"flex-start"}
        fontSize={"sm"}
      >
        <Flex gap={2} flexWrap={"wrap"}>
          <HStack align={"flex-start"}>
            <Text fontWeight={"bold"}>Tracking Number: </Text>
            <Text>{cbbr.id}</Text>
          </HStack>
          <HStack align={"flex-start"}>
            <Text fontWeight={"bold"}>Community Board: </Text>
            <Tag>{cbbr.communityBoardId}</Tag>
          </HStack>
        </Flex>
        <HStack align={"flex-start"}>
          <Text fontWeight={"bold"}>Agency: </Text>
          <Tag>{agencyName}</Tag>
        </HStack>
      </VStack>
      <HStack fontSize={"sm"} align={"flex-start"}>
        <Text fontWeight={"bold"}>Policy Area: </Text>
        <Tag>{policyArea}</Tag>
      </HStack>
      <HStack paddingBottom={2} fontSize={"sm"} align={"flex-start"}>
        <Text fontWeight={"bold"}>Priority: </Text>
        <Text>
          <Tag>{cbbr.priority}</Tag> for {cbbr.communityBoardId} Capital Budget
          Requests
        </Text>
        <Tooltip label="Community Board ranking of importance">
          <InfoIcon />
        </Tooltip>
      </HStack>
      <VStack alignItems={"flex-start"} gap={0}>
        <Text fontWeight={"bold"} fontSize={"sm"}>
          Request from {cbbr.communityBoardId}:
        </Text>
        <Text>{cbbr.description}</Text>
      </VStack>
      <VStack alignItems={"flex-start"} gap={0}>
        <Text fontWeight={"bold"} fontSize={"sm"}>
          Response from {agencyName}:
        </Text>
        {agencyCategoryResponseAndResponse.map(
          (line: string, index: number) => (
            <Text
              key={`cbbrAgencyResponse${index}`}
              overflowWrap={"anywhere"}
              mb={2}
            >
              {line}
            </Text>
          ),
        )}
      </VStack>
      {cbbr.isContinuedSupport && (
        <Text
          borderTop={"1px solid"}
          borderColor={"gray.200"}
          width="100%"
          paddingTop={2}
          fontSize={"xs"}
        >
          <Text as="span" fontWeight={"bold"}>
            *Indicates Continued Support.{" "}
          </Text>
          Continued Support requests are Capital requests which have received
          some degree of funding or approval, where the board is requesting that
          the agency continue its support of that ongoing item.
        </Text>
      )}
    </VStack>
  );
}
