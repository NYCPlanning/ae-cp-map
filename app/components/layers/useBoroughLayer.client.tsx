import { useSearchParams } from "react-router";
import { BoundaryType, BoroughId } from "~/utils/types";
import { env } from "~/utils/env";
import { GeoJsonLayer } from "@deck.gl/layers";
import { FlyToGeoJsonExtension } from "~/extensions";

const { zoningApiUrl } = env;

export function useBoroughLayer() {
  const [searchParams] = useSearchParams();
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boroughIds = searchParams.get("boroughIds") as BoroughId;
  const hasBorough = boundaryType === "borough" && boroughIds !== null;
  const data = hasBorough
    ? `${zoningApiUrl}/api/boroughs/${boroughIds}/geojson`
    : [];

  return new GeoJsonLayer({
    id: "Borough",
    data,
    visible: hasBorough,
    filled: true,
    getFillColor: [119, 128, 190, 128],
    stroked: true,
    lineWidthUnits: "pixels",
    getLineWidth: 3,
    getLineColor: [48, 66, 100],
    extensions: [new FlyToGeoJsonExtension()],
  });
}
