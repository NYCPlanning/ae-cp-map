import { MVTLayer } from "@deck.gl/geo-layers";
import { useSearchParams } from "@remix-run/react";

export interface CommunityDistrictProperties {
  borough_id_community_district_id: string;
  layerName: string;
  borough_abbr: string | null;
}

export function useCommunityDistrictsLayer() {
  const [searchParams] = useSearchParams();
  const districtType = searchParams.get("districtType");

  return new MVTLayer<CommunityDistrictProperties>({
    id: "CommunityDistricts",
    data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/community-districts/{z}/{x}/{y}.pbf`,
    ],
    visible: districtType === "cd",
    uniqueIdProperty: "borough_id_community_district_id",
    pickable: true,
    getPointRadius: 5,
    filled: false,
    maxZoom: 13,
    getLineColor: [113, 128, 150, 255],
    getLineWidth: 3,
    lineWidthUnits: "pixels",
    pointType: "text",
    getText: ({ properties }: { properties: CommunityDistrictProperties }) => {
      // If CommunityDistrictId > 18, the area represents a Park, not a Community District
      if (
        parseInt(properties.borough_id_community_district_id.slice(-2)) > 18
      ) {
        return null;
      }
      return `${properties.borough_abbr} ${parseInt(properties.borough_id_community_district_id.slice(-2))}`;
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
