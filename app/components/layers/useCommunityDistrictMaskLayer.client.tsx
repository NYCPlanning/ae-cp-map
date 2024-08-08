import { GeoJsonLayer } from "@deck.gl/layers";

export function useCommunityDistrictMaskLayer() {
  return new GeoJsonLayer({
    id: "CommunityDistrictMask",
    data: `${import.meta.env.VITE_ZONING_API_URL}/api/boroughs/2/community-districts/09/geojson`,
    operation: "mask",
  });
}
