import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import {
  findCapitalProjectByManagingCodeCapitalProjectId,
  findAgencies,
} from "../gen";
import { CapitalProjectDetailPanel } from "../components/CapitalProjectDetailPanel";

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

  const [capitalProject] = await Promise.all([capitalProjectPromise]);

  return json({
    capitalProject,
    agencies: agenciesResponse.agencies,
  });
}

export default function CapitalProjectByBoroughIdCommunityDistrictId() {
  const navigate = useNavigate();
  const { boroughId, communityDistrictId } = useParams();
  const [searchParams] = useSearchParams();
  const { capitalProject, agencies } = useLoaderData<typeof loader>();

  return (
    <CapitalProjectDetailPanel
      capitalProject={capitalProject}
      agencies={agencies}
      navigationBtn="back"
      onNavigationClick={() => {
        {
          navigate({
            pathname: `/boroughs/${boroughId}/community-districts/${communityDistrictId}/capital-projects`,
            search: `?${searchParams.toString()}`,
          });
        }
      }}
    />
  );
}
