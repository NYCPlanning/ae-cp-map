import { useOutletContext } from "@remix-run/react";
import { FindBoroughsQueryResponse } from "../gen";
import { GeographyMenuCommunityDistricts } from "../components/geography-menu/community-districts";

export default function CommunityDistrictDefaultPath() {
  const contextData = useOutletContext<FindBoroughsQueryResponse>();
  return <GeographyMenuCommunityDistricts boroughs={contextData.boroughs} />;
}
