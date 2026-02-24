import {
  DataFilterExtension,
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import { MVTLayer } from "@deck.gl/geo-layers";
import { env } from "~/utils/env";
import { useUpdateSearchParams } from "~/utils/utils";

const { zoningApiUrl } = env;

export function useBoundaryMVTMask() {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const districtIdsParam = searchParams.get("districtIds");
  const districtIds =
    districtIdsParam === null ? [] : districtIdsParam.split(",").slice(0, 4);
  return new MVTLayer<unknown, DataFilterExtensionProps>({
    id: "boundary-mvt",
    data: [`${zoningApiUrl}/api/city-council-districts/{z}/{x}/{y}.pbf`],
    // https://github.com/visgl/deck.gl/issues/8919#issuecomment-2134505299
    binary: false,
    getFilterCategory: ({ properties }) => properties.id,
    pickable: true,
    filterCategories: districtIds,
    lineWidthUnits: "pixels",
    getLineWidth: 3,
    getLineColor: [49, 151, 149, 255],
    getFillColor: [0, 0, 0, 0],
    extensions: [
      new DataFilterExtension({
        categorySize: 1,
      }),
    ],
    operation: "draw+mask",
    onClick: ({ object }) => {
      const {
        properties: { id },
      } = object as { properties: { id: string } };
      console.log("clicked masked id", typeof id);
      let nextDistrictIds: Array<string> = [];
      if (districtIds.includes(id)) {
        nextDistrictIds = districtIds.filter((thisId) => thisId !== id);
      } else if (districtIds.length < 4) {
        nextDistrictIds = districtIds.concat(id);
      } else {
        nextDistrictIds = [...districtIds];
        nextDistrictIds.shift();
        nextDistrictIds.push(id);
      }
      updateSearchParams({ districtIds: nextDistrictIds });
    },
  });
}
