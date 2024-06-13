import { MVTLayer } from "@deck.gl/geo-layers";

export function useCommunityDistrictsLayer() {
  return new MVTLayer({
    id: "community-districts",
    data: `${import.meta.env.VITE_ZONING_API_URL}/api/community-districts/{z}/{x}/{y}.pbf`,
    getFillColor: () => [200, 200, 200, 200],
    getPointRadius: () => 7,
  });
}
