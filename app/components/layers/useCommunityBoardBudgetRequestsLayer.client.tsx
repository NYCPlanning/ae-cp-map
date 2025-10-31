import { MVTLayer } from "@deck.gl/geo-layers";
import { useSearchParams } from "react-router";
import { DataFilterExtensionProps } from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";
import { BoroughId, DistrictId, DistrictType } from "../../utils/types";

export interface CommunityBoardBudgetRequestProperties {
  id: string;
  agencyInitials: string;
  layerName: string;
}

export function useCommunityBoardBudgetRequestsLayer(opts?: {
  visible?: boolean;
}) {
  const visible = opts?.visible ?? true;
  const [searchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;
  const onCapitalProjectsInCityCouncilDistrictPath =
    districtType === "ccd" && districtId !== null;
  const onCapitalProjectsInCommunityDistrictPath =
    districtType === "cd" && boroughId !== null && districtId !== null;

  let endpointPrefix = "";
  if (onCapitalProjectsInCityCouncilDistrictPath) {
    endpointPrefix = `city-council-districts/${districtId}/`;
  } else if (onCapitalProjectsInCommunityDistrictPath) {
    endpointPrefix = `boroughs/${boroughId}/community-districts/${districtId}/`;
  }

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

  return new MVTLayer<
    CommunityBoardBudgetRequestProperties,
    DataFilterExtensionProps<
      Feature<Geometry, CommunityBoardBudgetRequestProperties>
    >
  >({
    id: "communityBoardBudgetRequests",
    data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/${endpointPrefix}community-board-budget-requests/{z}/{x}/{y}.pbf`,
    ],
    uniqueIdProperty: "id",
    visible,
    pickable: true,
    getFillColor: [43, 108, 176, 166],
    pointType: "icon",
    getIcon: (d: any) => {
      const icon = policyAreaIconsMap[d.properties.policyAreaId];
      return {
        url: `/policy-area-icons/${icon}.svg`,
        width: 40,
        height: 40,
      };
    },
    iconSizeScale: 1,
    iconSizeMinPixels: 24,
    iconSizeMaxPixels: 24,
  });
}
