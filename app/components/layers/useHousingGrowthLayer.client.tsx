import { MVTLayer, MVTLayerProps } from "@deck.gl/geo-layers";
import { GeoJsonLayer } from "@deck.gl/layers";
import { useRouteLoaderData, useSearchParams } from "react-router";
import {
  SupportingLayerSliceProps,
  HousingLayerQueryParams,
} from "~/utils/types";
import { env } from "~/utils/env";
import { HOUSING_GROWTH_LAYERS } from "~/utils/constants";
import { useStore } from "~/store";
import type { Borough } from "~/gen";
import { CollisionFilterExtension } from "@deck.gl/extensions";
import type { CollisionFilterExtensionProps } from "@deck.gl/extensions";
import { Feature } from "geojson";

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

export function useHousingGrowthLayer() {
  const [searchParams] = useSearchParams();

  const { hoveredItemId, setHoveredItemId, setHousingLayerMapTooltip } =
    useStore((state) => state);

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

  return new MVTLayer<
    HousingGrowthProperties & MVTLayerProps,
    CollisionFilterExtensionProps
  >({
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
    getLineWidth: 1,
    lineWidthUnits: "pixels",
    pointType: "text",
    getText: ({ properties }: { properties: HousingGrowthProperties }) =>
      properties.label,
    onHover: (info) => {
      if (info.picked) {
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
        }
      } else {
        setHoveredItemId(undefined);
      }
    },
    getFillColor: ({ properties }: { properties: HousingGrowthProperties }) => {
      const data =
        properties[rangeVariableMap.get(housingRange) || "unitsCurrent"];
      return (
        housingGrowthLayer.find(
          (slice) =>
            slice.rangeMin !== undefined &&
            slice.rangeMin <= data &&
            data <= slice.rangeMax,
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

    binary: false,

    // Only for NTAs, we are using the CollisionFilterExtension
    // This is to increase the number of labels shown as zoom increases
    ...(geographicAggregates === "nta"
      ? {
          renderSubLayers: (props) => {
            const data = props.data as Feature[];

            const geoLayerData = data.filter(
              (f) => f.properties?.layerName === "housing-growth-fill",
            );
            const labelsLayerData = data.filter(
              (f) => f.properties?.layerName === "housing-growth-label",
            );

            const subLayers = [];

            if (geoLayerData.length > 0) {
              subLayers.push(
                new GeoJsonLayer({
                  ...props,
                  id: `${props.id}-geo`,
                  data: geoLayerData,
                }),
              );
            }

            if (labelsLayerData.length > 0) {
              subLayers.push(
                new GeoJsonLayer({
                  ...props,
                  id: `${props.id}-label`,
                  data: labelsLayerData,
                  pointType: "text",
                  getTextSize: 15,
                  extensions: [new CollisionFilterExtension()],
                  collisionGroup: "housing-growth-label",
                  collisionTestProps: {
                    sizeScale: 3,
                  },
                }),
              );
            }
            return subLayers;
          },
        }
      : {}),

    updateTriggers: {
      getFillColor: housingGrowthLayer,
    },
  });
}
