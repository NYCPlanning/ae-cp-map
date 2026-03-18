import { GeoJsonLayer } from "@deck.gl/layers";
import { useSearchParams } from "react-router";
import { FlyToGeoJsonExtension } from "../../extensions";
import { BoroughId, BoundaryId, BoundaryType } from "../../utils/types";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;

export function useCommunityDistrictLayer() {
  const [searchParams] = useSearchParams();
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const boundaryId = searchParams.get("boundaryId") as BoundaryId;
  const hasCommunityDistrict =
    boundaryType === "cd" && boroughId !== null && boundaryId !== null;
  const data = hasCommunityDistrict
    ? `${zoningApiUrl}/api/boroughs/${boroughId}/community-districts/${boundaryId}/geojson`
    : [];

  return new GeoJsonLayer({
    id: "CommunityDistrict",
    data,
    visible: hasCommunityDistrict,
    filled: true,
    getFillColor: [119, 128, 190, 128],
    stroked: true,
    lineWidthUnits: "pixels",
    getLineWidth: 3,
    getLineColor: [48, 66, 100],
    extensions: [new FlyToGeoJsonExtension()],
  });
}
