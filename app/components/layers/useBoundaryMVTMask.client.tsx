import {
  DataFilterExtension,
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import { MVTLayer } from "@deck.gl/geo-layers";
import { env } from "~/utils/env";
import { useSearchParams } from "react-router";
import { BoroughId, BoundaryId, BoundaryType } from "../../utils/types";
import { CommunityDistrictProperties } from "./useCommunityDistrictsLayer.client";
import { ADDRESS_SEARCH_RADIUS } from "~/components/HeaderBar/AddressSearch";
import { GeoJsonLayer } from "@deck.gl/layers";
import { circle } from "@turf/circle";

const { zoningApiUrl } = env;

export function useBoundaryMVTMask({
  addressSearchSliderValue,
}: {
  addressSearchSliderValue: number | undefined;
}) {
  const [searchParams] = useSearchParams();
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const boroughIds = searchParams.get("boroughIds") as BoroughId;
  const boundaryId = searchParams.get("boundaryId") as BoundaryId;
  const bufferParam = searchParams.get("radius");
  const buffer = bufferParam === null ? -1 : parseInt(bufferParam);
  const pin = searchParams.get("pin");
  const [lon, lat] =
    pin === null
      ? [undefined, undefined]
      : pin.split(",").map((d) => parseFloat(d));

  if (
    buffer >= ADDRESS_SEARCH_RADIUS.MIN &&
    buffer <= ADDRESS_SEARCH_RADIUS.MAX &&
    lon !== undefined &&
    lat !== undefined &&
    addressSearchSliderValue !== undefined
  ) {
    const radiusFilterLayerData = circle([lon, lat], addressSearchSliderValue, {
      units: "feet",
    });
    return new GeoJsonLayer({
      id: "boundary-mvt",
      data: radiusFilterLayerData,
      operation: "mask",
    });
  }

  switch (boundaryType) {
    case "cd":
      return new MVTLayer<unknown, DataFilterExtensionProps>({
        id: "boundary-mvt",
        data: [`${zoningApiUrl}/api/community-districts/{z}/{x}/{y}.pbf`],
        // https://github.com/visgl/deck.gl/issues/8919#issuecomment-2134505299
        binary: false,
        getFilterCategory: ({
          properties,
        }: {
          properties: CommunityDistrictProperties;
        }) => {
          return properties.boroughIdCommunityDistrictId;
        },
        filterCategories: [
          boroughId && boundaryId ? `${boroughId}${boundaryId}` : "",
        ],
        extensions: [
          new DataFilterExtension({
            categorySize: 1,
          }),
        ],
        operation: "mask",
      });
    case "borough":
      return new MVTLayer<unknown, DataFilterExtensionProps>({
        id: "boundary-mvt",
        data: [`${zoningApiUrl}/api/boroughs/{z}/{x}/{y}.pbf`],
        binary: false,
        getFilterCategory: ({ properties }) => properties.id,
        filterCategories: [boroughIds ? boroughIds : ""],
        extensions: [
          new DataFilterExtension({
            categorySize: 1,
          }),
        ],
        operation: "mask",
      });
    case "ccd":
      return new MVTLayer<unknown, DataFilterExtensionProps>({
        id: "boundary-mvt",
        data: [`${zoningApiUrl}/api/city-council-districts/{z}/{x}/{y}.pbf`],
        // https://github.com/visgl/deck.gl/issues/8919#issuecomment-2134505299
        binary: false,
        getFilterCategory: ({ properties }) => properties.id,
        filterCategories: [boundaryId ? boundaryId : ""],
        extensions: [
          new DataFilterExtension({
            categorySize: 1,
          }),
        ],
        operation: "mask",
      });
    default:
      return;
  }
}
