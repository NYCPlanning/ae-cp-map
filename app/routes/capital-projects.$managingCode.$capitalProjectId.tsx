import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import {
  findCapitalProjectByManagingCodeCapitalProjectId,
  findAgencies,
  findCapitalCommitmentsByManagingCodeCapitalProjectId,
  findCapitalCommitmentTypes,
} from "../gen";
import { Flex } from "@nycplanning/streetscape";
import { useState } from "react";
import { MobilePanelResizeBar } from "~/components/MobilePanelResizeBar";
import { CapitalProjectPanel } from "~/components/CapitalProjectPanel";

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
      <MobilePanelResizeBar
        isExpanded={commitmentsAreVisible}
        isExpandedToggle={toggleCommitmentsAreVisible}
        marginTop={"0.75rem"}
      />
      <CapitalProjectPanel
        capitalProject={capitalProject}
        capitalCommitments={capitalCommitments}
        capitalCommitmentTypes={capitalCommitmentTypes}
        agencies={agencies}
        onNavigationClick={() => {
          navigate({
            pathname: "/",
            search: `?${searchParams.toString()}`,
          });
        }}
      />
    </Flex>
  );
}
