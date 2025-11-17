import { MVTLayer } from "@deck.gl/geo-layers";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { DataFilterExtensionProps } from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";
import { BoroughId, DistrictId, DistrictType } from "../../utils/types";
import { useState } from "react";
import { Accessor, Color } from "@deck.gl/core";

export interface CommunityBoardBudgetRequestProperties {
  id: string;
  agencyInitials: string;
  layerName: string;
  policyAreaId: number;
}

export function useCommunityBoardBudgetRequestsLayer(opts?: {
  visible?: boolean;
}) {
  const visible = opts?.visible ?? true;
  const { cbbrId } = useParams();
  const [searchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;
  const onCapitalProjectsInCityCouncilDistrictPath =
    districtType === "ccd" && districtId !== null;
  const onCapitalProjectsInCommunityDistrictPath =
    districtType === "cd" && boroughId !== null && districtId !== null;

  const navigate = useNavigate();
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

  const [clickInfo, setClickInfo] = useState({ id: "", clicked: false });

  const defaultColor: Accessor<
    Feature<Geometry, CommunityBoardBudgetRequestProperties>,
    Color
  > = [43, 108, 176, 153];
  const selectedColor: Accessor<
    Feature<Geometry, CommunityBoardBudgetRequestProperties>,
    Color
  > = [43, 108, 176, 255];

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
    visible,
    uniqueIdProperty: "id",
    getFillColor: (d) => {
      if (clickInfo.id === d.properties.id && clickInfo.clicked) {
        return selectedColor;
      } else {
        return defaultColor;
      }
    },
    pointType: "icon",
    getIconSize: (d) => {
      if (clickInfo.id === d.properties.id && clickInfo.clicked) {
        return 30;
      } else {
        return 25;
      }
    },
    getLineColor: [255, 255, 255, 255],
    getLineWidth: 1,
    getIcon: (d: { properties: CommunityBoardBudgetRequestProperties }) => {
      const icon = policyAreaIconsMap[d.properties.policyAreaId];
      if (
        (clickInfo.id === d.properties.id && clickInfo.clicked) ||
        cbbrId === d.properties.id
      ) {
        return `${icon}-click`;
      } else {
        return `${icon}`;
      }
    },
    iconAtlas: `/policy-area-icons/all-icons.png`,
    iconMapping: `/mapping.json`,
    pickable: true,
    updateTriggers: {
      getIcon: [clickInfo.id, cbbrId],
      getIconSize: [clickInfo.id, cbbrId],
      getFillColor: [clickInfo.id, cbbrId],
    },
    onClick: (d) => {
      setClickInfo({ id: d.object?.properties?.id, clicked: d.picked });

      const indvidualCbbrId = d.object?.properties?.id;
      if (indvidualCbbrId === undefined) return;
      if (indvidualCbbrId === `${cbbrId}`) return;
      const cbbrRouteSuffix = `/community-board-budget-requests/${indvidualCbbrId}`;
      navigate({
        pathname: `${endpointPrefix}${cbbrRouteSuffix}`,
        search: `?${searchParams.toString()}`,
      });
    },
  });
}
