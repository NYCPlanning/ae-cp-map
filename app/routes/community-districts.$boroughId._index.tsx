import { useOutletContext, useParams } from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "../gen";
import { GeographyMenuCommunityDistricts } from "../components/geography-menu/community-districts";

export default function CommunityDistrictBoroughIdPath() {
  const { boroughId } = useParams<{ boroughId: string }>();
  if (boroughId === undefined) throw new Error("failed to provide borough id");
  const contextData = useOutletContext<
    FindBoroughsQueryResponse & FindCommunityDistrictsByBoroughIdQueryResponse
  >();
  return (
    <GeographyMenuCommunityDistricts
      activeBoroughId={boroughId}
      boroughs={contextData.boroughs}
      communityDistricts={contextData.communityDistricts}
    />
  );
}
