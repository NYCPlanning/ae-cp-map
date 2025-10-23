import {
  useLoaderData,
  useNavigate,
  useSearchParams,
  LoaderFunctionArgs,
  data,
} from "react-router";
import {
  findCapitalProjectByManagingCodeCapitalProjectId,
  findCapitalCommitmentsByManagingCodeCapitalProjectId,
  findCapitalCommitmentTypes,
  findCapitalProjectManagingAgencies,
} from "../gen";
import { CapitalProjectPanel } from "~/components/CapitalProjectPanel";

export async function loader({ params }: LoaderFunctionArgs) {
  const { managingCode, capitalProjectId } = params;
  if (managingCode === undefined || capitalProjectId === undefined) {
    throw data("Bad Request", { status: 400 });
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

  const managingAgenciesPromise = findCapitalProjectManagingAgencies({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
  const [
    capitalProjectResponse,
    capitalCommitmentsResponse,
    capitalCommitmentTypesResponse,
    managingAgenciesResponse,
  ] = await Promise.all([
    capitalProjectPromise,
    capitalCommitmentsPromise,
    capitalCommitmentTypesPromise,
    managingAgenciesPromise,
  ]);
  return {
    capitalProjectResponse,
    capitalCommitmentsResponse,
    capitalCommitmentTypesResponse,
    managingAgenciesResponse,
  };
}

export default function CapitalProjectByBoroughIdCommunityDistrictId() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    capitalProjectResponse: capitalProject,
    capitalCommitmentsResponse: { capitalCommitments },
    capitalCommitmentTypesResponse: { capitalCommitmentTypes },
    managingAgenciesResponse: { managingAgencies },
  } = useLoaderData<typeof loader>();

  return (
    <CapitalProjectPanel
      capitalProject={capitalProject}
      managingAgencies={managingAgencies}
      capitalCommitments={capitalCommitments}
      capitalCommitmentTypes={capitalCommitmentTypes}
      onNavigationClick={() => {
        navigate({
          pathname: `/capital-projects`,
          search: `?${searchParams.toString()}`,
        });
      }}
    />
  );
}
