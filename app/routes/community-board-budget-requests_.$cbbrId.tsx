import {
  LoaderFunctionArgs,
  data,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router";
import {
  findCommunityBoardBudgetRequestAgencies,
  findCommunityBoardBudgetRequestAgencyCategoryResponses,
  findCommunityBoardBudgetRequestById,
  findCommunityBoardBudgetRequestPolicyAreas,
} from "../gen";
import { Show } from "@nycplanning/streetscape";
import { CommunityBoardBudgetRequestDetail } from "~/components/CommunityBoardBudgetRequestDetail";
import { ContentPanelAccordion } from "~/components/ContentPanelAccordion";
import { analytics } from "~/utils/analytics";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;

export async function loader({ params }: LoaderFunctionArgs) {
  const { cbbrId } = params;

  if (cbbrId === undefined) {
    throw data("Bad Request", { status: 400 });
  }

  const cbbrPromise = findCommunityBoardBudgetRequestById(cbbrId, {
    baseURL: `${zoningApiUrl}/api`,
  });

  const agenciesPromise = findCommunityBoardBudgetRequestAgencies(undefined, {
    baseURL: `${zoningApiUrl}/api`,
  });

  const agencyCategoryResponsePromise =
    findCommunityBoardBudgetRequestAgencyCategoryResponses({
      baseURL: `${zoningApiUrl}/api`,
    });

  const policyAreasPromise = findCommunityBoardBudgetRequestPolicyAreas(
    undefined,
    {
      baseURL: `${zoningApiUrl}/api`,
    },
  );

  const [
    cbbr,
    agenciesResponse,
    agencyCategoryResponseResponse,
    policyAreasResponse,
  ] = await Promise.all([
    cbbrPromise,
    agenciesPromise,
    agencyCategoryResponsePromise,
    policyAreasPromise,
  ]);
  return {
    cbbr,
    agencies: agenciesResponse.cbbrAgencies,
    agencyCategoryResponses:
      agencyCategoryResponseResponse.cbbrAgencyCategoryResponses,
    policyAreas: policyAreasResponse.cbbrPolicyAreas,
  };
}

export default function CommunityBoardBudgetRequest() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cbbr, agencies, agencyCategoryResponses, policyAreas } =
    useLoaderData<typeof loader>();

  const agencyName = agencies.find(
    (agency) => agency.initials === cbbr.agencyInitials,
  )?.name;
  const policyArea = policyAreas.find(
    (area) => area.id === cbbr.cbbrPolicyAreaId,
  )?.description;
  const agencyCategoryResponse = agencyCategoryResponses.find(
    (category) => category.id === cbbr.cbbrAgencyCategoryResponseId,
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
            agencyCategoryResponse={agencyCategoryResponse}
            onNavigationClick={onNavigationClick}
          />
        </ContentPanelAccordion>
      </Show>

      <Show above="md">
        <CommunityBoardBudgetRequestDetail
          cbbr={cbbr}
          agencyName={agencyName}
          policyArea={policyArea}
          agencyCategoryResponse={agencyCategoryResponse}
          onNavigationClick={onNavigationClick}
        />
      </Show>
    </>
  );
}
