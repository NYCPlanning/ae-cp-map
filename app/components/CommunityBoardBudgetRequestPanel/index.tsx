import { CommunityBoardBudgetRequest } from "~/gen";
import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Tag,
  Text,
  Tooltip,
  VStack,
} from "@nycplanning/streetscape";
import { ChevronLeftIcon, InfoIcon } from "@chakra-ui/icons";

export type CommunityBoardBudgetRequestPanelProps = {
  cbbr: CommunityBoardBudgetRequest;
  agencyName: string | undefined;
  policyArea: string | undefined;
  agencyResponseType: string | undefined;
  onNavigationClick: () => void;
};

export function CommunityBoardBudgetRequestPanel({
  cbbr,
  agencyName,
  policyArea,
  agencyResponseType,
  onNavigationClick,
}: CommunityBoardBudgetRequestPanelProps) {
  return (
    <VStack alignItems={"flex-start"} gap={2}>
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
      >
        <Flex gap={2} flexWrap={"wrap"}>
          <HStack>
            <Text fontWeight={700}>Tracking Number: </Text>
            <Text>{cbbr.id}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={700}>Community Board: </Text>
            <Tag>{cbbr.communityBoardId}</Tag>
          </HStack>
        </Flex>
        <HStack>
          <Text fontWeight={700}>Agency: </Text>
          <Tag>{agencyName}</Tag>
        </HStack>
      </VStack>
      <HStack>
        <Text fontWeight={700}>Policy Area: </Text>
        <Tag>{policyArea}</Tag>
      </HStack>
      <HStack paddingBottom={2}>
        <Text fontWeight={700}>Priority: </Text>
        <Text>
          <Tag>{cbbr.priority}</Tag> for {cbbr.communityBoardId} Capital Budget
          Requests
        </Text>
        <Tooltip label="Community Board ranking of importance">
          <InfoIcon />
        </Tooltip>
      </HStack>
      <VStack alignItems={"flex-start"} gap={0}>
        <Text fontWeight={700}>Request from {cbbr.communityBoardId}:</Text>
        <Text>{cbbr.description}</Text>
      </VStack>
      <VStack alignItems={"flex-start"} gap={0}>
        <Text fontWeight={700}>Response from {agencyName}:</Text>
        <Text>
          {agencyResponseType}. {cbbr.cbbrAgencyResponse}
        </Text>
      </VStack>
      {cbbr.isContinuedSupport && (
        <Text
          borderTop={"1px solid"}
          borderColor={"gray.200"}
          width="100%"
          paddingTop={2}
          fontSize={"sm"}
        >
          <span style={{ fontWeight: 700 }}>
            *Indicates Continued Support.{" "}
          </span>
          Continued Support requests are Capital requests which have received
          some degree of funding or approval, where the board is requesting that
          the agency continue its support of that ongoing item.
        </Text>
      )}
    </VStack>
  );
}
