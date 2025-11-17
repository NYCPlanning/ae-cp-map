import { MVTLayer } from "@deck.gl/geo-layers";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { DataFilterExtensionProps } from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";
import { BoroughId, DistrictId, DistrictType } from "../../utils/types";
import { useState } from "react";

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
  const [hoverInfo, setHoverInfo] = useState({ id: "", hovered: false });
  const [clickInfo, setClickInfo] = useState({ id: "", clicked: false });

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
    getFillColor: [43, 108, 176, 166],
    pointType: "icon",
    getIconSize: (d) => {
      if (
        (hoverInfo.id === d.properties.id && hoverInfo.hovered) ||
        (clickInfo.id === d.properties.id && clickInfo.clicked)
      ) {
        return 27;
      } else {
        return 25;
      }
    },
    getIcon: (d: { properties: CommunityBoardBudgetRequestProperties }) => {
      const icon = policyAreaIconsMap[d.properties.policyAreaId];
      if (hoverInfo.id === d.properties.id && hoverInfo.hovered) {
        return `${icon}-hover`;
      } else if (clickInfo.id === d.properties.id && clickInfo.clicked) {
        return `${icon}-click`;
      } else {
        return `${icon}`;
      }
    },
    iconAtlas: `/policy-area-icons/all-icons.png`,
    iconMapping: `/mapping.json`,
    pickable: true,
    onHover: (info, event) => {
      setHoverInfo({ id: info.object?.properties?.id, hovered: info.picked });
    },
    updateTriggers: {
      getIcon: [hoverInfo.id, clickInfo.id],
      getIconSize: [hoverInfo.id, clickInfo.id],
    },
    onClick: (data) => {
      setClickInfo({ id: data.object?.properties?.id, clicked: data.picked });

      const indvidualCbbrId = data.object?.properties?.id;
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
