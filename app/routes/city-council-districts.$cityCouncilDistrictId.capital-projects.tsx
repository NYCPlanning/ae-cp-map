import { LoaderFunctionArgs, json } from "@remix-run/node";
import { findCapitalProjectsByCityCouncilId, findAgencies } from "../gen";
import { useLoaderData, useLocation, useParams } from "@remix-run/react";
import {
  CapitalProjectsAccordionPanel,
  CapitalProjectsList,
} from "../components/CapitalProjectsList";
import { Button, Flex, Hide, Show } from "@nycplanning/streetscape";
import { CapitalProjectsDrawer } from "~/components/CapitalProjectsList/CapitalProjectsDrawer";
import { Pagination } from "~/components/Pagination";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const agenciesResponse = await findAgencies({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
  const offsetParam = url.searchParams.get("offset");
  let offset;
  if (offsetParam === null) {
    offset = 0;
  } else {
    offset = parseInt(offsetParam);
  }

  const { cityCouncilDistrictId } = params;
  if (cityCouncilDistrictId === undefined) {
    throw json("Bad Request", { status: 400 });
  }

  const projectsByCityCouncilDistrictResponse =
    await findCapitalProjectsByCityCouncilId(
      cityCouncilDistrictId,
      {
        limit: 7,
        offset,
      },
      {
        baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
      },
    );

  return {
    projectsByCityCouncilDistrictResponse,
    agencies: agenciesResponse.agencies,
    cityCouncilDistrictId,
  };
}

export default function CapitalProjectsByCityCouncilDistrict() {
  const { projectsByCityCouncilDistrictResponse, agencies } =
    useLoaderData<typeof loader>();
  const { pathname } = useLocation();
  const { cityCouncilDistrictId } = useParams();

  const district = `City Council District ${cityCouncilDistrictId}`;
  const capitalProjectList = (
    <CapitalProjectsList
      capitalProjects={projectsByCityCouncilDistrictResponse.capitalProjects}
      agencies={agencies}
    />
  );

  const footer = (
    <Flex
      paddingTop="16px"
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Pagination
        total={projectsByCityCouncilDistrictResponse.total}
        path={pathname}
      />
      <Button size="sm">Export Data</Button>
    </Flex>
  );

  const capitalProjectChildren = (
    <>
      {capitalProjectList}
      {footer}
    </>
  );

  return (
    <>
      <Show above="sm">
        <CapitalProjectsAccordionPanel district={district}>
          {capitalProjectChildren}
        </CapitalProjectsAccordionPanel>
      </Show>
      <Hide above="sm">
        <CapitalProjectsDrawer district={district}>
          {capitalProjectChildren}
        </CapitalProjectsDrawer>
      </Hide>
    </>
  );
}
