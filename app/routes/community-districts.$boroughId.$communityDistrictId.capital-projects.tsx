import { Flex, GridItem } from "@nycplanning/streetscape";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "../gen";
import ContentPanelLayout from "../components/content-panel/layout";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { boroughId, communityDistrictId } = params;
  if (boroughId === undefined || communityDistrictId === undefined)
    throw new Error("failed to provide borough id or community district id");

  // TODO: request capital projects by cd
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
    <ContentPanelLayout>
      <Outlet context={{ ...loaderData, ...contextData }} />
    </ContentPanelLayout>
  );
}
