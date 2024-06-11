import { HStack } from "@nycplanning/streetscape";
import { Borough, CommunityDistrict } from "../../gen";
import BoroughSelector from "./admin-boundary-selector/borough";
import CommunityDistrictSelector from "./admin-boundary-selector/community-district";
import { GeographyMenuBase } from "./base";
import { GoToGeography } from "../ui/buttons/go-to-geography";

export interface GeographyMenuCommunityDistricts {
  activeBoroughId?: string | null;
  boroughs?: Array<Borough> | null;
  activeCommunityDistrictId?: string | null;
  communityDistricts?: Array<CommunityDistrict> | null;
}
export function GeographyMenuCommunityDistricts({
  activeBoroughId = null,
  boroughs = null,
  activeCommunityDistrictId = null,
  communityDistricts = null,
}: GeographyMenuCommunityDistricts) {
  return (
    <GeographyMenuBase gridRowEnd={10}>
      <HStack spacing={2}>
        <BoroughSelector
          activeBoundaryId={activeBoroughId}
          boroughs={boroughs}
        />
        <CommunityDistrictSelector
          activeBoundaryId={activeCommunityDistrictId}
          communityDistricts={communityDistricts}
          activeBoroughId={activeBoroughId}
        />
      </HStack>
      <GoToGeography isDisabled={activeCommunityDistrictId === null} />
    </GeographyMenuBase>
  );
}
