import { MVTLayer } from "@deck.gl/geo-layers";
import { useSearchParams } from "react-router";

export interface CityCouncilDistrictProperties {
  layerName: string;
  id: string;
}

export function useCityCouncilDistrictsLayer() {
  const [searchParams] = useSearchParams();
  const districtType = searchParams.get("districtType");

  return new MVTLayer<CityCouncilDistrictProperties>({
    id: "CityCouncilDistricts",
    data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/city-council-districts/{z}/{x}/{y}.pbf`,
    ],
    visible: districtType === "ccd",
    uniqueIdProperty: "boroughIdCityCouncilDistrictId",
    pickable: true,
    getPointRadius: 5,
    filled: false,
    getLineColor: [113, 128, 150, 255],
    getLineWidth: 3,
    lineWidthUnits: "pixels",
    pointType: "text",
    getText: ({ properties }: { properties: CityCouncilDistrictProperties }) =>
      properties.id,
    getTextColor: [98, 98, 98, 255],
    textFontFamily: "Helvetica Neue, Arial, sans-serif",
    getTextSize: 15,
    textFontSettings: {
      sdf: true,
    },
    textOutlineColor: [255, 255, 255, 255],
    textOutlineWidth: 2,
  });
}
