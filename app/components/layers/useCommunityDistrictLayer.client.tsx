import { GeoJsonLayer } from "@deck.gl/layers";
import { useParams } from "@remix-run/react";

export function useCommunityDistrictLayer() {
  const { boroughId, communityDistrictId } = useParams();
  const hasCommunityDistrict =
    boroughId !== undefined && communityDistrictId !== undefined;
  const data = hasCommunityDistrict
    ? `${import.meta.env.VITE_ZONING_API_URL}/api/boroughs/${boroughId}/community-districts/${communityDistrictId}/geojson`
    : [];

  return new GeoJsonLayer({
    id: "CommunityDistrict",
    data,
    visible: hasCommunityDistrict,
    filled: false,
    stroked: true,
    lineWidthUnits: "pixels",
    getLineWidth: 3,
    getLineColor: [49, 151, 149],
  });
}
