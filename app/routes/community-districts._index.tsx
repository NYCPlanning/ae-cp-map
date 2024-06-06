import { GridItem, HStack } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import AdminBoundarySelector from "../components/admin-boundary-selector";
import { useOutletContext } from "@remix-run/react";
import { FindBoroughsQueryResponse } from "~/gen";
import { GoToGeography } from "../components/go-to-geography";

export default function CommunityDistrictDefaultPath() {
  const data = useOutletContext<FindBoroughsQueryResponse>();
  return (
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
            activeBoundaryId={""}
            boundaries={data.boroughs}
            routePrefix={"community-districts"}
          >
            Borough
          </AdminBoundarySelector>
          <AdminBoundarySelector
            activeBoundaryId={""}
            boundaries={null}
            routePrefix={""}
          >
            District
          </AdminBoundarySelector>
        </HStack>
        <GoToGeography isDisabled />
      </GeographyMenu>
    </GridItem>
  );
}
