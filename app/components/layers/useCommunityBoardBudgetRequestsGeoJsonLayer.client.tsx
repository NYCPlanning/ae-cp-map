import { GeoJsonLayer } from "@deck.gl/layers";
import { CommunityBoardBudgetRequestGeoJson } from "~/gen";
import { useParams } from "react-router";
import { FlyToGeoJsonExtension } from "../../extensions";
import { env } from "~/utils/env";
import { POLICY_AREA_ICONS_MAP } from "~/utils/constants";

const { zoningApiUrl } = env;

export interface CommunityBoardBudgetRequestProperties {
  agencyInitials: string;
  cbbrAgencyCategoryResponseId: number;
  cbbrAgencyResponse: string;
  cbbrPolicyAreaId: number;
  cbbrType: string;
  communityBoardId: string;
  description: string;
  id: string;
  isContinuedSupport: boolean;
  isMapped: boolean;
  priority: number;
  title: string;
}

export function useCommunityBoardBudgetRequestsGeoJsonLayer() {
  const { cbbrId } = useParams();

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
      const icon = POLICY_AREA_ICONS_MAP[d.properties.cbbrPolicyAreaId];
      return `${icon}-click`;
    },
    iconAtlas: `/policy-area-icons/all-icons.png`,
    iconMapping: `/mapping.json`,
    getIconSize: 30,
    iconSizeMinPixels: 24,
    iconSizeMaxPixels: 30,
    getLineColor: [255, 255, 255, 255],
    getLineWidth: 1,
    updateTriggers: {
      getFillColor: [cbbrId],
      getPointColor: [cbbrId],
    },
    extensions: [new FlyToGeoJsonExtension()],
  });
}
