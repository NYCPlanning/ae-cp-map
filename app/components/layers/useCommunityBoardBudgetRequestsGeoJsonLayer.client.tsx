import { GeoJsonLayer } from "@deck.gl/layers";
import { CommunityBoardBudgetRequestGeoJson } from "~/gen";
import { useParams } from "react-router";
import { FlyToGeoJsonExtension } from "../../extensions";
import { env } from "~/utils/env";
import { CommunityBoardBudgetRequestProperties } from "./useCommunityBoardBudgetRequestsLayer.client";

const { zoningApiUrl } = env;

export function useCommunityBoardBudgetRequestsGeoJsonLayer() {
  const { cbbrId } = useParams();
  const policyAreaIconsMap: Record<number, string> = {
    1: "health",
    2: "education",
    3: "safety",
    4: "infrastructure",
    5: "housing",
    6: "transportation",
    7: "parks",
    8: "other",
  };
  return new GeoJsonLayer<CommunityBoardBudgetRequestGeoJson>({
    id: "communityBoardBudgetRequestsGeoJson",
    data:
      cbbrId === undefined
        ? []
        : `${zoningApiUrl}/api/community-board-budget-requests/${cbbrId}/geojson`,
    pickable: false,
    getFillColor: [43, 108, 176, 255],
    pointType: "icon",
    getIcon: (d: { properties: CommunityBoardBudgetRequestProperties }) => {
      const icon = policyAreaIconsMap[d.properties.policyAreaId];
      return {
        url: `/policy-area-icons/${icon}.svg`,
        width: 40,
        height: 40,
      };
    },
    getLineColor: [255, 255, 255, 255],
    getLineWidth: 1,
    updateTriggers: {
      getFillColor: [cbbrId],
      getPointColor: [cbbrId],
    },
    extensions: [new FlyToGeoJsonExtension()],
  });
}
