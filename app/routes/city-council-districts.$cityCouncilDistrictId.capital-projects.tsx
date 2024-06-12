import { Flex, GridItem } from "@nycplanning/streetscape";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import {
  FindCapitalProjectsByCityCouncilIdQueryResponse,
  FindCityCouncilDistrictsQueryResponse,
} from "../gen";
import { LoaderFunctionArgs } from "@remix-run/node";
import ContentPanelLayout from "../components/content-panel/layout";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { cityCouncilDistrictId } = params;
  if (cityCouncilDistrictId === undefined)
    throw new Error("failed to provide city council district id");

  return {
    capitalProjects: [
      { managingCode: "080", id: "foo" },
      { managingCode: "100", id: "bar" },
    ],
  };
};

export default function CityCouncilDistrictCityCouncilDistrictIdPath() {
  const loaderData =
    useLoaderData<FindCapitalProjectsByCityCouncilIdQueryResponse>();
  const contextData = useOutletContext<FindCityCouncilDistrictsQueryResponse>();

  return (
    <ContentPanelLayout>
      <Outlet context={{ ...loaderData, ...contextData }} />
    </ContentPanelLayout>
  );
}
