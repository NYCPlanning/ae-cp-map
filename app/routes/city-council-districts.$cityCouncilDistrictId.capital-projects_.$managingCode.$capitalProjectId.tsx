import { LoaderFunctionArgs } from "react-router";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import {
  findCapitalProjectByManagingCodeCapitalProjectId,
  findAgencies,
  findCapitalCommitmentsByManagingCodeCapitalProjectId,
  findCapitalCommitmentTypes,
} from "../gen";
import { CapitalProjectPanel } from "~/components/CapitalProjectPanel";

export async function loader({ params }: LoaderFunctionArgs) {
  const { managingCode, capitalProjectId } = params;
  const agenciesResponse = await findAgencies({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
  if (managingCode === undefined || capitalProjectId === undefined) {
    new Response("Bad Request", { status: 400 });
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
  return {
    capitalProject,
    capitalCommitments: capitalCommitmentsResponse.capitalCommitments,
    capitalCommitmentTypes:
      capitalCommitmentTypesResponse.capitalCommitmentTypes,
    agencies: agenciesResponse.agencies,
  };
}

export default function CapitalProjectByCityCouncilDistrictId() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cityCouncilDistrictId } = useParams();
  const {
    capitalProject,
    agencies,
    capitalCommitments,
    capitalCommitmentTypes,
  } = useLoaderData<typeof loader>();

  return (
    <CapitalProjectPanel
      capitalProject={capitalProject}
      agencies={agencies}
      navigationBtn="back"
      capitalCommitments={capitalCommitments}
      capitalCommitmentTypes={capitalCommitmentTypes}
      onNavigationClick={() => {
        navigate({
          pathname: `/city-council-districts/${cityCouncilDistrictId}/capital-projects`,
          search: `?${searchParams.toString()}`,
        });
      }}
    />
  );
}
