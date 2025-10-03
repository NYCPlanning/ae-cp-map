import { GeoJsonLayer } from "@deck.gl/layers";
import { useSearchParams } from "react-router";
import { FlyToGeoJsonExtension } from "../../extensions";
import { BoroughId, DistrictId } from "../../utils/types";

export function useCommunityDistrictLayer() {
  const [searchParams] = useSearchParams();
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;
  const hasCommunityDistrict = boroughId !== null && districtId !== null;
  const data = hasCommunityDistrict
    ? `${import.meta.env.VITE_ZONING_API_URL}/api/boroughs/${boroughId}/community-districts/${districtId}/geojson`
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
