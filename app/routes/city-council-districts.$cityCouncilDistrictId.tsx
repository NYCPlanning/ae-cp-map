import { GridItem } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import CityCouncilDistrictSelector from "../components/city-council-district-selector";
import { GoToGeography } from "../components/go-to-geography";

export default function CityCouncilDistrictCityCouncilDistrictIdPath() {
  return (
    <>
      <GridItem
        zIndex={1}
        gridColumnStart={2}
        gridColumnEnd={16}
        gridRowStart={2}
        gridRowEnd={11}
      >
        <GeographyMenu>
          <GeographyTypeSelector />
          <CityCouncilDistrictSelector />
          <GoToGeography />
        </GeographyMenu>
      </GridItem>
    </>
  );
}
