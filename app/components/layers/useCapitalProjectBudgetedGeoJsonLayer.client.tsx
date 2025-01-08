import { GeoJsonLayer } from "@deck.gl/layers";
import { CapitalProjectBudgetedGeoJson } from "~/gen";
import { useParams } from "@remix-run/react";
import { FlyToGeoJsonExtension } from "../../extensions";

export function useCapitalProjectBudgetedGeoJsonLayer() {
  const { managingCode, capitalProjectId } = useParams();

  return new GeoJsonLayer<CapitalProjectBudgetedGeoJson>({
    id: "capitalProjectBudgetedGeoJson",
    data:
      managingCode === undefined || capitalProjectId === undefined
        ? []
        : `${import.meta.env.VITE_ZONING_API_URL}/api/capital-projects/${managingCode}/${capitalProjectId}/geojson`,
    pickable: false,
    getFillColor: ({ id }) => {
      switch (id) {
        case `${managingCode}${capitalProjectId}`:
          return [56, 178, 172, 166];
        default:
          return [217, 107, 39, 166];
      }
    },
    getPointRadius: 5,
    getLineColor: [255, 255, 255, 255],
    getLineWidth: 1,
    updateTriggers: {
      getFillColor: [managingCode, capitalProjectId],
      getPointColor: [managingCode, capitalProjectId],
    },
    extensions: [new FlyToGeoJsonExtension()],
  });
}
