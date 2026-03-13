import {
  DataFilterExtension,
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import { MVTLayer } from "@deck.gl/geo-layers";
import { env } from "~/utils/env";
import { useSearchParams } from "react-router";
import { BoroughId, DistrictId, DistrictType } from "../../utils/types";
import { CommunityDistrictProperties } from "./useCommunityDistrictsLayer.client";

const { zoningApiUrl } = env;

export function useBoundaryMVTMask() {
  const [searchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;

  switch (districtType) {
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
          boroughId && districtId ? `${boroughId}${districtId}` : "",
        ],
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
        filterCategories: [districtId ? districtId : ""],
        extensions: [
          new DataFilterExtension({
            categorySize: 1,
          }),
        ],
        operation: "mask",
      });
  }
}
