import { MVTLayer } from "@deck.gl/geo-layers";
import { useState } from "react";
import { useRouteLoaderData } from "react-router";
import { useUpdateSearchParams } from "~/utils/utils";
import {
  SupportingLayerSliceProps,
  HousingLayerQueryParams,
} from "~/utils/types";
import { env } from "~/utils/env";
import { HOUSING_GROWTH_LAYERS } from "~/utils/constants";
import { useStore } from "~/store";
import type { Borough } from "~/gen";

const { zoningApiUrl } = env;

interface HousingGrowthDataProperties {
  unitsCurrent: number;
  completedUnitsPrevious10Years: number;
  projectedCompletedUnitsNext10Years: number;
}
export interface HousingGrowthProperties extends HousingGrowthDataProperties {
  id: string;
  layerName: string;
  abbr: string | null;
  boroughId: string;
  label?: string;
}

const geoUrlMap = new Map<HousingLayerQueryParams["housingData"], string>([
  ["cd", "community-districts"],
  ["nta", "neighborhood-tabulation-areas"],
  ["boro", "boroughs"],
]);

const rangeVariableMap = new Map<
  HousingLayerQueryParams["housingRange"],
  keyof HousingGrowthDataProperties
>([
  ["past", "completedUnitsPrevious10Years"],
  ["current", "unitsCurrent"],
  ["projected", "projectedCompletedUnitsNext10Years"],
]);

// type HousingLayerQueryParams["housingData"] = "cd" | "nta" | "boro";
// type HousingLayerQueryParams["housingRange"] = "past" | "current" | "projected";

