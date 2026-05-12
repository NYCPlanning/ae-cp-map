import { env } from "~/utils/env";
import { useSearchParams } from "react-router";
import { BoundaryId, BoundaryType } from "../../utils/types";
import { SelectedGeosLayer } from "./SelectedGeosLayer";

const { zoningApiUrl } = env;

export function useSelectedCityCouncilDistrictsLayer() {
  const [searchParams] = useSearchParams();
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boundaryId = searchParams.get("boundaryId") as BoundaryId;
  const cityCouncilDistrictIds = searchParams.get(
    "cityCouncilDistrictIds",
  ) as string;
  const hasCityCouncilDistrict =
    boundaryType === "ccd" &&
    (boundaryId !== null || cityCouncilDistrictIds !== null);
  if (hasCityCouncilDistrict) {
    return new SelectedGeosLayer({
      ids:
        boundaryId === null ? cityCouncilDistrictIds?.split(",") : [boundaryId],
      getDataUrlPath: (id) =>
        `${zoningApiUrl}/api/city-council-districts/${id}/geojson`,
    });
  }
  return null;
}
