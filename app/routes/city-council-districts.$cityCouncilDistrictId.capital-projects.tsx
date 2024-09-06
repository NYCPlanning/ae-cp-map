import { LoaderFunctionArgs, json } from "@remix-run/node";
import { findCapitalProjectsByCityCouncilId, findAgencies } from "../gen";
import { useLoaderData } from "@remix-run/react";
import { CapitalProjectsPanel } from "../components/CapitalProjectsList";
import { Flex } from "@nycplanning/streetscape";
import { Pagination } from "~/components/Pagination";
import { ExportDataModal } from "~/components/ExportDataModal";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const itemsPerPage = 7;
  const pageParam = url.searchParams.get("page");
  const page = pageParam === null ? 1 : parseInt(pageParam);
  const { cityCouncilDistrictId } = params;
  if (cityCouncilDistrictId === undefined || isNaN(page)) {
    throw json("Bad Request", { status: 400 });
  }
  const offset = (page - 1) * itemsPerPage;

  const projectsByCityCouncilDistrictPromise =
    findCapitalProjectsByCityCouncilId(
      cityCouncilDistrictId,
      {
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

  const [agenciesResponse, projectsByCityCouncilDistrictResponse] =
    await Promise.all([agenciesPromise, projectsByCityCouncilDistrictPromise]);

  return {
    capitalProjectsResponse: projectsByCityCouncilDistrictResponse,
    agencies: agenciesResponse.agencies,
    cityCouncilDistrictId,
  };
}

export default function CapitalProjectsByCityCouncilDistrict() {
  const {
    capitalProjectsResponse: { total: capitalProjectsTotal, capitalProjects },
    agencies,
    cityCouncilDistrictId,
  } = useLoaderData<typeof loader>();

  return (
    <CapitalProjectsPanel
      capitalProjects={capitalProjects}
      agencies={agencies}
      district={`City Council District ${cityCouncilDistrictId}`}
    >
      <Flex
        paddingTop={4}
        alignItems="center"
        justifyContent={"space-between"}
        marginTop={"auto"}
      >
        <Pagination total={capitalProjectsTotal} />
        {/* TODO: Make dynamic */}
        <ExportDataModal
          geography="City Council District 1"
          fileName="city_council_district_1"
        />
      </Flex>
    </CapitalProjectsPanel>
  );
}
