import { GeoJsonLayer } from "@deck.gl/layers";
import { useParams } from "@remix-run/react";

export function useCityCouncilDistrictLayer() {
  const { cityCouncilDistrictId } = useParams();
  const hasCityCouncilDistrict = cityCouncilDistrictId !== undefined;
  const data = hasCityCouncilDistrict
    ? `${import.meta.env.VITE_ZONING_API_URL}/api/city-council-districts/${cityCouncilDistrictId}/geojson`
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
  });
}
