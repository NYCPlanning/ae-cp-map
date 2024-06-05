import { GridItem } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import CityCouncilDistrictSelector from "../components/city-council-district-selector";
import { GoToGeography } from "../components/go-to-geography";
import { useOutletContext, useParams } from "@remix-run/react";
import { FindCityCouncilDistrictsQuery } from "~/gen";

export default function CityCouncilDistrictCityCouncilDistrictIdPath() {
  const data = useOutletContext<FindCityCouncilDistrictsQuery>();
  const params = useParams<{ cityCouncilDistrictId: string }>();

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
            activeCityCouncilDistrictId={params.cityCouncilDistrictId ?? ""}
            cityCouncilDistricts={data.Response.cityCouncilDistricts}
          />
          <GoToGeography />
        </GeographyMenu>
      </GridItem>
    </>
  );
}
