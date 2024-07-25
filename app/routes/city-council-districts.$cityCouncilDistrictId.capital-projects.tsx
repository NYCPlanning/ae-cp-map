import { LoaderFunctionArgs, json } from "@remix-run/node";
import { findCapitalProjectsByCityCouncilId, findAgencies } from "../gen";
import { useLoaderData, useLocation, useParams } from "@remix-run/react";
import {
  CapitalProjectsAccordionPanel,
  CapitalProjectsList,
} from "../components/CapitalProjectsList";
import { Hide, Show } from "@nycplanning/streetscape";
import { CapitalProjectsDrawer } from "~/components/CapitalProjectsList/CapitalProjectsDrawer";

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
      path={pathname}
      total={projectsByCityCouncilDistrictResponse.total}
      agencies={agencies}
    />
  );

  return (
    <>
      <Show above="sm">
        <CapitalProjectsAccordionPanel district={district}>
          {capitalProjectList}
        </CapitalProjectsAccordionPanel>
      </Show>
      <Hide above="sm">
        <CapitalProjectsDrawer district={district}>
          {capitalProjectList}
        </CapitalProjectsDrawer>
      </Hide>
    </>
  );
}
