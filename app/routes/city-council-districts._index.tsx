import { GridItem } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import CityCouncilDistrictSelector from "../components/city-council-district-selector";
import { FindCityCouncilDistrictsQueryResponse } from "../gen";
import { useOutletContext } from "@remix-run/react";
import { GoToGeography } from "../components/buttons/go-to-geography";

export default function CityCouncilDistrictDefault() {
  const contextData = useOutletContext<FindCityCouncilDistrictsQueryResponse>();

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
        <CityCouncilDistrictSelector
          activeBoundaryId=""
          routePrefix="city-council-districts"
          cityCouncilDistricts={contextData.cityCouncilDistricts}
        />
        <GoToGeography isDisabled />
      </GeographyMenu>
    </GridItem>
  );
}
