import { useOutletContext, useParams } from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "../gen";
import CapitalProjectsContentPanel from "../components/content-panel/capital-projects";

export default function CommunityDistrictProjectsPath() {
  const { boroughId, communityDistrictId } = useParams();
  if (boroughId === undefined || communityDistrictId === undefined)
    throw new Error("failed to provide borough id or community district id");
  const contextData = useOutletContext<
    FindBoroughsQueryResponse &
      FindCommunityDistrictsByBoroughIdQueryResponse &
      FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse
  >();
  const boroughDetails = contextData.boroughs.find(
    (borough) => borough.id === boroughId,
  );

  return (
    <CapitalProjectsContentPanel
      heading={`Community District ${boroughDetails?.abbr}${communityDistrictId}`}
      capitalProjects={contextData.capitalProjects}
    />
  );
}
