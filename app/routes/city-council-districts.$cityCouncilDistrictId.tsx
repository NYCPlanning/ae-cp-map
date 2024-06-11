import { Outlet, useOutletContext, useParams } from "@remix-run/react";
import { FindCityCouncilDistrictsQueryResponse } from "../gen";
import { GeographyMenuCityCouncilDistricts } from "../components/geography-menu/city-council-districts";

export default function CityCouncilDistrictCityCouncilDistrictIdPath() {
  const contextData = useOutletContext<FindCityCouncilDistrictsQueryResponse>();
  const { cityCouncilDistrictId } = useParams<{
    cityCouncilDistrictId: string;
  }>();
  if (cityCouncilDistrictId === undefined)
    throw new Error("failed to provide city council district id");

  return (
    <>
      <GeographyMenuCityCouncilDistricts
        activeCityCouncilDistrictId={cityCouncilDistrictId}
        cityCouncilDistricts={contextData.cityCouncilDistricts}
      />
      <Outlet context={contextData} />
    </>
  );
}
