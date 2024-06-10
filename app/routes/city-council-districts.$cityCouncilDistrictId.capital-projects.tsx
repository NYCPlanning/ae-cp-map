import { Flex, GridItem } from "@nycplanning/streetscape";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import {
  FindCapitalProjectsByCityCouncilIdQueryResponse,
  FindCityCouncilDistrictsQueryResponse,
} from "../gen";
import { LoaderFunctionArgs } from "@remix-run/node";

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
    <GridItem
      zIndex={1}
      gridColumnStart={42}
      gridColumnEnd={64}
      gridRowStart={2}
      gridRowEnd={30}
    >
      <Flex
        borderRadius={"base"}
        padding={{ base: 3, lg: 4 }}
        background={"white"}
        direction={"column"}
        boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
        width={"100%"}
        height={"100%"}
      >
        <Outlet context={{ ...loaderData, ...contextData }} />
      </Flex>
    </GridItem>
  );
}
