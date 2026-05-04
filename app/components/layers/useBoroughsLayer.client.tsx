import { MVTLayer } from "@deck.gl/geo-layers";
import { useState } from "react";
import { env } from "~/utils/env";
import { BoundaryType } from "~/utils/types";
import {
  useUpdateSearchParams,
  useDismissWelcomeAndUpdateSearchParams,
} from "~/utils/utils";

const { zoningApiUrl, facDbPhase3 } = env;

export interface BoroughProperties {
  layerName: string;
  id: string;
  abbr: string;
  title: string;
}
export function useBoroughsLayer({
  clearCombobox,
}: {
  clearCombobox: () => void;
}) {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const dismissWelcomeAndUpdateSearchParams =
    useDismissWelcomeAndUpdateSearchParams();
  const [isHovered, setIsHovered] = useState<string | undefined>();
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boroughIdsString = searchParams.get("boroughIds");
  const boroughIds =
    boroughIdsString !== null && boroughIdsString.length > 0
      ? boroughIdsString.split(",")
      : undefined;

  return new MVTLayer<BoroughProperties>({
    id: "Boroughs",
    data: [`${zoningApiUrl}/api/boroughs/{z}/{x}/{y}.pbf`],
    visible: boundaryType === "borough",
    uniqueIdProperty: "boroughId",
    pickable: true,
    getPointRadius: 5,
    filled: true,
    getFillColor: [0, 0, 0, 0],
    getLineColor: ({ properties }: { properties: BoroughProperties }) => {
      if (properties.id === isHovered) {
        return [250, 255, 0];
      }
      return [113, 128, 150, 0];
    },
    getLineWidth: 3,
    lineWidthUnits: "pixels",
    onHover: (info) => {
      if (info.picked) {
        if (info?.object.properties.id === boroughIds) {
          setIsHovered(undefined);
        } else {
          setIsHovered(info.object.properties.id);
        }
      }
    },
    onClick: (info) => {
      if (facDbPhase3 == "ON") {
        const newBoroughId = info.object.properties.id;
        if (boroughIds?.includes(newBoroughId)) {
          updateSearchParams({
            boroughIds:
              boroughIds.length === 1
                ? null
                : boroughIds.filter((id) => id !== newBoroughId).join(","),
          });
        } else {
          clearCombobox();
          dismissWelcomeAndUpdateSearchParams("/capital-projects", {
            boroughIds: boroughIds
              ? boroughIds.concat(newBoroughId).join(",")
              : newBoroughId,
            search: undefined,
            radius: undefined,
            pin: undefined,
          });
        }
      } else {
        const newBoroughId = info.object.properties.id;
        if (boroughIds === newBoroughId) {
          updateSearchParams({
            boroughIds: null,
          });
        } else {
          clearCombobox();
          dismissWelcomeAndUpdateSearchParams("/capital-projects", {
            boroughIds: info.object.properties.id,
            search: undefined,
            radius: undefined,
            pin: undefined,
          });
        }
      }
    },
    pointType: "text",
    getText: ({ properties }: { properties: BoroughProperties }) =>
      properties.title,
    getTextColor: [98, 98, 98, 255],
    textFontFamily: "Helvetica Neue, Arial, sans-serif",
    getTextSize: 25,
    textFontSettings: {
      sdf: true,
    },
    textOutlineColor: [255, 255, 255, 255],
    textOutlineWidth: 2,
    updateTriggers: {
      getLineColor: isHovered,
    },
  });
}
