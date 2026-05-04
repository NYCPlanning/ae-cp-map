import { env } from "~/utils/env";
import { useSearchParams } from "react-router";
import { BoundaryType } from "~/utils/types";
import { SelectedGeosLayer } from "./SelectedGeosLayer";

const { zoningApiUrl } = env;

export function useSelectedBoroughsLayer() {
  const [searchParams] = useSearchParams();
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boroughIdsString = searchParams.get("boroughIds");
  const hasBorough = boundaryType === "borough" && boroughIdsString !== null;
  if (hasBorough) {
    return new SelectedGeosLayer({
      ids: boroughIdsString?.split(","),
      getDataUrlPath: (id) => `${zoningApiUrl}/api/boroughs/${id}/geojson`,
    });
  }
  return null;
}
