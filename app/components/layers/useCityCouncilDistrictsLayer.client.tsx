import { MVTLayer } from "@deck.gl/geo-layers";
import { useState } from "react";
import {
  useUpdateSearchParams,
  useDismissWelcomeAndUpdateSearchParams,
} from "~/utils/utils";
import { BoundaryId, BoundaryType } from "~/utils/types";
import { env } from "~/utils/env";

const { zoningApiUrl, facDbPhase1 } = env;
export interface CityCouncilDistrictProperties {
  layerName: string;
  id: string;
}

export function useCityCouncilDistrictsLayer({
  clearCombobox,
}: {
  clearCombobox: () => void;
}) {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const dismissWelcomeAndUpdateSearchParams =
    useDismissWelcomeAndUpdateSearchParams();
  const [isHovered, setIsHovered] = useState<string | undefined>();
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boundaryId = searchParams.get("boundaryId") as BoundaryId;

  if (facDbPhase1 == "ON")
    return new MVTLayer<CityCouncilDistrictProperties>({
      id: "CityCouncilDistricts",
      data: [`${zoningApiUrl}/api/city-council-districts/{z}/{x}/{y}.pbf`],
      visible: boundaryType === "ccd",
      uniqueIdProperty: "cityCouncilDistrictId",
      pickable: true,
      getPointRadius: 5,
      filled: true,
      getFillColor: [0, 0, 0, 0],
      getLineColor: ({
        properties,
      }: {
        properties: CityCouncilDistrictProperties;
      }) => {
        if (properties.id === isHovered) {
          return [250, 255, 0];
        }
        return [113, 128, 150, 0];
      },
      getLineWidth: 3,
      lineWidthUnits: "pixels",
      onHover: (info) => {
        if (info.picked) {
          if (info?.object.properties.id === boundaryId) {
            setIsHovered(undefined);
          } else {
            setIsHovered(info.object.properties.id);
          }
        }
      },
      onClick: (info) => {
        const newDistrictId = info.object.properties.id;
        if (boundaryId === newDistrictId) {
          updateSearchParams({
            boundaryId: null,
          });
        } else {
          clearCombobox();
          dismissWelcomeAndUpdateSearchParams("/capital-projects", {
            boundaryId: info.object.properties.id,
            search: undefined,
            radius: undefined,
            pin: undefined,
          });
        }
      },
      pointType: "text",
      getText: ({
        properties,
      }: {
        properties: CityCouncilDistrictProperties;
      }) => properties.id,
      getTextColor: [98, 98, 98, 255],
      textFontFamily: "Helvetica Neue, Arial, sans-serif",
      getTextSize: 15,
      textFontSettings: {
        sdf: true,
      },
      textOutlineColor: [255, 255, 255, 255],
      textOutlineWidth: 2,
      updateTriggers: {
        getLineColor: isHovered,
      },
    });

  return new MVTLayer<CityCouncilDistrictProperties>({
    id: "CityCouncilDistricts",
    data: [`${zoningApiUrl}/api/city-council-districts/{z}/{x}/{y}.pbf`],
    visible: boundaryType === "ccd",
    uniqueIdProperty: "cityCouncilDistrictId",
    pickable: true,
    getPointRadius: 5,
    filled: false,
    getLineColor: [113, 128, 150, 255],
    getLineWidth: 3,
    lineWidthUnits: "pixels",
    pointType: "text",
    getText: ({ properties }: { properties: CityCouncilDistrictProperties }) =>
      properties.id,
    getTextColor: [98, 98, 98, 255],
    textFontFamily: "Helvetica Neue, Arial, sans-serif",
    getTextSize: 15,
    textFontSettings: {
      sdf: true,
    },
    textOutlineColor: [255, 255, 255, 255],
    textOutlineWidth: 2,
  });
}
