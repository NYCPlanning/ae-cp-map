import { MVTLayer } from "@deck.gl/geo-layers";
import { useSearchParams } from "@remix-run/react";

export interface CommunityDistrictProperties {
  boroughIdCommunityDistrictId: string;
  layerName: string;
  abbr: string | null;
}
export function useCommunityDistrictsLayer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const districtType = searchParams.get("districtType");

  return new MVTLayer<CommunityDistrictProperties>({
    id: "CommunityDistricts",
    data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/community-districts/{z}/{x}/{y}.pbf`,
    ],
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
