import { GridItem, HStack } from "@nycplanning/streetscape";
import AdminBoundarySelector from "../components/admin-boundary-selector";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import { Outlet, useOutletContext, useParams } from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "~/gen";
import { GoToGeography } from "../components/go-to-geography";

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
            <AdminBoundarySelector
              activeBoundaryId={boroughId}
              boundaries={contextData.boroughs}
              routePrefix={"community-districts"}
            >
              Borough
            </AdminBoundarySelector>
            <AdminBoundarySelector
              activeBoundaryId={communityDistrictId}
              boundaries={contextData.communityDistricts}
              routePrefix={`community-districts/${boroughId}`}
            >
              District
            </AdminBoundarySelector>
          </HStack>
          <GoToGeography />
        </GeographyMenu>
      </GridItem>
      <Outlet context={contextData} />
    </>
  );
}
