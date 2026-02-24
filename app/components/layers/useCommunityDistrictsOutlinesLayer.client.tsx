import { MVTLayer } from "@deck.gl/geo-layers";
import { useUpdateSearchParams } from "~/utils/utils";
import { DistrictType } from "~/utils/types";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;
export interface CommunityDistrictProperties {
  boroughIdCommunityDistrictId: string;
  layerName: string;
  abbr: string | null;
}

export function useCommunityDistrictsOutlinesLayer() {
  const [searchParams] = useUpdateSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;

  return new MVTLayer<CommunityDistrictProperties>({
    id: "CommunityDistrictsOutlines",
    data: [`${zoningApiUrl}/api/community-districts/{z}/{x}/{y}.pbf`],
    visible: districtType === "cd" || districtType === null,
    uniqueIdProperty: "boroughIdCommunityDistrictId",
    pickable: false,
    getLineColor: [113, 128, 150, 255],
    getLineWidth: ({
      properties,
    }: {
      properties: CommunityDistrictProperties;
    }) => {
      // If CommunityDistrictId > 18, the area represents a Park, not a Community District
      if (parseInt(properties.boroughIdCommunityDistrictId.slice(-2)) > 18) {
        return 0;
      }
      return 1;
    },
    lineWidthUnits: "pixels",
    pointType: "text",
    getFillColor: [0, 0, 0, 0],
    autoHighlight: true,
    highlightColor: [0, 0, 0, 0],
  });
}
