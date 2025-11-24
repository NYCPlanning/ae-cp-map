import { MVTLayer } from "@deck.gl/geo-layers";
import {
  useNavigate,
  useParams,
  useLoaderData,
  useSearchParams,
} from "react-router";
import {
  DataFilterExtension,
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";
import { useState } from "react";
import { Accessor, Color } from "@deck.gl/core";
import {
  BoroughId,
  CommunityBoardBudgetRequestAgencyCategoryResponseId,
  CommunityBoardBudgetRequestNeedGroupId,
  CommunityBoardBudgetRequestPolicyAreaId,
  DistrictId,
  DistrictType,
} from "../../utils/types";
import { loader as mapPageLoader } from "../../layouts/MapPage";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;

export interface CommunityBoardBudgetRequestProperties {
  id: string;
  agencyInitials: string;
  layerName: string;
  policyAreaId: number;
  needGroupId: number;
  agencyCategoryReponseId: string;
  cbbrAgencyCategoryResponseId: string;
}

export function useCommunityBoardBudgetRequestsLayer(opts: {
  visible?: boolean;
  hoveredCbbr: string | null;
  setHoveredOverCbbr: (newHoveredOverCbbr: string | null) => void;
}) {
  const visible = opts.visible ?? true;
  const hoveredCbbr = opts.hoveredCbbr;
  const setHoveredOverCbbr = opts.setHoveredOverCbbr;
  const { cbbrId } = useParams();
  const [searchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;
  const cbbrNeedGroupId = searchParams.get(
    "cbbrNeedGroupIds",
  ) as CommunityBoardBudgetRequestNeedGroupId;
  const cbbrPolicyAreaId = searchParams.get(
    "cbbrPolicyAreaId",
  ) as CommunityBoardBudgetRequestPolicyAreaId;
  const cbbrAgencyInitials = searchParams.get("cbbrAgencyInitials");
  const cbbrAgencyCategoryResponseIdsParam = searchParams.get(
    "cbbrAgencyCategoryResponseIds",
  ) as CommunityBoardBudgetRequestAgencyCategoryResponseId;
  const cbbrAgencyCategoryResponseIds =
    cbbrAgencyCategoryResponseIdsParam === null
      ? []
      : cbbrAgencyCategoryResponseIdsParam.split(",").map((id) => parseInt(id));

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
  const loaderData = useLoaderData<typeof mapPageLoader>();

  const fullAgencyList = loaderData.cbbrAgencies
    ? loaderData.cbbrAgencies.map((data) => data.initials)
    : [];

  const fullNeedGroupList = loaderData.cbbrNeedGroups
    ? loaderData.cbbrNeedGroups.map((data) => data.id)
    : [];

  const fullPolicyAreaList = loaderData.cbbrPolicyAreas
    ? loaderData.cbbrPolicyAreas.map((data) => data.id)
    : [];

  const fullAgencyCategoryResponseList = loaderData.cbbrAgencyCategoryResponses
    ? loaderData.cbbrAgencyCategoryResponses.map((data) => data.id)
    : [];

  const [clickInfo, setClickInfo] = useState({ id: "", clicked: false });

  const defaultColor: Accessor<
    Feature<Geometry, CommunityBoardBudgetRequestProperties>,
    Color
  > = [43, 108, 176, 153];
  const selectedColor: Accessor<
    Feature<Geometry, CommunityBoardBudgetRequestProperties>,
    Color
  > = [43, 108, 176, 255];
  const highlightColor: Accessor<
    Feature<Geometry, CommunityBoardBudgetRequestProperties>,
    Color
  > = [255, 255, 255, 100];

  return new MVTLayer<
    CommunityBoardBudgetRequestProperties,
    DataFilterExtensionProps<
      Feature<Geometry, CommunityBoardBudgetRequestProperties>
    >
  >({
    id: "communityBoardBudgetRequests",
    data: [
      `${zoningApiUrl}/api/${endpointPrefix}community-board-budget-requests/{z}/{x}/{y}.pbf`,
    ],
    visible,
    uniqueIdProperty: "id",
    highlightedFeatureId: hoveredCbbr,
    getFillColor: ({ properties }) => {
      const { id } = properties;
      if (clickInfo.id === id && clickInfo.clicked) {
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
    autoHighlight: true,
    highlightColor: highlightColor,
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
      highlightedFeatureId: [hoveredCbbr],
    },
    onHover: (data) => {
      const id = data.object?.properties;
      if (data.index === -1) {
        setHoveredOverCbbr(null);
      } else if (id) {
        setHoveredOverCbbr(id);
      }
    },
    onClick: (data) => {
      setClickInfo({ id: data.object?.properties?.id, clicked: data.picked });
      const indvidualCbbrId = data.object?.properties?.id;
      if (indvidualCbbrId === undefined) return;
      if (indvidualCbbrId === `${cbbrId}`) return;
      const cbbrRouteSuffix = `/community-board-budget-requests/${indvidualCbbrId}`;
      navigate({
        pathname: `${cbbrRouteSuffix}`,
        search: `?${searchParams.toString()}`,
      });
    },
    iconSizeScale: 1,
    iconSizeMinPixels: 24,
    iconSizeMaxPixels: 24,
    getFilterCategory: (d) => {
      const {
        agencyInitials,
        needGroupId,
        policyAreaId,
        agencyCategoryReponseId,
        layerName,
      } = d.properties;

      return [
        agencyInitials,
        needGroupId,
        policyAreaId,
        agencyCategoryReponseId,
        layerName,
      ];
    },
    filterCategories: [
      cbbrAgencyInitials !== null ? [cbbrAgencyInitials] : fullAgencyList,
      cbbrNeedGroupId !== null ? [cbbrNeedGroupId] : fullNeedGroupList,
      cbbrPolicyAreaId !== null ? [cbbrPolicyAreaId] : fullPolicyAreaList,
      cbbrAgencyCategoryResponseIds.length > 0
        ? cbbrAgencyCategoryResponseIds
        : fullAgencyCategoryResponseList,
      ["community-board-budget-request-fill"],
    ],
    extensions: [
      new DataFilterExtension({
        categorySize: 5,
      }),
    ],
  });
}
