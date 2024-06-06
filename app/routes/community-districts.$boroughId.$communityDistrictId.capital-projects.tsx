import { Flex, GridItem } from "@nycplanning/streetscape";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "../gen";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { boroughId, communityDistrictId } = params;
  if (boroughId === undefined || communityDistrictId === undefined)
    throw new Error("failed to provide borough id or community district id");

  return {
    capitalProjects: [
      { managingCode: "080", id: "foo" },
      { managingCode: "100", id: "bar" },
    ],
  };
};
export default function CommunityDistrictProjectsPath() {
  const loaderData =
    useLoaderData<FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse>();
  const contextData = useOutletContext<
    FindBoroughsQueryResponse & FindCommunityDistrictsByBoroughIdQueryResponse
  >();

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
