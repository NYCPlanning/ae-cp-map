import { MVTLayer } from "@deck.gl/geo-layers";
import { useSearchParams } from "react-router";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;
export interface CityCouncilDistrictProperties {
  layerName: string;
  id: string;
}

export function useCityCouncilDistrictsOutlinesLayer() {
  const [searchParams] = useSearchParams();
  const boundaryType = searchParams.get("boundaryType");

  return new MVTLayer<CityCouncilDistrictProperties>({
    id: "CityCouncilDistrictsOutlines",
    data: [`${zoningApiUrl}/api/city-council-districts/{z}/{x}/{y}.pbf`],
    visible: boundaryType === "ccd",
    uniqueIdProperty: "cityCouncilDistrictId",
    pickable: false,
    getLineColor: [113, 128, 150, 255],
    getLineWidth: 1,
    lineWidthUnits: "pixels",
    pointType: "text",
    getFillColor: [0, 0, 0, 0],
    autoHighlight: true,
    highlightColor: [0, 0, 0, 0],
  });
}
