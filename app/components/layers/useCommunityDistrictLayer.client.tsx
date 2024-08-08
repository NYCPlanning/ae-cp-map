import { GeoJsonLayer } from "@deck.gl/layers";

export function useCommunityDistrictLayer() {
  return new GeoJsonLayer({
    id: "CommunityDistrict",
    // data: `${import.meta.env.VITE_ZONING_API_URL}/api/boroughs/4/community-districts/01/geojson`,
    data: JSON.stringify({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-74.0008, 40.7018],
      },
    }),
    visible: true,
    stroked: true,
    getLineWidth: 20,
    filled: false,
  });
}
