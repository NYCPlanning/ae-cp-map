import { GridItem, HStack } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import { useOutletContext } from "@remix-run/react";
import { FindBoroughsQueryResponse } from "~/gen";
import { GoToGeography } from "../components/buttons/go-to-geography";
import BoroughSelector from "../components/borough-selector";
import CommunityDistrictSelector from "../components/community-district-selector";

export default function CommunityDistrictDefaultPath() {
  const contextData = useOutletContext<FindBoroughsQueryResponse>();
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
            activeBoundaryId={""}
            routePrefix={"community-districts"}
            boroughs={contextData.boroughs}
          />
          <CommunityDistrictSelector
            activeBoundaryId={""}
            communityDistricts={null}
            routePrefix={""}
          />
        </HStack>
        <GoToGeography isDisabled />
      </GeographyMenu>
    </GridItem>
  );
}
