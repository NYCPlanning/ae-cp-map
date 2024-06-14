import { MVTLayer } from "@deck.gl/geo-layers";

export function useCommunityDistrictsLayer() {
  return new MVTLayer({
    id: "community-districts",
    data: `${import.meta.env.VITE_ZONING_API_URL}/api/community-districts/{z}/{x}/{y}.pbf`,
    pickable: true,
    pointType: "text",
    getFillColor: (f) => {
      return [100, 120, 150, 100];
    },
    getLineWidth: () => 20,
    getText: (f: any) => {
      const { abbr, boroughIdCommunityDistrictId } = f.properties;
      return `${abbr}${boroughIdCommunityDistrictId.slice(1, 3)}`;
    },
    getTextSize: 5,
    getTextColor: () => {
      return [10, 15, 20, 255];
    },
  });
}
