import { GridItem, HStack } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import BoroughSelector from "../components/borough-selector";
import CommunityDistrictSelector from "../components/community-district-selector";
import AdminBoundarySelector from "../components/admin-boundary-selector";

export default function CommunityDistrictDefaultPath() {
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
              activeBoundaryId={""}
              boundaries={[]}
              routePrefix={""}
            >
              Borough
            </AdminBoundarySelector>
            <AdminBoundarySelector
              activeBoundaryId={""}
              boundaries={[]}
              routePrefix={""}
            >
              District
            </AdminBoundarySelector>
          </HStack>
        </GeographyMenu>
      </GridItem>
    </>
  );
}
