import { GeoJsonLayer } from "@deck.gl/layers";
import { useSearchParams } from "react-router";
import { FlyToGeoJsonExtension } from "../../extensions";
import { BoroughId, DistrictId, DistrictType } from "../../utils/types";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;

export function useCommunityDistrictLayer() {
  const [searchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;
  const hasCommunityDistrict =
    districtType === "cd" && boroughId !== null && districtId !== null;
  const data = hasCommunityDistrict
    ? `${zoningApiUrl}/api/boroughs/${boroughId}/community-districts/${districtId}/geojson`
    : [];

  return new GeoJsonLayer({
    id: "CommunityDistrict",
    data,
    visible: hasCommunityDistrict,
    filled: false,
    stroked: true,
    lineWidthUnits: "pixels",
    getLineWidth: 3,
    getLineColor: [49, 151, 149],
    extensions: [new FlyToGeoJsonExtension()],
  });
}
