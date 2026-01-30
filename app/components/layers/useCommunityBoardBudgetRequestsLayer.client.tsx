import { MVTLayer } from "@deck.gl/geo-layers";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLoaderData,
} from "react-router";
import {
  DataFilterExtension,
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";
import { useState, useMemo } from "react";
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
import { IconClusterLayer } from "./icon-cluster-layer";

const { zoningApiUrl } = env;

export interface CommunityBoardBudgetRequestProperties {
  id: string;
  agencyInitials: string;
  layerName: string;
  policyAreaId: number;
  needGroupId: number;
  agencyCategoryReponseId: string;
  cbbrAgencyCategoryResponseId: string;
  cluster: boolean;
}

export function useCommunityBoardBudgetRequestsLayer(opts: {
  visible?: boolean;
  // hoveredCbbr: string | null;
  // setHoveredOverCbbr: (newHoveredOverCbbr: string | null) => void;
}) {
  const visible = opts.visible ?? true;
  // const hoveredCbbr = opts.hoveredCbbr;
  // console.log("Prop id", { hoveredCbbr });
  // const setHoveredOverCbbr = opts.setHoveredOverCbbr;
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
  const [hoveredCbbr, setHoveredOverCbbr] = useState(null);
  console.log({ hoveredCbbr });

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

  return useMemo(
    () =>
      new MVTLayer<
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
        // uniqueIdProperty: "id",
        // highlightedFeatureId: hoveredCbbr,
        getIconColor: ({ properties }) => {
          const { id } = properties;
          // console.log("getIconColor", { hoveredCbbr, id });
          if (hoveredCbbr === id) {
            console.log("match!");
            return [0, 255, 0, 255];
          } else {
            return [0, 0, 255, 255];
          }
        },
        getFillColor: ({ properties }) => {
          console.log("getFillColor");
          const { id } = properties;
          if (clickInfo.id === id && clickInfo.clicked) {
            return selectedColor;
          } else {
            return defaultColor;
          }
        },
        // onHover: () => {
        //   console.log("hover");
        // },
        // onClick: (data) => {
        //   console.log(data.object.properties.id);
        //   console.log("onClick");
        // },
        onHover: (data) => {
          // console.log({ data });
          // console.log("hover");
          // console.log(data.object);
          // console.log("index: ", data.index);
          if (data.index === -1) {
            console.log("one");
            setHoveredOverCbbr(null);
          } else if (data.object?.properties) {
            const { id } = data.object?.properties;
            console.log("two", id);
            setHoveredOverCbbr(id);
          }
        },
        getIcon: (d: { properties: CommunityBoardBudgetRequestProperties }) => {
          console.log("getIcon");
          if (d.properties.cluster !== true) {
            const icon = policyAreaIconsMap[d.properties.policyAreaId];
            if (
              (clickInfo.id === d.properties.id && clickInfo.clicked) ||
              cbbrId === d.properties.id
            ) {
              return `${icon}-click`;
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
        pointType: "icon",
        // autoHighlight: true,
        // highlightColor: highlightColor,
        getLineColor: [255, 255, 255, 255],
        getLineWidth: 1,
        iconAtlas: `/policy-area-icons/all-icons.png`,
        iconMapping: `/mapping.json`,
        pickable: true,
        updateTriggers: {
          getIcon: [clickInfo.id, cbbrId, hoveredCbbr],
          getIconSize: [clickInfo.id, cbbrId],
          getFillColor: [clickInfo.id, cbbrId],
          // highlightedFeatureId: hoveredCbbr,
          // getIconColor: [hoveredCbbr],
        },
        onClick: (data) => {
          setClickInfo({
            id: data.object?.properties?.id,
            clicked: data.picked,
          });
          console.log("cbbr layer onclick");
          const indvidualCbbrId = data.object?.properties?.id;
          if (indvidualCbbrId === undefined) return;
          if (indvidualCbbrId === `${cbbrId}`) return;
          const cbbrRouteSuffix = `/community-board-budget-requests/${indvidualCbbrId}`;
          navigate({
            pathname: `${cbbrRouteSuffix}`,
            search: `?${searchParams.toString()}`,
          });
        },
        iconSizeScale: 25,
        binary: false,
        getFilterCategory: (d) => {
          const {
            agencyInitials,
            needGroupId,
            policyAreaId,
            agencyCategoryReponseId,
          } = d.properties;

          return [
            agencyInitials,
            needGroupId,
            policyAreaId,
            agencyCategoryReponseId,
          ];
        },
        filterCategories: [
          cbbrAgencyInitials !== null ? [cbbrAgencyInitials] : fullAgencyList,
          cbbrNeedGroupId !== null ? [cbbrNeedGroupId] : fullNeedGroupList,
          cbbrPolicyAreaId !== null ? [cbbrPolicyAreaId] : fullPolicyAreaList,
          cbbrAgencyCategoryResponseIds.length > 0
            ? cbbrAgencyCategoryResponseIds
            : fullAgencyCategoryResponseList,
        ],
        _subLayerProps: {
          "points-icon": {
            type: IconClusterLayer,
            // autoHighlight: true,
            // highlightColor: highlightColor,
            // getIcon: (d: { properties: CommunityBoardBudgetRequestProperties }) => {
            //   if (d.properties.cluster !== true) {
            //     const icon = policyAreaIconsMap[d.properties.policyAreaId];
            //     if (
            //       (clickInfo.id === d.properties.id && clickInfo.clicked) ||
            //       cbbrId === d.properties.id
            //     ) {
            //       return `${icon}-click`;
            //     } else {
            //       return `${icon}`;
            //     }
            //   } else {
            //     const size = d.properties.point_count;
            //     if (size === 0) {
            //       return `marker-1`;
            //     }
            //     if (size < 10) {
            //       return `marker-${size}`;
            //     }
            //     if (size < 150) {
            //       return `marker-${Math.floor(size / 10)}0`;
            //     }
            //     return "marker-150";
            //   }
            // },
            // onHover: (d) => {
            //   // console.log({ data });
            //   // console.log("subLayerProps onHover", { data, hoveredCbbr });
            //   // console.log({ object: d.object });
            //   const id = d.object?.properties.id;
            //   // console.log({ hoveredCbbr, id });
            //   if (!id) {
            //     // console.log("one");
            //     setHoveredOverCbbr(null);
            //   } else if (id) {
            //     // console.log("two");
            //     setHoveredOverCbbr(id);
            //   }
            // },
            // onClick: (data) => {
            //   console.log("cbbr layer onclick");
            //   setClickInfo({
            //     id: data.object?.properties?.id,
            //     clicked: data.picked,
            //   });
            //   const indvidualCbbrId = data.object?.properties?.id;
            //   if (indvidualCbbrId === undefined) return;
            //   if (indvidualCbbrId === `${cbbrId}`) return;
            //   const cbbrRouteSuffix = `/community-board-budget-requests/${indvidualCbbrId}`;
            //   navigate({
            //     pathname: `${cbbrRouteSuffix}`,
            //     search: `?${searchParams.toString()}`,
            //   });
            // },
            getSize: (d) => {
              if (d.properties.cluster !== true) {
                if (clickInfo.id === d.properties.id && clickInfo.clicked) {
                  return 1.2;
                } else {
                  return 1;
                }
              } else {
                return Math.min(150, d.properties.point_count) / 100 + 1;
              }
            },
          },
        },
        extensions: [
          new DataFilterExtension({
            categorySize: 4,
          }),
        ],
      }),
    [hoveredCbbr, clickInfo.id],
  );
}
