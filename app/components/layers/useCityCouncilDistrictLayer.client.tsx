import { GeoJsonLayer } from "@deck.gl/layers";
import { useSearchParams } from "react-router";
import { FlyToGeoJsonExtension } from "../../extensions";
import { BoroughId, DistrictId, DistrictType } from "../../utils/types";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;

export function useCityCouncilDistrictLayer() {
  const [searchParams] = useSearchParams();
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const hasBorough = boroughId !== null;
  const data = hasBorough
    ? `${zoningApiUrl}/api/boroughs/${boroughId}/geojson`
    : [];

  return new GeoJsonLayer({
    id: "Borough",
    data,
    visible: hasBorough,
    filled: false,
    stroked: true,
    lineWidthUnits: "pixels",
    getLineWidth: 3,
    getLineColor: [49, 151, 149],
    extensions: [new FlyToGeoJsonExtension()],
  });
}
