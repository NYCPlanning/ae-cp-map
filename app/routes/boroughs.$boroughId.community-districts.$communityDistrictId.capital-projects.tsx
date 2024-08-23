import { Flex } from "@nycplanning/streetscape";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CapitalProjectsPanel } from "~/components/CapitalProjectsList";
import { ExportDataBtn } from "~/components/ExportDataBtn";
import { Pagination } from "~/components/Pagination";
import {
  findAgencies,
  findBoroughs,
  findCapitalProjectsByBoroughIdCommunityDistrictId,
} from "~/gen";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const itemsPerPage = 7;
  const pageParam = url.searchParams.get("page");
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
  const projectsByCommunityDistrictPromise =
    findCapitalProjectsByBoroughIdCommunityDistrictId(
      boroughId,
      communityDistrictId,
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
  const boroughsPromise = findBoroughs({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
  const [agenciesResponse, boroughsResponse, capitalProjectsResponse] =
    await Promise.all([
      agenciesPromise,
      boroughsPromise,
      projectsByCommunityDistrictPromise,
    ]);
  const boroughAbbr = boroughsResponse.boroughs.find(
    (borough) => borough.id === boroughId,
  )?.abbr;
  return {
    capitalProjectsResponse,
    agencies: agenciesResponse.agencies,
    boroughAbbr,
    communityDistrictId,
  };
}

export default function CapitalProjectsByBoroughIdCommunityDistrictId() {
  const {
    capitalProjectsResponse: { total: capitalProjectsTotal, capitalProjects },
    agencies,
    boroughAbbr,
    communityDistrictId,
  } = useLoaderData<typeof loader>();

  return (
    <CapitalProjectsPanel
      capitalProjects={capitalProjects}
      agencies={agencies}
      district={`Community District ${boroughAbbr}${communityDistrictId}`}
    >
      <Flex
        paddingTop={4}
        alignItems="center"
        justifyContent={"space-between"}
        marginTop={"auto"}
      >
        <Pagination total={capitalProjectsTotal} />
        <ExportDataBtn geographyFileName="project_in_geographies" />
      </Flex>
    </CapitalProjectsPanel>
  );
}
