import { LoaderFunctionArgs, json } from "@remix-run/node";
import { findAgencies, findCapitalProjects } from "../gen";
import { useLoaderData } from "@remix-run/react";
import { CapitalProjectsPanel } from "../components/CapitalProjectsList";
import { Flex } from "@nycplanning/streetscape";
import { Pagination } from "~/components/Pagination";
import { ExportDataModal } from "~/components/ExportDataModal";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const itemsPerPage = 7;
  const pageParam = url.searchParams.get("page");
  const districtType = url.searchParams.get("districtType");
  const boroughId = url.searchParams.get("boroughId");
  const districtId = url.searchParams.get("districtId");
  const managingAgency = url.searchParams.get("managingAgency") || undefined;
  const page = pageParam === null ? 1 : parseInt(pageParam);
  if (isNaN(page)) {
    throw json("Bad Request", { status: 400 });
  }
  const offset = (page - 1) * itemsPerPage;

  const geoParams =
    districtType === "cd" && boroughId && districtId
      ? { communityDistrictId: `${boroughId}${districtId}` }
      : districtType === "ccd" && districtId
        ? { cityCouncilDistrictId: districtId }
        : {};

  const projectsPromise = findCapitalProjects(
    {
      ...geoParams,
      managingAgency,
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

  const [agenciesResponse, projectsResponse] = await Promise.all([
    agenciesPromise,
    projectsPromise,
  ]);

  return {
    capitalProjectsResponse: projectsResponse,
    agencies: agenciesResponse.agencies,
    ...geoParams,
  };
}

export default function CapitalProjects() {
  const {
    capitalProjectsResponse: { total: capitalProjectsTotal, capitalProjects },
    agencies,
  } = useLoaderData<typeof loader>();

  return (
    <CapitalProjectsPanel
      capitalProjects={capitalProjects}
      agencies={agencies}
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
