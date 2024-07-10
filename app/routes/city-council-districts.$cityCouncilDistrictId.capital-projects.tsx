import { LoaderFunctionArgs, json } from "@remix-run/node";
import { findCapitalProjectsByCityCouncilId } from "../gen";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { CapitalProjectsList } from "~/components/CapitalProjectsList";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
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

  return projectsByCityCouncilDistrictResponse;
}

export default function CapitalProjectsByCityCouncilDistrict() {
    const projectsByCityCouncilDistrict = useLoaderData<typeof loader>();
    return (
    <CapitalProjectsList
        capitalProjects={projectsByCityCouncilDistrict.capitalProjects}
    />    
    );
}
