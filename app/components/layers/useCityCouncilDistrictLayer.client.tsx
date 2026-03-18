import { GeoJsonLayer } from "@deck.gl/layers";
import { useSearchParams } from "react-router";
import { FlyToGeoJsonExtension } from "../../extensions";
import { BoundaryId, BoundaryType } from "../../utils/types";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;

export function useCityCouncilDistrictLayer() {
  const [searchParams] = useSearchParams();
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boundaryId = searchParams.get("boundaryId") as BoundaryId;
  const hasCityCouncilDistrict = boundaryType === "ccd" && boundaryId !== null;
  const data = hasCityCouncilDistrict
    ? `${zoningApiUrl}/api/city-council-districts/${boundaryId}/geojson`
    : [];

  return new GeoJsonLayer({
    id: "CityCouncilDistrict",
    data,
    visible: hasCityCouncilDistrict,
    filled: true,
    getFillColor: [119, 128, 190, 128],
    stroked: true,
    lineWidthUnits: "pixels",
    getLineWidth: 3,
    getLineColor: [48, 66, 100],
    extensions: [new FlyToGeoJsonExtension()],
  });
}
