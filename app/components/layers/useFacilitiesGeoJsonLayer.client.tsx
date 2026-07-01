import { GeoJsonLayer } from "@deck.gl/layers";
import { useParams } from "react-router";
import { FlyToGeoJsonExtension } from "../../extensions";
import { env } from "~/utils/env";
import { useMediaQuery } from "@nycplanning/streetscape";
import { FACILITY_PNG_BY_CATEGORY } from "~/utils/facilities-icons";

const { zoningApiUrl } = env;

export interface FacilityProperties {
  categoryId: number;
}

export function useFacilitiesGeoJsonLayer() {
  const { facilityId } = useParams();
  const isMobile = useMediaQuery("(max-width: 767px)")[0];

  return new GeoJsonLayer({
    id: "facilitiesGeoJson",
    data:
      facilityId === undefined
        ? []
        : `${zoningApiUrl}/api/facilities/${facilityId}/geojson`,
    pickable: false,
    pointType: "icon",
    getIcon: ({ properties }: { properties: FacilityProperties }) => ({
      url: `data:image/png;base64,${FACILITY_PNG_BY_CATEGORY.SELECTED.get(properties.categoryId)}`,
      id: `selected-facility-geojson`,
      width: 132,
      height: 132,
      mask: false,
    }),
    getIconSize: 256,
    iconSizeUnits: "meters",
    iconSizeMaxPixels: isMobile ? 59 : 29,
    updateTriggers: {
      getIcon: [facilityId],
    },
    extensions: [new FlyToGeoJsonExtension()],
    minZoomOnSelection: 15,
  });
}
