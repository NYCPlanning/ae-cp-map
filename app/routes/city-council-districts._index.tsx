import { GridItem } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import CityCouncilDistrictSelector from "../components/city-council-district-selector";
import { FindCityCouncilDistrictsQuery } from "../gen";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return {
    Response: {
      cityCouncilDistricts: [{ id: "1" }, { id: "10" }],
    },
  };
};

export default function CityCouncilDistrictDefault() {
  const data = useLoaderData<FindCityCouncilDistrictsQuery>();
  console.debug("index ccd", data);
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
          <CityCouncilDistrictSelector
            activeCityCouncilDistrictId=""
            cityCouncilDistricts={data.Response.cityCouncilDistricts}
          />
        </GeographyMenu>
      </GridItem>
    </>
  );
}
