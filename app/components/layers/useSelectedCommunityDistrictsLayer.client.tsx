import { env } from "~/utils/env";
import { useSearchParams } from "react-router";
import { BoroughId, BoundaryId, BoundaryType } from "../../utils/types";
import { SelectedGeosLayer } from "./SelectedGeosLayer";

const { zoningApiUrl } = env;

export function useSelectedCommunityDistrictsLayer() {
  const [searchParams] = useSearchParams();
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const boundaryId = searchParams.get("boundaryId") as BoundaryId;
  const communityDistrictIds = searchParams.get(
    "communityDistrictIds",
  ) as string;
  const hasCommunityDistrict =
    boundaryType === "cd" &&
    ((boroughId !== null && boundaryId !== null) ||
      communityDistrictIds !== null);

  if (hasCommunityDistrict) {
    return new SelectedGeosLayer({
      ids:
        boundaryId === null
          ? communityDistrictIds?.split(",")
          : [`${boroughId}${boundaryId}`],
      getDataUrlPath: (id) =>
        `${zoningApiUrl}/api/boroughs/${id[0]}/community-districts/${id[1]}${id[2]}/geojson`,
    });
  }
  return null;
}
