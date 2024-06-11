import { GridItem, HStack } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import { Outlet, useOutletContext, useParams } from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "../gen";
import { GoToGeography } from "../components/buttons/go-to-geography";
import BoroughSelector from "../components/borough-selector";
import CommunityDistrictSelector from "../components/community-district-selector";

export default function CommunityDistrictBoroughIdCommunityDistrictIdPath() {
  const { boroughId, communityDistrictId } = useParams();
  if (boroughId === undefined) throw new Error("Failed to provide borough id");
  if (communityDistrictId === undefined)
    throw new Error("Failed to provide community district id");
  const contextData = useOutletContext<
    FindBoroughsQueryResponse & FindCommunityDistrictsByBoroughIdQueryResponse
  >();
  return (
    <>
      <GridItem
        zIndex={1}
        gridColumnStart={2}
        gridColumnEnd={16}
        gridRowStart={2}
        gridRowEnd={10}
      >
        <GeographyMenu>
          <GeographyTypeSelector />
          <HStack spacing={2}>
            <BoroughSelector
              activeBoundaryId={boroughId}
              routePrefix={"community-districts"}
              boroughs={contextData.boroughs}
            />
            <CommunityDistrictSelector
              activeBoundaryId={communityDistrictId}
              communityDistricts={contextData.communityDistricts}
              routePrefix={`community-districts/${boroughId}`}
            />
          </HStack>
          <GoToGeography />
        </GeographyMenu>
      </GridItem>
      <Outlet context={contextData} />
    </>
  );
}
