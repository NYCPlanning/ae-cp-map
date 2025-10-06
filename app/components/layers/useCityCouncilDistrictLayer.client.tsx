import { GeoJsonLayer } from "@deck.gl/layers";
import { useSearchParams } from "react-router";
import { FlyToGeoJsonExtension } from "../../extensions";
import { DistrictId, DistrictType } from "../../utils/types";

export function useCityCouncilDistrictLayer() {
  const [searchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const districtId = searchParams.get("districtId") as DistrictId;
  const hasCityCouncilDistrict = districtType === "ccd" && districtId !== null;
  const data = hasCityCouncilDistrict
    ? `${import.meta.env.VITE_ZONING_API_URL}/api/city-council-districts/${districtId}/geojson`
    : [];

  return new GeoJsonLayer({
    id: "CityCouncilDistrict",
    data,
    visible: hasCityCouncilDistrict,
    filled: false,
    stroked: true,
    lineWidthUnits: "pixels",
    getLineWidth: 3,
    getLineColor: [49, 151, 149],
    extensions: [new FlyToGeoJsonExtension()],
  });
}
