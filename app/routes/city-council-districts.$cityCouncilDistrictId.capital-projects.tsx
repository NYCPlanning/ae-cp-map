import { LoaderFunctionArgs, json } from "@remix-run/node";
import { findCapitalProjectsByCityCouncilId, findAgencies } from "../gen";
import { useLoaderData } from "@remix-run/react";
import { CapitalProjectsAccordionPanel } from "../components/CapitalProjectsList";
import { Button, Flex, Hide, Show } from "@nycplanning/streetscape";
import { CapitalProjectsDrawer } from "~/components/CapitalProjectsList/CapitalProjectsDrawer";
import { Pagination } from "~/components/Pagination";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const agenciesResponse = await findAgencies({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });

  const itemsPerPage = 7;
  const pageParam = url.searchParams.get("page");
  const page = pageParam === null ? 1 : parseInt(pageParam);
  const offset = (page - 1) * itemsPerPage;

  const { cityCouncilDistrictId } = params;
  if (cityCouncilDistrictId === undefined) {
    throw json("Bad Request", { status: 400 });
  }

  const projectsByCityCouncilDistrictResponse =
    await findCapitalProjectsByCityCouncilId(
      cityCouncilDistrictId,
      {
        limit: itemsPerPage,
        offset: offset,
      },
      {
        baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
      },
    );

  return {
    projects: projectsByCityCouncilDistrictResponse,
    agencies: agenciesResponse.agencies,
    cityCouncilDistrictId: cityCouncilDistrictId,
  };
}

export default function CapitalProjectsByCityCouncilDistrict() {
  const { projects, agencies, cityCouncilDistrictId } =
    useLoaderData<typeof loader>();

  const pagination = (
    <Flex paddingTop={4} alignItems="center" justifyContent={"space-between"}>
      <Pagination total={projects.total} />
    </Flex>
  );

  const desktop = (
    <CapitalProjectsAccordionPanel
      capitalProjects={projects.capitalProjects}
      agencies={agencies}
      district={"City Council District " + cityCouncilDistrictId}
    >
      {pagination}
    </CapitalProjectsAccordionPanel>
  );

  const mobile = (
    <CapitalProjectsDrawer
      capitalProjects={projects.capitalProjects}
      agencies={agencies}
      district={"City Council District " + cityCouncilDistrictId}
    >
      {pagination}
    </CapitalProjectsDrawer>
  );

  return (
    <>
      <Show above="sm">{desktop}</Show>
      <Hide above="sm">{mobile}</Hide>
    </>
  );
}
