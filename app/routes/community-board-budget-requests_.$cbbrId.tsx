import {
  LoaderFunctionArgs,
  data,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router";
import {
  findCommunityBoardBudgetRequestAgencies,
  findCommunityBoardBudgetRequestAgencyResponseTypes,
  findCommunityBoardBudgetRequestById,
  findCommunityBoardBudgetRequestPolicyAreas,
} from "../gen";
import { Show } from "@nycplanning/streetscape";
import { CommunityBoardBudgetRequestDetail } from "~/components/CommunityBoardBudgetRequestDetail";
import { ContentPanelAccordion } from "~/components/ContentPanelAccordion";
import { analytics } from "~/utils/analytics";

export async function loader({ params }: LoaderFunctionArgs) {
  const { cbbrId } = params;

  if (cbbrId === undefined) {
    throw data("Bad Request", { status: 400 });
  }

  const cbbrPromise = findCommunityBoardBudgetRequestById(cbbrId, {
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });

  const agenciesPromise = findCommunityBoardBudgetRequestAgencies(undefined, {
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });

  const agencyResponseTypesPromise =
    findCommunityBoardBudgetRequestAgencyResponseTypes({
      baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
    });

  const policyAreasPromise = findCommunityBoardBudgetRequestPolicyAreas(
    undefined,
    {
      baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
    },
  );

  const [
    cbbr,
    agenciesResponse,
    agencyResponseTypesResponse,
    policyAreasResponse,
  ] = await Promise.all([
    cbbrPromise,
    agenciesPromise,
    agencyResponseTypesPromise,
    policyAreasPromise,
  ]);
  return {
    cbbr,
    agencies: agenciesResponse.cbbrAgencies,
    agencyResponseTypes: agencyResponseTypesResponse.cbbrAgencyResponseTypes,
    policyAreas: policyAreasResponse.cbbrPolicyAreas,
  };
}

export default function CommunityBoardBudgetRequest() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cbbr, agencies, agencyResponseTypes, policyAreas } =
    useLoaderData<typeof loader>();

  const agencyName = agencies.find(
    (agency) => agency.initials === cbbr.agencyInitials,
  )?.name;
  const policyArea = policyAreas.find(
    (area) => area.id === cbbr.cbbrPolicyAreaId,
  )?.description;
  const agencyResponseType = agencyResponseTypes.find(
    (category) => category.id === cbbr.cbbrAgencyResponseTypeId,
  )?.description;

  const onNavigationClick = () => {
    analytics({
      category: "Close CBBR Info Modal Button",
      action: "Click",
      name: "Closed",
    });
    navigate({
      pathname: `/community-board-budget-requests`,
      search: `?${searchParams.toString()}`,
    });
  };

  return (
    <>
      <Show below="md">
        <ContentPanelAccordion accordionHeading="Project Details">
          <CommunityBoardBudgetRequestDetail
            cbbr={cbbr}
            agencyName={agencyName}
            policyArea={policyArea}
            agencyResponseType={agencyResponseType}
            onNavigationClick={onNavigationClick}
          />
        </ContentPanelAccordion>
      </Show>

      <Show above="md">
        <CommunityBoardBudgetRequestDetail
          cbbr={cbbr}
          agencyName={agencyName}
          policyArea={policyArea}
          agencyResponseType={agencyResponseType}
          onNavigationClick={onNavigationClick}
        />
      </Show>
    </>
  );
}
