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
import { CommunityBoardBudgetRequestType } from "~/gen";
import { IconClusterLayer } from "./icon-cluster-layer";

const { zoningApiUrl } = env;

export type CommunityBoardBudgetRequestProperties = {
  id: string;
  agencyInitials: string;
  layerName: string;
  policyAreaId: number;
  needGroupId: number;
  agencyCategoryReponseId: string;
  cbbrAgencyCategoryResponseId: string;
  requestType: CommunityBoardBudgetRequestType;
  cluster: boolean;
  point_count: number;
};

export function useCommunityBoardBudgetRequestsLayer(opts: {
  visible?: boolean;
  hoveredCbbr: string | null;
  setHoveredOverCbbr: (newHoveredOverCbbr: string | null) => void;
  onClusterClick: (zoom: number, latitude: number, longitude: number) => void;
}) {
  const visible = opts.visible ?? true;
  const hoveredCbbr = opts.hoveredCbbr;
  const setHoveredOverCbbr = opts.setHoveredOverCbbr;
  const onClusterClick = opts.onClusterClick;
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
    ? loaderData.cbbrPolicyAreas.map((data) => `Capital-${data.id}`)
    : [];

  const fullAgencyCategoryResponseList = loaderData.cbbrAgencyCategoryResponses
    ? loaderData.cbbrAgencyCategoryResponses.map((data) => data.id)
    : [];

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
    getFillColor: ({ properties }) => {
      if (properties.id === hoveredCbbr) {
        return [43, 108, 176, 100];
      } else {
        return [43, 108, 176, 153];
      }
    },
    pointType: "icon",
    getLineColor: [255, 255, 255, 255],
    getLineWidth: 1,
    iconAtlas: `/policy-area-icons/all-icons.png`,
    iconMapping: `/mapping.json`,
    pickable: true,
    updateTriggers: {
      getFillColor: [hoveredCbbr],
      getIcon: [cbbrId],
      getIconSize: [cbbrId],
      getIconColor: [hoveredCbbr],
    },
    onHover: (info) => {
      if (info.index === -1) {
        setHoveredOverCbbr(null);
      } else {
        setHoveredOverCbbr(info.object?.properties?.id ?? null);
      }
    },
    onClick: (data) => {
      if (data.object.properties.cluster !== true) {
        const individualCbbrId = data.object?.properties?.id;
        if (individualCbbrId === undefined) return;
        if (individualCbbrId === `${cbbrId}`) return;
        const cbbrRouteSuffix = `/community-board-budget-requests/${individualCbbrId}`;
        navigate({
          pathname: `${cbbrRouteSuffix}`,
          search: `?${searchParams.toString()}`,
        });
      } else {
        onClusterClick(
          data.object.properties.expansionZoom,
          data.object.geometry.coordinates[1],
          data.object.geometry.coordinates[0],
        );
      }
    },
    iconSizeScale: 25,
    binary: false,
    getIcon: (d: { properties: CommunityBoardBudgetRequestProperties }) => {
      if (d.properties.cluster !== true) {
        const icon = policyAreaIconsMap[d.properties.policyAreaId];
        if (cbbrId === d.properties.id) {
          return null;
        } else {
          return `${icon}`;
        }
      } else {
        const size = d.properties.point_count;
        if (size === 0) {
          return `marker-1`;
        }
        if (size < 10) {
          return `marker-${size}`;
        }
        if (size < 150) {
          return `marker-${Math.floor(size / 10)}0`;
        }
        return "marker-150";
      }
    },
    getIconSize: (d: { properties: CommunityBoardBudgetRequestProperties }) => {
      if (d.properties.cluster !== true) {
        if (cbbrId === d.properties.id) {
          return 1.2;
        } else {
          return 1;
        }
      } else {
        return Math.min(150, d.properties.point_count) / 100 + 1;
      }
    },
    getIconColor: (d: {
      properties: CommunityBoardBudgetRequestProperties;
    }) => {
      if (d.properties.id === hoveredCbbr) {
        return [255, 255, 255, 200];
      } else {
        return [43, 108, 176, 255];
      }
    },
    getFilterCategory: (d) => {
      const {
        agencyInitials,
        needGroupId,
        policyAreaId,
        agencyCategoryReponseId,
        requestType,
      } = d.properties;
      return [
        agencyInitials,
        needGroupId,
        `${requestType}-${policyAreaId}`,
        agencyCategoryReponseId,
      ];
    },
    filterCategories: [
      cbbrAgencyInitials !== null ? [cbbrAgencyInitials] : fullAgencyList,
      cbbrNeedGroupId !== null ? [cbbrNeedGroupId] : fullNeedGroupList,
      cbbrPolicyAreaId !== null
        ? [`Capital-${cbbrPolicyAreaId}`]
        : fullPolicyAreaList,
      cbbrAgencyCategoryResponseIds.length > 0
        ? cbbrAgencyCategoryResponseIds
        : fullAgencyCategoryResponseList,
    ],
    _subLayerProps: {
      "points-icon": {
        type: IconClusterLayer<CommunityBoardBudgetRequestProperties>,
      },
    },
    extensions: [
      new DataFilterExtension({
        categorySize: 4,
      }),
    ],
  });
}
