import { Outlet, useOutletContext, useParams } from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "../gen";
import { GeographyMenuCommunityDistricts } from "../components/geography-menu/community-districts";

export default function CommunityDistrictBoroughIdCommunityDistrictIdPath() {
  const { boroughId, communityDistrictId } = useParams();
  if (boroughId === undefined) throw new Error("Failed to provide borough id");
  if (communityDistrictId === undefined)
    throw new Error("Failed to provide community district id");
  const contextData = useOutletContext<
    FindBoroughsQueryResponse & FindCommunityDistrictsByBoroughIdQueryResponse
  >();
  return (
    <>
      <GeographyMenuCommunityDistricts
        activeBoroughId={boroughId}
        boroughs={contextData.boroughs}
        activeCommunityDistrictId={communityDistrictId}
        communityDistricts={contextData.communityDistricts}
      />
      <Outlet context={contextData} />
    </>
  );
}
