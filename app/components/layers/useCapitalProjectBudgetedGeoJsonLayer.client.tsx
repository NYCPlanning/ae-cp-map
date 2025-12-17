import { GeoJsonLayer } from "@deck.gl/layers";
import { CapitalProjectBudgetedGeoJson } from "~/gen";
import { useParams } from "react-router";
import { FlyToGeoJsonExtension } from "../../extensions";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;

export function useCapitalProjectBudgetedGeoJsonLayer() {
  const { managingCode, capitalProjectId } = useParams();

  return new GeoJsonLayer<CapitalProjectBudgetedGeoJson>({
    id: "capitalProjectBudgetedGeoJson",
    data:
      managingCode === undefined || capitalProjectId === undefined
        ? []
        : `${zoningApiUrl}/api/capital-projects/${managingCode}/${capitalProjectId}/geojson`,
    pickable: false,
    getFillColor: [56, 178, 172, 166],
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
