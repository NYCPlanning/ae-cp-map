import {
  LoaderFunctionArgs,
  data,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router";
import {
  findCapitalProjectByManagingCodeCapitalProjectId,
  findCapitalCommitmentsByManagingCodeCapitalProjectId,
  findCapitalCommitmentTypes,
  findCapitalProjectManagingAgencies,
} from "../gen";
import { CapitalProjectPanel } from "~/components/CapitalProjectPanel";
import { analytics } from "~/utils/analytics";
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
    capitalProject,
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
    capitalProject,
    capitalCommitmentsResponse,
    capitalCommitmentTypesResponse,
    managingAgenciesResponse,
  };
}

export default function CapitalProject() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    capitalProject,
    capitalCommitmentsResponse: { capitalCommitments },
    capitalCommitmentTypesResponse: { capitalCommitmentTypes },
    managingAgenciesResponse: { managingAgencies },
  } = useLoaderData<typeof loader>();

  return (
    <CapitalProjectPanel
      capitalProject={capitalProject}
      capitalCommitments={capitalCommitments}
      capitalCommitmentTypes={capitalCommitmentTypes}
      managingAgencies={managingAgencies}
      onNavigationClick={() => {
        analytics({
          category: "Close Project Info Modal Button",
          action: "Click",
          name: "Closed",
        });
        navigate({
          pathname: `/capital-projects`,
          search: `?${searchParams.toString()}`,
        });
      }}
    />
  );
}
