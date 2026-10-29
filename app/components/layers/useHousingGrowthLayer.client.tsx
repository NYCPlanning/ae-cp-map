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
    getLineColor: [61, 70, 86, 255],
    getLineWidth: 1,
    lineWidthUnits: "pixels",
    pointType: "text",
    getText: ({ properties }: { properties: HousingGrowthProperties }) =>
      properties.label,
    onHover: (info) => {
      if (!info.picked) {
        setHoveredItemId(undefined);
        return;
      }
      const properties = info.object.properties;
      const { id, layerName } = properties;
      if (id === undefined) {
        if (hoveredItemId !== undefined) setHoveredItemId(undefined);
        return;
      }
      // Exclude labels, which do not have the data needed to render the tooltip
      if (id === hoveredItemId || layerName === "housing-growth-label") return;
      setHoveredItemId(id);
      const getGeographicAggregateLabel = () => {
        if (geographicAggregates === "cd") {
          const boroughTitle =
            id[0] <= 5
              ? boroughs.find((boro: Borough) => boro.id === id[0]).title
              : "";
          return `${boroughTitle} Community District ${parseInt(id.slice(1))}<br />`;
        }
        if (geographicAggregates === "nta") {
          return `${properties.label} (${id})<br />`;
        }
        if (geographicAggregates === "boro") {
          const boroughTitle =
            id[0] <= 5
              ? boroughs.find((boro: Borough) => boro.id === id[0]).title
              : "";
          return `${boroughTitle}<br />`;
        }
        return "";
      };
      const getHousingRangeLabel = () => {
        if (housingRange === "past") return "Completed";
        if (housingRange === "current") return "Current";
        return "Projected";
      };
      let tooltipBody = getGeographicAggregateLabel();
      tooltipBody += `<b>${properties[
        rangeVariableMap.get(housingRange) || "unitsCurrent"
      ].toLocaleString("en-US")}</b>`;
      tooltipBody += ` ${getHousingRangeLabel()} Units`;
      setHousingLayerMapTooltip(tooltipBody);
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
