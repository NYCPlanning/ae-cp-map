import { GridItem } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import CityCouncilDistrictSelector from "../components/city-council-district-selector";
import { GoToGeography } from "../components/go-to-geography";
import { Outlet, useOutletContext, useParams } from "@remix-run/react";
import { FindCityCouncilDistrictsQueryResponse } from "~/gen";

export default function CityCouncilDistrictCityCouncilDistrictIdPath() {
  const contextData = useOutletContext<FindCityCouncilDistrictsQueryResponse>();
  const { cityCouncilDistrictId } = useParams<{
    cityCouncilDistrictId: string;
  }>();
  if (cityCouncilDistrictId === undefined)
    throw new Error("failed to provide city council district id");

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
          <CityCouncilDistrictSelector
            activeBoundaryId={cityCouncilDistrictId}
            cityCouncilDistricts={contextData.cityCouncilDistricts}
            routePrefix="city-council-districts"
          />
          <GoToGeography />
        </GeographyMenu>
      </GridItem>
      <Outlet context={contextData} />
    </>
  );
}
