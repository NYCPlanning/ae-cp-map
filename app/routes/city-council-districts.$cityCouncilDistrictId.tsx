import { GridItem } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import CityCouncilDistrictSelector from "../components/city-council-district-selector";
import { GoToGeography } from "../components/go-to-geography";
import { useLoaderData, useLocation } from "@remix-run/react";
import { FindCityCouncilDistrictsQuery } from "~/gen";

export const loader = async () => {
  return {
    Response: {
      cityCouncilDistricts: [{ id: "1" }, { id: "10" }],
    },
  };
};

export default function CityCouncilDistrictCityCouncilDistrictIdPath() {
  const data = useLoaderData<FindCityCouncilDistrictsQuery>();
  const location = useLocation();
  const { pathname } = location;
  console.debug("pathname", pathname);
  {
    pathname.split("/")[2];
  }

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
            activeCityCouncilDistrictId={pathname.split("/")[2]}
            cityCouncilDistricts={data.Response.cityCouncilDistricts}
          />
          <GoToGeography />
        </GeographyMenu>
      </GridItem>
    </>
  );
}
