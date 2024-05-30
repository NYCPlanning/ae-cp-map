import { GridItem } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import CityCouncilDistrictSelector from "../components/city-council-district-selector";

export default function CityCouncilDistrictDefault() {
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
          <CityCouncilDistrictSelector />
        </GeographyMenu>
      </GridItem>
    </>
  );
}
