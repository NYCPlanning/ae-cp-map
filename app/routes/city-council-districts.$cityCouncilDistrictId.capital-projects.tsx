import { LoaderFunctionArgs, json } from "@remix-run/node";
import { findCapitalProjectsByCityCouncilId, findAgencies } from "../gen";
import { useLoaderData } from "@remix-run/react";
import { CapitalProjectsAccordionPanel } from "../components/CapitalProjectsList";
import { Hide, Show } from "@nycplanning/streetscape";
import { CapitalProjectsDrawer } from "~/components/CapitalProjectsList/CapitalProjectsDrawer";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const path = url.pathname;
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
    path,
    cityCouncilDistrictId,
  };
}

export default function CapitalProjectsByCityCouncilDistrict() {
  const {
    projectsByCityCouncilDistrictResponse,
    agencies,
    cityCouncilDistrictId,
    path,
  } = useLoaderData<typeof loader>();

  return (
    <>
      <Show above="sm">
        <CapitalProjectsAccordionPanel
          capitalProjects={
            projectsByCityCouncilDistrictResponse.capitalProjects
          }
          agencies={agencies}
          path={path}
          total={projectsByCityCouncilDistrictResponse.total}
          district={"City Council District " + cityCouncilDistrictId}
        />
      </Show>
      <Hide above="sm">
        <CapitalProjectsDrawer
          capitalProjects={
            projectsByCityCouncilDistrictResponse.capitalProjects
          }
          agencies={agencies}
          path={path}
          total={projectsByCityCouncilDistrictResponse.total}
          district={"City Council District " + cityCouncilDistrictId}
        />
      </Hide>
    </>
  );
}
