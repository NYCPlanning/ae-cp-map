import { LoaderFunctionArgs, json } from "@remix-run/node";
import { findCapitalProjectsByCityCouncilId, findAgencies } from "../gen";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { CapitalProjectsList } from "~/components/CapitalProjectsList";
import { CapitalProjectsAccordionPanel } from "~/components/CapitalProjectsAccordionPanel";

export async function loader({ request, params }: LoaderFunctionArgs) {
    console.log("in loader");
  const url = new URL(request.url);
  const path = url.pathname;
  console.log("url", url);
  const agenciesResponse = await findAgencies({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
  const limitParam = url.searchParams.get("limit");
  const offsetParam = url.searchParams.get("offset");
  let limit;
  let offset;
  if (limitParam === null) {
    limit = 20;
  } else {
    limit = parseInt(limitParam);
  }
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

  return {projectsByCityCouncilDistrictResponse, agencies: agenciesResponse.agencies, limit, offset, path, cityCouncilDistrictId};
}

export default function CapitalProjectsByCityCouncilDistrict() {
    const {projectsByCityCouncilDistrictResponse, agencies, cityCouncilDistrictId, limit, path, offset} = useLoaderData<typeof loader>();
    console.log("in return fuction", projectsByCityCouncilDistrictResponse.capitalProjects);

    return (
    <CapitalProjectsAccordionPanel
        capitalProjects={projectsByCityCouncilDistrictResponse.capitalProjects}
        limit={limit}
        agencies={agencies}
        path={path}
        offset={offset}
        total={projectsByCityCouncilDistrictResponse.total}
        district={"City Council District " + cityCouncilDistrictId}
    />    
    );
}
