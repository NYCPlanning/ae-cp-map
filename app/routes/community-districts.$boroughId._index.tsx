import { GridItem, HStack } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import { useOutletContext, useParams } from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "../gen";
import { GoToGeography } from "../components/go-to-geography";
import BoroughSelector from "../components/borough-selector";
import CommunityDistrictSelector from "../components/community-district-selector";

export default function CommunityDistrictBoroughIdPath() {
  const { boroughId } = useParams<{ boroughId: string }>();
  if (boroughId === undefined) throw new Error("failed to provide borough id");
  const contextData = useOutletContext<
    FindBoroughsQueryResponse & FindCommunityDistrictsByBoroughIdQueryResponse
  >();
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
          <BoroughSelector
            activeBoundaryId={boroughId}
            routePrefix={"community-districts"}
            boroughs={contextData.boroughs}
          />
          <CommunityDistrictSelector
            activeBoundaryId={""}
            communityDistricts={contextData.communityDistricts}
            routePrefix={`community-districts/${boroughId}`}
          />
        </HStack>
        <GoToGeography isDisabled />
      </GeographyMenu>
    </GridItem>
  );
}
