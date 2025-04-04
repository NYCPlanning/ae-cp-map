import { LoaderFunctionArgs, json } from "@remix-run/node";
import { findAgencies, findAgencyBudgets, findCapitalProjects } from "../gen";
import { useLoaderData } from "@remix-run/react";
import { CapitalProjectsPanel } from "../components/CapitalProjectsList";
import { Flex } from "@nycplanning/streetscape";
import { Pagination } from "~/components/Pagination";
import { ExportDataModal } from "~/components/ExportDataModal";

export async function loader({ request }: LoaderFunctionArgs) {
  if (import.meta.env.VITE_FEATURE_FLAG_ATTRIBUTE_FILTERS !== "ON") {
    throw json("Not Found", { status: 404 });
  }
  const url = new URL(request.url);
  const itemsPerPage = 7;
  const pageParam = url.searchParams.get("page");
  const managingAgency = url.searchParams.get("managingAgency");
  const agencyBudget = url.searchParams.get("agencyBudget");
  const commitmentsTotalMin = url.searchParams.get("commitmentsTotalMin");
  const commitmentsTotalMax = url.searchParams.get("commitmentsTotalMax");
  const page = pageParam === null ? 1 : parseInt(pageParam);
  if (isNaN(page)) {
    throw json("Bad Request", { status: 400 });
  }
  const offset = (page - 1) * itemsPerPage;

  const projectsPromise = findCapitalProjects(
    {
      ...(managingAgency === null ? {} : { managingAgency }),
      ...(agencyBudget === null ? {} : { agencyBudget }),
      ...(commitmentsTotalMin === null ? {} : { commitmentsTotalMin }),
      ...(commitmentsTotalMax === null ? {} : { commitmentsTotalMax }),
      limit: itemsPerPage,
      offset: offset,
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

  const [agenciesResponse, agencyBudgetsResponse, projectsResponse] =
    await Promise.all([agenciesPromise, agencyBudgetsPromise, projectsPromise]);

  return {
    capitalProjectsResponse: projectsResponse,
    agencies: agenciesResponse.agencies,
    agencyBudgets: agencyBudgetsResponse.agencyBudgets,
  };
}

export default function CapitalProjects() {
  const {
    capitalProjectsResponse: { total: capitalProjectsTotal, capitalProjects },
    agencies,
    agencyBudgets,
  } = useLoaderData<typeof loader>();
  return (
    <CapitalProjectsPanel
      capitalProjects={capitalProjects}
      agencies={agencies}
      agencyBudgets={agencyBudgets}
      district={`\${totalProjects} Results`}
    >
      <Flex
        paddingTop={4}
        alignItems="center"
        justifyContent={"space-between"}
        marginTop={"auto"}
      >
        <Pagination total={capitalProjectsTotal} />
        <ExportDataModal
          geography={`City Council District {cityCouncilDistrictId}`}
          fileName={`city_council_district_{cityCouncilDistrictId}.csv`}
        />
      </Flex>
    </CapitalProjectsPanel>
  );
}
