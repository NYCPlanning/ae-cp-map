import { LoaderFunctionArgs, data, useLoaderData } from "react-router";
import {
  findAgencies,
  findAgencyBudgets,
  findCapitalProjects,
  findBoroughs,
  Borough,
} from "~/gen";
import { CapitalProjectsAccordionPanel } from "~/components/CapitalProjectsList";
import { Flex } from "@nycplanning/streetscape";
import { Pagination } from "~/components/Pagination";
import { ExportDataModal } from "~/components/ExportDataModal";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const itemsPerPage = 7;
  const pageParam = url.searchParams.get("cpPage");
  const managingAgency = url.searchParams.get("managingAgency");
  const agencyBudget = url.searchParams.get("agencyBudget");
  const commitmentsTotalMin = url.searchParams.get("commitmentsTotalMin");
  const commitmentsTotalMax = url.searchParams.get("commitmentsTotalMax");
  const districtType = url.searchParams.get("districtType");
  const boroughId = url.searchParams.get("boroughId");
  const districtId = url.searchParams.get("districtId");
  const page = pageParam === null ? 1 : parseInt(pageParam);
  if (isNaN(page)) {
    throw data("Bad Request", { status: 400 });
  }
  const offset = (page - 1) * itemsPerPage;

  const projectsPromise = findCapitalProjects(
    {
      ...(boroughId !== null && districtId !== null && districtType === "cd"
        ? { communityDistrictId: `${boroughId}${districtId}` }
        : {}),
      ...(districtId !== null && districtType === "ccd"
        ? { cityCouncilDistrictId: districtId }
        : {}),
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

  const boroughsPromise = findBoroughs({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });

  const [
    agenciesResponse,
    agencyBudgetsResponse,
    projectsResponse,
    boroughsResponse,
  ] = await Promise.all([
    agenciesPromise,
    agencyBudgetsPromise,
    projectsPromise,
    boroughsPromise,
  ]);

  let selectedBorough: Borough | undefined = undefined;

  if (boroughId !== null) {
    selectedBorough = boroughsResponse.boroughs.find(
      (borough) => borough.id === boroughId,
    );
  }

  return {
    capitalProjectsResponse: projectsResponse,
    agencies: agenciesResponse.agencies,
    agencyBudgets: agencyBudgetsResponse.agencyBudgets,
    communityDistrictId: districtId,
    cityCouncilDistrictId: districtId,
    selectedBorough,
  };
}

export default function CapitalProjects() {
  const {
    capitalProjectsResponse: {
      totalProjects: capitalProjectsTotal,
      capitalProjects,
    },
    agencies,
    agencyBudgets,
    selectedBorough,
    communityDistrictId,
    cityCouncilDistrictId,
  } = useLoaderData<typeof loader>();

  let exportModal = (
    <ExportDataModal
      geography={"All"}
      fileName={"projects_in_geographies.zip"}
    />
  );

  if (selectedBorough !== undefined && communityDistrictId !== null) {
    exportModal = (
      <ExportDataModal
        geography={`Community District ${selectedBorough.abbr}${communityDistrictId}`}
        fileName={`community_district_${selectedBorough.title.toLowerCase()}_cd${communityDistrictId}.csv`}
      />
    );
  } else if (cityCouncilDistrictId !== null) {
    exportModal = (
      <ExportDataModal
        geography={`City Council District ${cityCouncilDistrictId}`}
        fileName={`city_council_district_${cityCouncilDistrictId}.csv`}
      />
    );
  }

  return (
    <CapitalProjectsAccordionPanel
      capitalProjects={capitalProjects}
      agencies={agencies}
      agencyBudgets={agencyBudgets}
      capitalProjectsTotal={capitalProjectsTotal}
    >
      <Flex
        paddingTop={4}
        alignItems="center"
        justifyContent={"space-between"}
        marginTop={"auto"}
        marginBottom={{ base: "1rem", md: "0rem" }}
      >
        <Pagination total={capitalProjectsTotal} pageParamKey="cpPage" />
        {exportModal}
      </Flex>
    </CapitalProjectsAccordionPanel>
  );
}