export function useHousingGrowthLayer() {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  // const [hoveredItemId, setHoveredItemId] = useState<string | undefined>();

  const {
    hoveredItemId,
    setHoveredItemId,
    setHousingLayerMapTooltip,
    // housingLayerMapTooltip
  } = useStore((state) => state);

  // const setHousingLayerMapTooltip = useStore(
  //   (state) => state.setHousingLayerMapTooltip,
  // );

  const supportingLayersString = searchParams.get("supportingLayers") as string;
  const visible =
    supportingLayersString === null
      ? false
      : supportingLayersString.split(",").includes("housing");

  const geographicAggregates = (searchParams.get("housingData") ||
    "cd") as HousingLayerQueryParams["housingData"];
  const housingRange = (searchParams.get("housingRange") ||
    "projected") as HousingLayerQueryParams["housingRange"];
  const housingGrowthLayer = HOUSING_GROWTH_LAYERS[geographicAggregates][
    housingRange
  ] as Array<SupportingLayerSliceProps>;

  const { boroughs } = useRouteLoaderData("layouts/MapPage");

  return new MVTLayer<HousingGrowthProperties>({
    id: "HousingGrowth",
    data: [
      `${zoningApiUrl}/api/housing-growth/${geoUrlMap.get(geographicAggregates)}/{z}/{x}/{y}.pbf`,
    ],
    visible,
    uniqueIdProperty: "id",
    pickable: true,
    getPointRadius: 5,
    filled: true,
    getLineColor: [113, 128, 150, 255],
    // getLineColor: ({
    //   properties,
    // }: {
    //   properties: HousingGrowthProperties;
    // }) => {
    //   // console.log(properties.label, properties.unitsCurrent, properties)
    //   if (properties.id === hoveredItemId) {
    //     return [250, 255, 0];
    //   }
    //   return [113, 128, 150, 255];
    // },
    getLineWidth: 1,
    // getLineWidth: ({
    //   properties,
    // }: {
    //   properties: HousingGrowthProperties;
    // }) => {
    //   if (properties.id === hoveredItemId) {
    //     return 3;
    //   }
    //   return 1;
    // },
    lineWidthUnits: "pixels",
    pointType: "text",
    getText: ({ properties }: { properties: HousingGrowthProperties }) => {
      // console.log(properties.label, properties.unitsCurrent, properties)
      // console.log(properties.label, properties)
      if (geographicAggregates === "nta") return;
      return properties.label;
      // If CommunityDistrictId > 18, the area represents a Park, not a Community District
      if (parseInt(properties.id.slice(-2)) > 18) {
        return null;
      }
      return `${properties.abbr} ${parseInt(properties.id.slice(-2))}`;
    },
    onHover: (info) => {
      // console.log("picked", info.picked, "props", info.object.properties)
      if (info.picked) {
        // console.log(info.object.properties)
        if (info?.object.properties.id === undefined) {
          if (hoveredItemId !== undefined) setHoveredItemId(undefined);
        } else if (info?.object.properties.id !== hoveredItemId) {
          setHoveredItemId(info.object.properties.id);
          let tooltipBody = "";

          if (geographicAggregates === "cd")
            tooltipBody = `${boroughs.find((boro: Borough) => boro.id === info.object.properties.id[0]).title} Community District ${parseInt(info.object.properties.id.slice(1))}<br />`;
          else if (geographicAggregates === "nta")
            tooltipBody = `${info.object.properties.label} (${info.object.properties.id})<br />`;
          else if (geographicAggregates === "boro")
            tooltipBody = `${boroughs.find((boro: Borough) => boro.id === info.object.properties.id).title}<br />`;

          tooltipBody += `<b>${info.object.properties[rangeVariableMap.get(housingRange) || "unitsCurrent"].toLocaleString("en-US")}</b>`;

          tooltipBody += ` ${housingRange === "past" ? "Completed" : housingRange === "current" ? "Current" : "Projected"} Units`;

          setHousingLayerMapTooltip(tooltipBody);
          // setHousingLayerMapTooltip(info.object.properties)
          // console.log("setting hoveredItemId to", info.object.properties.id)
        }
        // console.log("tooltip", housingLayerMapTooltip)
      } else {
        setHoveredItemId(undefined);
      }
    },
    // onClick: (info) => {
    //   if (facDbPhase3 === "ON") {
    //     const newDistrictId =
    //       info.object.properties.id;
    //     if (newDistrictId.slice(1) <= 18) {
    //       if (communityDistrictIds?.includes(newDistrictId)) {
    //         updateSearchParams({
    //           communityDistrictIds:
    //             communityDistrictIds.length === 1
    //               ? null
    //               : communityDistrictIds
    //                 .filter((id) => id !== newDistrictId)
    //                 .join(","),
    //         });
    //       } else {
    //         // clearCombobox();
    //         dismissWelcomeAndUpdateSearchParams("/capital-projects", {
    //           boundaryType: "cd",
    //           communityDistrictIds: communityDistrictIds
    //             ? communityDistrictIds.concat(newDistrictId).join(",")
    //             : newDistrictId,
    //           search: undefined,
    //           radius: undefined,
    //           pin: undefined,
    //         });
    //       }
    //     }
    //   } else {
    //     const newBoroughId =
    //       info.object.properties.id[0];
    //     const newDistrictId =
    //       info.object.properties.id.slice(1);
    //     if (newDistrictId <= 18) {
    //       if (boroughId === newBoroughId && boundaryId === newDistrictId) {
    //         updateSearchParams({
    //           boundaryType: "cd",
    //           boroughId: null,
    //           boundaryId: null,
    //         });
    //       } else {
    //         // clearCombobox();
    //         dismissWelcomeAndUpdateSearchParams("/capital-projects", {
    //           boundaryType: "cd",
    //           boroughId: info.object.properties.id[0],
    //           boundaryId:
    //             info.object.properties.id.slice(1),
    //           search: undefined,
    //           radius: undefined,
    //           pin: undefined,
    //         });
    //       }
    //     }
    //   }
    // },
    // getFillColor: [0, 0, 0, 0],
    // getFillColor: [255, 0, 0, 255],
    // getFillColor: (f) => {
    //   console.log(f.properties)
    //   return [255, 0, 0, 255]
    // },
    getFillColor: ({ properties }: { properties: HousingGrowthProperties }) => {
      const data =
        properties[rangeVariableMap.get(housingRange) || "unitsCurrent"];
      return (
        housingGrowthLayer.find(
          (slice) =>
            slice.rangeMin !== undefined &&
            slice.rangeMin <= data &&
            data < slice.rangeMax,
        )?.colorRgba || [204, 204, 204]
      );
    },
    getTextColor: [98, 98, 98, 255],
    textFontFamily: "Helvetica Neue, Arial, sans-serif",
    getTextSize: 15,
    textFontSettings: {
      sdf: true,
    },
    textOutlineColor: [255, 255, 255, 255],
    textOutlineWidth: 2,
    updateTriggers: {
      getLineColor: hoveredItemId,
      getFillColor: housingGrowthLayer,
      // onHover: [geographicAggregates, housingRange],
    },
  });
}
