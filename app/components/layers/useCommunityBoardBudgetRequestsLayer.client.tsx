import { MVTLayer } from "@deck.gl/geo-layers";
import { useNavigate, useParams, useSearchParams } from "react-router";
import {
  DataFilterExtension,
  DataFilterExtensionProps,
  MaskExtension,
  MaskExtensionProps,
} from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";
import {
  BoroughId,
  CommunityBoardBudgetRequestNeedGroupId,
  CommunityBoardBudgetRequestPolicyAreaId,
  BoundaryId,
  BoundaryType,
} from "../../utils/types";
import { env } from "~/utils/env";
import { CommunityBoardBudgetRequestType } from "~/gen";
import { IconClusterLayer } from "./icon-cluster-layer";
import { ADDRESS_SEARCH_RADIUS } from "~/components/HeaderBar/AddressSearch";
import { useStore } from "~/store";
import { POLICY_AREA_ICONS_MAP } from "~/utils/constants";

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
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const boroughIds = searchParams.get("boroughIds") as BoroughId;
  const boundaryId = searchParams.get("boundaryId") as BoundaryId;
  const cityCouncilDistrictIdsString = searchParams.get(
    "cityCouncilDistrictIds",
  );
  const cityCouncilDistrictIds =
    cityCouncilDistrictIdsString !== null
      ? cityCouncilDistrictIdsString.split(",")
      : boundaryId === null
        ? null
        : [boundaryId];
  const communityDistrictIdsString = searchParams.get(
    "communityDistrictIds",
  ) as string;
  const communityDistrictIds =
    communityDistrictIdsString !== null
      ? communityDistrictIdsString.split(",")
      : boroughId === null || boundaryId === null
        ? null
        : [`${boroughId}${boundaryId}`];
  const cbbrNeedGroupId = searchParams.get(
    "cbbrNeedGroupId",
  ) as CommunityBoardBudgetRequestNeedGroupId;
  const cbbrPolicyAreaId = searchParams.get(
    "cbbrPolicyAreaId",
  ) as CommunityBoardBudgetRequestPolicyAreaId;
  const cbbrAgencyInitials = searchParams.get("cbbrAgencyInitials");
  const cbbrAgencyCategoryResponseCheckboxes = useStore(
    (state) => state.cbbrAgencyCategoryResponseCheckboxes,
  );
  const cbbrAgencyCategoryResponseIds = cbbrAgencyCategoryResponseCheckboxes
    .filter((acr) => acr.checked === true)
    .map((acr) => acr.id);

  const onCapitalProjectsInCityCouncilDistrictPath =
    boundaryType === "ccd" && boundaryId !== null;
  const onCapitalProjectsInCommunityDistrictPath =
    boundaryType === "cd" && boroughId !== null && boundaryId !== null;
  const bufferParam = searchParams.get("radius");
  const buffer = bufferParam === null ? -1 : parseInt(bufferParam);
  const pin = searchParams.get("pin");
  const [lon, lat] =
    pin === null
      ? [undefined, undefined]
      : pin.split(",").map((d) => parseFloat(d));

  const navigate = useNavigate();
  let endpointPrefix = "";
  if (onCapitalProjectsInCityCouncilDistrictPath) {
    endpointPrefix = `city-council-districts/${boundaryId}/`;
  } else if (onCapitalProjectsInCommunityDistrictPath) {
    endpointPrefix = `boroughs/${boroughId}/community-districts/${boundaryId}/`;
  }

  const unclustered: boolean =
    (boundaryId !== null &&
      (boundaryType === "cd" || boundaryType === "ccd")) ||
    (boroughIds !== null && boundaryType === "borough") ||
    (cityCouncilDistrictIds !== null && boundaryType === "ccd") ||
    (communityDistrictIds !== null && boundaryType === "cd") ||
    (buffer >= ADDRESS_SEARCH_RADIUS.MIN &&
      buffer <= ADDRESS_SEARCH_RADIUS.MAX &&
      lon !== undefined &&
      lat !== undefined) ||
    cbbrPolicyAreaId !== null ||
    cbbrNeedGroupId !== null ||
    cbbrAgencyInitials !== null ||
    cbbrAgencyCategoryResponseIds.length < 6;

  return new MVTLayer<
    CommunityBoardBudgetRequestProperties,
    DataFilterExtensionProps<
      Feature<Geometry, CommunityBoardBudgetRequestProperties>
    > &
      MaskExtensionProps
  >({
    id: "communityBoardBudgetRequests",
    data:
      cbbrAgencyCategoryResponseIds.length > 0
        ? [
            `${zoningApiUrl}/api/${endpointPrefix}community-board-budget-requests/{z}/{x}/{y}.pbf`,
          ]
        : null,
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
      getFilterValue: [
        cbbrPolicyAreaId,
        cbbrNeedGroupId,
        cbbrAgencyInitials,
        cbbrAgencyCategoryResponseIds,
      ],
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
        const icon = POLICY_AREA_ICONS_MAP[d.properties.policyAreaId];
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
    getFilterValue: (d) => {
      // Filter out if it does not match one of the user selected filters
      if (
        cbbrPolicyAreaId !== null &&
        d.properties.policyAreaId !== parseInt(cbbrPolicyAreaId)
      )
        return 0;

      if (
        cbbrNeedGroupId !== null &&
        d.properties.needGroupId !== parseInt(cbbrNeedGroupId)
      )
        return 0;

      if (
        cbbrAgencyInitials !== null &&
        d.properties.agencyInitials !== cbbrAgencyInitials
      )
        return 0;

      if (
        cbbrAgencyCategoryResponseIds.length > 0 &&
        !cbbrAgencyCategoryResponseIds.includes(
          parseInt(d.properties.agencyCategoryReponseId),
        )
      )
        return 0;

      // Otherwise, display it
      return 1;
    },
    filterRange: [1, 1],
    _subLayerProps: {
      "points-icon": {
        type: IconClusterLayer<CommunityBoardBudgetRequestProperties>,
        unclustered,
      },
    },
    extensions: [
      new MaskExtension(),
      new DataFilterExtension({
        filterSize: 1,
      }),
    ],
    maskId: `${
      (boundaryId !== null &&
        (boundaryType === "cd" || boundaryType === "ccd")) ||
      (boroughIds !== null && boundaryType === "borough") ||
      (cityCouncilDistrictIds !== null && boundaryType === "ccd") ||
      (communityDistrictIds !== null && boundaryType === "cd") ||
      (buffer >= ADDRESS_SEARCH_RADIUS.MIN &&
        buffer <= ADDRESS_SEARCH_RADIUS.MAX &&
        lon !== undefined &&
        lat !== undefined)
        ? "boundary-mvt"
        : ""
    }`,
    maskByInstance: true, //doesn't seem to have an effect
    maskInverted: false,
  });
}
