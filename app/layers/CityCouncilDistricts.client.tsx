import { MVTLayer } from "@deck.gl/geo-layers";

export function useCityCouncilDistrictsLayer() {
  return new MVTLayer({
    id: "city-council-districts",
    data: `${import.meta.env.VITE_ZONING_API_URL}/api/city-council-districts/{z}/{x}/{y}.pbf`,
    pickable: true,
    pointType: "text",
    getFillColor: (f) => {
      return [150, 120, 100, 100];
    },
    getLineWidth: () => 20,
    getText: (f: any) => {
      return `CCD ${f.properties.id}`;
    },
    getTextSize: 10,
    getTextColor: () => {
      return [10, 15, 20, 255];
    },
  });
}
