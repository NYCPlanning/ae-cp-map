import { MVTLayer } from "@deck.gl/geo-layers";
import { useState } from "react";
import { env } from "~/utils/env";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { MaskExtension } from "@deck.gl/extensions";
import type { MaskExtensionProps } from "@deck.gl/extensions";
import { useMediaQuery } from "@nycplanning/streetscape";
import { FACILITY_PNG_BY_CATEGORY } from "~/utils/facilities-icons";
import {
  BoroughId,
  BoundaryId,
  BoundaryType,
  FacilityJurisdiction,
  FacilityType,
} from "../../utils/types";
import { ADDRESS_SEARCH_RADIUS } from "~/components/HeaderBar/AddressSearch";
import { useStore } from "~/store";

const { zoningApiUrl } = env;
export interface FacilityProperties {
  layerName: string;
  id: string;
  categoryGroupId: number;
  categoryId: number;
  categorySubgroupId: number;
  facilityJurisdiction: string;
  facilityOperatorType: string;
  overseeingAgencyInitials: string;
}

export function useFacilitiesLayer({ visible }: { visible: boolean }) {
  const { facilityId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hoveredFacility, setHoveredFacility] = useState<string | null>();
  const isMobile = useMediaQuery("(max-width: 767px)")[0];

  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const boroughIds = searchParams.get("boroughIds") as BoroughId;
  const boundaryId = searchParams.get("boundaryId") as BoundaryId;
  const cityCouncilDistrictIdsString = searchParams.get(
    "cityCouncilDistrictIds",
  );
  const cityCouncilDistrictIds =
    cityCouncilDistrictIdsString !== null
      ? cityCouncilDistrictIdsString.split(",")
      : boundaryId === null
        ? null
        : [boundaryId];
  const communityDistrictIdsString = searchParams.get(
    "communityDistrictIds",
  ) as string;
  const communityDistrictIds =
    communityDistrictIdsString !== null
      ? communityDistrictIdsString.split(",")
      : boroughId === null || boundaryId === null
        ? null
        : [`${boroughId}${boundaryId}`];
  const bufferParam = searchParams.get("radius");
  const buffer = bufferParam === null ? -1 : parseInt(bufferParam);
  const pin = searchParams.get("pin");
  const [lon, lat] =
    pin === null
      ? [undefined, undefined]
      : pin.split(",").map((d) => parseFloat(d));

  const facilityOversightAgency = searchParams.get("facilityOversightAgency");

  const { facilityJurisdictionCheckboxes, facilityTypeCheckboxes } = useStore(
    (state) => state,
  );
  const facilityJurisdictionIds = facilityJurisdictionCheckboxes
    .filter((fj) => fj.checked === true)
    .map((fj) => fj.name);
  const facilityTypeIds = facilityTypeCheckboxes
    .filter((ft) => ft.checked === true)
    .map((ft) => ft.name);

  return new MVTLayer<FacilityProperties, MaskExtensionProps>({
    id: "facilities",
    data: [`${zoningApiUrl}/api/facilities/{z}/{x}/{y}.pbf`],
    visible,
    uniqueIdProperty: "facilityId",
    pickable: true,
    pointType: "icon",
    onHover: (data) => {
      if (data.index === -1) {
        setHoveredFacility(null);
      } else if (data.object?.properties?.id !== undefined) {
        setHoveredFacility(data.object.properties.id);
      }
    },
    getIconSize: ({ properties }: { properties: FacilityProperties }) => {
      if (
        facilityOversightAgency !== null &&
        properties.overseeingAgencyInitials !== facilityOversightAgency
      )
        return 0;
      if (
        properties.facilityOperatorType === undefined &&
        !facilityTypeIds.includes("Not specified")
      )
        return 0;
      if (
        properties.facilityOperatorType !== undefined &&
        !facilityTypeIds.includes(
          properties.facilityOperatorType as FacilityType,
        )
      )
        return 0;
      if (
        properties.facilityJurisdiction === undefined &&
        !facilityJurisdictionIds.includes("Not specified")
      )
        return 0;
      if (
        properties.facilityJurisdiction !== undefined &&
        !facilityJurisdictionIds.includes(
          properties.facilityJurisdiction as FacilityJurisdiction,
        )
      )
        return 0;
      return 256;
    },
    iconSizeUnits: "meters",
    iconSizeMaxPixels: isMobile ? 59 : 29,
    getIcon: ({ properties }: { properties: FacilityProperties }) => ({
      url: `data:image/png;base64,${FACILITY_PNG_BY_CATEGORY[properties.id === hoveredFacility ? "HOVER" : properties.id === facilityId ? "SELECTED" : "DEFAULT"].get(properties.categoryId)}`,
      id: `facility-${properties.categoryId}${properties.id === facilityId && "-selected"}${properties.id === hoveredFacility && "-hovered"}`,
      width: 132,
      height: 132,
      mask: false,
    }),
    onClick: (info) => {
      const newFacilityId = info.object.properties.id;
      if (newFacilityId === undefined || newFacilityId === facilityId) return;
      navigate({
        pathname: `/facilities/${newFacilityId}`,
        search: `?${searchParams.toString()}`,
      });
    },
    updateTriggers: {
      getIcon: [facilityId, hoveredFacility],
      onHover: hoveredFacility,
      getIconSize: [facilityTypeIds, facilityOversightAgency],
    },
    extensions: [new MaskExtension()],
    maskId: `${
      (boundaryId !== null &&
        (boundaryType === "cd" || boundaryType === "ccd")) ||
      (boroughIds !== null && boundaryType === "borough") ||
      (cityCouncilDistrictIds !== null && boundaryType === "ccd") ||
      (communityDistrictIds !== null && boundaryType === "cd") ||
      (buffer >= ADDRESS_SEARCH_RADIUS.MIN &&
        buffer <= ADDRESS_SEARCH_RADIUS.MAX &&
        lon !== undefined &&
        lat !== undefined)
        ? "boundary-mvt"
        : ""
    }`,
    maskByInstance: true, //doesn't seem to have an effect
    maskInverted: false,
  });
}
