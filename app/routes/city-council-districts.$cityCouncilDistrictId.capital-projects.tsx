import { LoaderFunctionArgs, json } from "@remix-run/node";
import { findCapitalProjects, findAgencies, findAgencyBudgets } from "../gen";
import { useLoaderData } from "@remix-run/react";
import { CapitalProjectsPanel } from "../components/CapitalProjectsList";
import { Flex } from "@nycplanning/streetscape";
import { Pagination } from "~/components/Pagination";
import { ExportDataModal } from "~/components/ExportDataModal";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const itemsPerPage = 7;
  const pageParam = url.searchParams.get("page");
  const managingAgency = url.searchParams.get("managingAgency");
  const agencyBudget = url.searchParams.get("agencyBudget");
  const commitmentsTotalMin = url.searchParams.get("commitmentsTotalMin");
  const commitmentsTotalMax = url.searchParams.get("commitmentsTotalMax");
  const page = pageParam === null ? 1 : parseInt(pageParam);
  const { cityCouncilDistrictId } = params;
  if (cityCouncilDistrictId === undefined || isNaN(page)) {
    throw json("Bad Request", { status: 400 });
  }
  const offset = (page - 1) * itemsPerPage;

  const projectsPromise = findCapitalProjects(
    {
      cityCouncilDistrictId,
      limit: itemsPerPage,
      offset: offset,
      ...(managingAgency === null ? {} : { managingAgency }),
      ...(agencyBudget === null ? {} : { agencyBudget }),
      ...(commitmentsTotalMin === null ? {} : { commitmentsTotalMin }),
      ...(commitmentsTotalMax === null ? {} : { commitmentsTotalMax }),
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

  const [agenciesResponse, agencyBudgetsResponse, capitalProjectsResponse] =
    await Promise.all([agenciesPromise, agencyBudgetsPromise, projectsPromise]);

  return {
    capitalProjectsResponse,
    agencies: agenciesResponse.agencies,
    agencyBudgets: agencyBudgetsResponse.agencyBudgets,
    cityCouncilDistrictId,
  };
}

export default function CapitalProjectsByCityCouncilDistrict() {
  const {
    capitalProjectsResponse: {
      totalProjects: capitalProjectsTotal,
      capitalProjects,
    },
    agencies,
    agencyBudgets,
    cityCouncilDistrictId,
  } = useLoaderData<typeof loader>();

  return (
    <CapitalProjectsPanel
      capitalProjects={capitalProjects}
      agencies={agencies}
      agencyBudgets={agencyBudgets}
      district={`City Council District ${cityCouncilDistrictId}`}
      capitalProjectsTotal={capitalProjectsTotal}
    >
      <Flex
        paddingTop={4}
        alignItems="center"
        justifyContent={"space-between"}
        marginTop={"auto"}
      >
        <Pagination total={capitalProjectsTotal} />
        <ExportDataModal
          geography={`City Council District ${cityCouncilDistrictId}`}
          fileName={`city_council_district_${cityCouncilDistrictId}.csv`}
        />
      </Flex>
    </CapitalProjectsPanel>
  );
}
