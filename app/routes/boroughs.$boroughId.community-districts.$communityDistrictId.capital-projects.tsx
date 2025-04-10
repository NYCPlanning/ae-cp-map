import { Flex } from "@nycplanning/streetscape";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CapitalProjectsPanel } from "~/components/CapitalProjectsList";
import { ExportDataModal } from "~/components/ExportDataModal";
import { Pagination } from "~/components/Pagination";
import {
  findAgencies,
  findAgencyBudgets,
  findBoroughs,
  findCapitalProjects,
} from "~/gen";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const itemsPerPage = 7;
  const pageParam = url.searchParams.get("page");
  const managingAgency = url.searchParams.get("managingAgency");
  const agencyBudget = url.searchParams.get("agencyBudget");
  const page = pageParam === null ? 1 : parseInt(pageParam);

  const { boroughId, communityDistrictId } = params;
  if (
    boroughId === undefined ||
    communityDistrictId === undefined ||
    isNaN(page)
  ) {
    throw json("Bad request", { status: 400 });
  }

  const offset = (page - 1) * itemsPerPage;
  const projectsPromise = findCapitalProjects(
    {
      communityDistrictId: `${boroughId}${communityDistrictId}`,
      limit: itemsPerPage,
      offset: offset,
      ...(managingAgency === null ? {} : { managingAgency }),
      ...(agencyBudget === null ? {} : { agencyBudget }),
    },
    {
      baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
    },
  );

  const agenciesPromise = findAgencies({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
  const agencyBudgetsPromise = findAgencyBudgets({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
  const boroughsPromise = findBoroughs({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
  const [
    agenciesResponse,
    agencyBudgetsResponse,
    boroughsResponse,
    capitalProjectsResponse,
  ] = await Promise.all([
    agenciesPromise,
    agencyBudgetsPromise,
    boroughsPromise,
    projectsPromise,
  ]);
  const activeBorough = boroughsResponse.boroughs.find(
    (borough) => borough.id === boroughId,
  );
  return {
    capitalProjectsResponse,
    agencies: agenciesResponse.agencies,
    agencyBudgets: agencyBudgetsResponse.agencyBudgets,
    boroughAbbr: activeBorough?.abbr,
    boroughTitle: activeBorough?.title,
    communityDistrictId,
  };
}

export default function CapitalProjectsByBoroughIdCommunityDistrictId() {
  const {
    capitalProjectsResponse: { total: capitalProjectsTotal, capitalProjects },
    agencies,
    agencyBudgets,
    boroughAbbr,
    boroughTitle,
    communityDistrictId,
  } = useLoaderData<typeof loader>();

  return (
    <CapitalProjectsPanel
      capitalProjects={capitalProjects}
      agencies={agencies}
      agencyBudgets={agencyBudgets}
      district={`Community District ${boroughAbbr}${communityDistrictId}`}
    >
      <Flex
        paddingTop={4}
        alignItems="center"
        justifyContent={"space-between"}
        marginTop={"auto"}
      >
        <Pagination total={capitalProjectsTotal} />
        <ExportDataModal
          geography={`Community District ${boroughAbbr}${communityDistrictId}`}
          fileName={`community_district_${boroughTitle?.toLowerCase()}_cd${communityDistrictId}.csv`}
        />
      </Flex>
    </CapitalProjectsPanel>
  );
}
