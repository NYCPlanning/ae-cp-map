import {
  DataFilterExtension,
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import { MVTLayer } from "@deck.gl/geo-layers";
import { env } from "~/utils/env";
import { useSearchParams } from "react-router";
import { BoroughId, BoundaryId, BoundaryType } from "../../utils/types";
import { CommunityDistrictProperties } from "./useCommunityDistrictsLayer.client";

const { zoningApiUrl } = env;

export function useBoundaryMVTMask() {
  const [searchParams] = useSearchParams();
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const boroughIds = searchParams.get("boroughIds") as BoroughId;
  const boundaryId = searchParams.get("boundaryId") as BoundaryId;

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
    default:
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
  }
}
