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
import { env } from "~/utils/env";

const { zoningApiUrl } = env;

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
        baseURL: `${zoningApiUrl}/api`,
      },
    );

  const capitalCommitmentsPromise =
    findCapitalCommitmentsByManagingCodeCapitalProjectId(
      managingCode,
      capitalProjectId,
      {
        baseURL: `${zoningApiUrl}/api`,
      },
    );

  const capitalCommitmentTypesPromise = findCapitalCommitmentTypes({
    baseURL: `${zoningApiUrl}/api`,
  });

  const managingAgenciesPromise = findCapitalProjectManagingAgencies({
    baseURL: `${zoningApiUrl}/api`,
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
