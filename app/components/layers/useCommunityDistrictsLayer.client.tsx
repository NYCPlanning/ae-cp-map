import { MVTLayer } from "@deck.gl/geo-layers";
import { useState } from "react";
import { useUpdateSearchParams } from "~/utils/utils";
import { BoroughId, DistrictId, DistrictType } from "~/utils/types";
import { env } from "~/utils/env";

const { zoningApiUrl, facDbPhase1 } = env;
export interface CommunityDistrictProperties {
  boroughIdCommunityDistrictId: string;
  layerName: string;
  abbr: string | null;
}

export function useCommunityDistrictsLayer() {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const [isHovered, setIsHovered] = useState<string | undefined>();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;

  if (facDbPhase1 == "ON")
    return new MVTLayer<CommunityDistrictProperties>({
      id: "CommunityDistricts",
      data: [`${zoningApiUrl}/api/community-districts/{z}/{x}/{y}.pbf`],
      visible: districtType === "cd" || districtType === null,
      uniqueIdProperty: "boroughIdCommunityDistrictId",
      pickable: true,
      getPointRadius: 5,
      filled: true,
      getLineColor: ({
        properties,
      }: {
        properties: CommunityDistrictProperties;
      }) => {
        if (properties.boroughIdCommunityDistrictId === isHovered) {
          return [250, 255, 0];
        }
        return [113, 128, 150, 0];
      },
      getLineWidth: 3,
      lineWidthUnits: "pixels",
      pointType: "text",
      getText: ({
        properties,
      }: {
        properties: CommunityDistrictProperties;
      }) => {
        // If CommunityDistrictId > 18, the area represents a Park, not a Community District
        if (parseInt(properties.boroughIdCommunityDistrictId.slice(-2)) > 18) {
          return null;
        }
        return `${properties.abbr} ${parseInt(properties.boroughIdCommunityDistrictId.slice(-2))}`;
      },
      onHover: (info) => {
        if (info.picked) {
          if (
            info?.object.properties.boroughIdCommunityDistrictId ===
              `${boroughId}${districtId}` ||
            parseInt(
              info?.object.properties.boroughIdCommunityDistrictId.slice(-2),
            ) > 18
          ) {
            setIsHovered(undefined);
          } else {
            setIsHovered(info.object.properties.boroughIdCommunityDistrictId);
          }
        }
      },
      onClick: (info) => {
        const newBoroughId =
          info.object.properties.boroughIdCommunityDistrictId[0];
        const newDistrictId =
          info.object.properties.boroughIdCommunityDistrictId.slice(1);
        if (newDistrictId <= 18) {
          if (boroughId === newBoroughId && districtId === newDistrictId) {
            updateSearchParams({
              districtType: "cd",
              boroughId: null,
              districtId: null,
            });
          } else {
            updateSearchParams({
              districtType: "cd",
              boroughId: info.object.properties.boroughIdCommunityDistrictId[0],
              districtId:
                info.object.properties.boroughIdCommunityDistrictId.slice(1),
              search: undefined,
              radius: undefined,
              pin: undefined,
            });
          }
        }
      },
      getFillColor: [0, 0, 0, 0],
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

  return new MVTLayer<CommunityDistrictProperties>({
    id: "CommunityDistricts",
    data: [`${zoningApiUrl}/api/community-districts/{z}/{x}/{y}.pbf`],
    visible: districtType === "cd",
    uniqueIdProperty: "boroughIdCommunityDistrictId",
    pickable: true,
    getPointRadius: 5,
    filled: false,
    getLineColor: [113, 128, 150, 255],
    getLineWidth: 3,
    lineWidthUnits: "pixels",
    pointType: "text",
    getText: ({ properties }: { properties: CommunityDistrictProperties }) => {
      // If CommunityDistrictId > 18, the area represents a Park, not a Community District
      if (parseInt(properties.boroughIdCommunityDistrictId.slice(-2)) > 18) {
        return null;
      }
      return `${properties.abbr} ${parseInt(properties.boroughIdCommunityDistrictId.slice(-2))}`;
    },
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
