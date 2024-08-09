import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import {
  findCapitalProjectByManagingCodeCapitalProjectId,
  findAgencies,
  findCapitalCommitmentsByManagingCodeCapitalProjectId,
  findCapitalCommitmentTypes,
} from "../gen";
import { CapitalProjectDetailPanel } from "../components/CapitalProjectDetailPanel";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Show,
} from "@nycplanning/streetscape";
import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { MobilePanelSizeControl } from "~/components/MobilePanelSizeControl";
import { CapitalCommitmentsTable } from "~/components/CapitalCommitmentsTable/CapitalCommitmentsTable";
import { CapitalCommitmentsTimeline } from "~/components/CapitalProjectDetailPanel/CapitalCommitmentsTimeline";

export async function loader({ params }: LoaderFunctionArgs) {
  const { managingCode, capitalProjectId } = params;
  const agenciesResponse = await findAgencies({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
  if (managingCode === undefined || capitalProjectId === undefined) {
    throw json("Bad Request", { status: 400 });
  }
  const capitalProjectPromise =
    findCapitalProjectByManagingCodeCapitalProjectId(
      managingCode,
      capitalProjectId,
      {
        baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
      },
    );

  const capitalCommitmentsPromise =
    findCapitalCommitmentsByManagingCodeCapitalProjectId(
      managingCode,
      capitalProjectId,
      {
        baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
      },
    );

  const capitalCommitmentTypesPromise = findCapitalCommitmentTypes({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });

  const [
    capitalProject,
    capitalCommitmentsResponse,
    capitalCommitmentTypesResponse,
  ] = await Promise.all([
    capitalProjectPromise,
    capitalCommitmentsPromise,
    capitalCommitmentTypesPromise,
  ]);
  return json({
    capitalProject,
    capitalCommitments: capitalCommitmentsResponse.capitalCommitments,
    capitalCommitmentTypes:
      capitalCommitmentTypesResponse.capitalCommitmentTypes,
    agencies: agenciesResponse.agencies,
  });
}

export default function CapitalProject() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    capitalProject,
    capitalCommitments,
    agencies,
    capitalCommitmentTypes,
  } = useLoaderData<typeof loader>();
  const [commitmentsAreVisible, setCommitmentsAreVisible] = useState(false);

  const toggleCommitmentsAreVisible = () =>
    setCommitmentsAreVisible((commitmentsAreVisible) => !commitmentsAreVisible);

  const capitalCommitmentsTimeline = (
    <CapitalCommitmentsTimeline capitalCommitments={capitalCommitments} />
  );

  return (
    <Flex
      borderTopRadius={"base"}
      borderBottomRadius={{ base: "0", lg: "base" }}
      background={"white"}
      direction={"column"}
      width={{ base: "full", lg: "21.25rem" }}
      maxW={{ lg: "unset" }}
      boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
      position={{ base: "fixed", lg: "static" }}
    >
      <MobilePanelSizeControl
        isExpanded={commitmentsAreVisible}
        isExpandedToggle={toggleCommitmentsAreVisible}
        marginTop={"0.75rem"}
      />
      <CapitalProjectDetailPanel
        capitalProject={capitalProject}
        agencies={agencies}
        capitalCommitmentsTimeline={capitalCommitmentsTimeline}
        onClose={() => {
          navigate({
            pathname: "/",
            search: `?${searchParams.toString()}`,
          });
        }}
      />
      {commitmentsAreVisible && (
        <Show below="lg">
          <Flex paddingY={3} direction={"column"} maxHeight={"30vh"}>
            <Heading
              fontSize="sm"
              fontWeight={"bold"}
              paddingX={3}
              paddingBottom={3}
            >
              Commitment Details
            </Heading>
            <CapitalCommitmentsTable
              capitalCommitments={capitalCommitments}
              capitalCommitmentTypes={capitalCommitmentTypes}
            />
          </Flex>
        </Show>
      )}
      <Flex
        justifyContent={"end"}
        paddingX={{ base: 3, lg: 4 }}
        paddingBottom={{ base: 3, lg: 4 }}
      >
        <Button isDisabled={true} size="xs">
          Export Data
        </Button>
      </Flex>
      <Show above="lg">
        <Flex
          direction={"column"}
          backgroundColor="gray.50"
          paddingX={4}
          paddingBottom={4}
          borderBottomRadius={"base"}
          maxHeight={"40vh"}
        >
          <Flex align={"center"} justifyContent={"space-between"}>
            <Heading fontSize={"lg"} fontWeight={"bold"}>
              Commitment Details
            </Heading>
            <IconButton
              aria-label="Close project detail panel"
              icon={
                commitmentsAreVisible ? (
                  <ChevronUpIcon boxSize={10} />
                ) : (
                  <ChevronDownIcon boxSize={10} />
                )
              }
              color={"gray.600"}
              backgroundColor={"inherit"}
              _hover={{
                border: "none",
                backgroundColor: "blackAlpha.100",
              }}
              onClick={toggleCommitmentsAreVisible}
            />
          </Flex>
          {commitmentsAreVisible && (
            <CapitalCommitmentsTable
              capitalCommitments={capitalCommitments}
              capitalCommitmentTypes={capitalCommitmentTypes}
            />
          )}
        </Flex>
      </Show>
    </Flex>
  );
}
