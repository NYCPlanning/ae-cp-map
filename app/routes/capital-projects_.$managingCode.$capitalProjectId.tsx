import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import {
  findCapitalProjectByManagingCodeCapitalProjectId,
  findAgencies,
  findCapitalCommitmentsByManagingCodeCapitalProjectId,
  findCapitalCommitmentTypes,
} from "../gen";
import { CapitalProjectPanel } from "~/components/CapitalProjectPanel";
// import { analytics } from "~/utils/analytics";

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

  return (
    <CapitalProjectPanel
      capitalProject={capitalProject}
      capitalCommitments={capitalCommitments}
      capitalCommitmentTypes={capitalCommitmentTypes}
      navigationBtn={
        searchParams.get("districtId") || searchParams.get("managingAgency")
          ? "back"
          : "exit"
      }
      agencies={agencies}
      onNavigationClick={() => {
        // analytics({
        //   category: "Close Project Info Modal Button",
        //   action: "Click",
        //   name: "Closed",
        // });
        navigate({
          pathname:
            searchParams.get("districtId") || searchParams.get("managingAgency")
              ? "/capital-projects"
              : "/",
          search: `?${searchParams.toString()}`,
        });
      }}
    />
  );
}
