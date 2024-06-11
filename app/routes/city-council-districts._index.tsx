import { FindCityCouncilDistrictsQueryResponse } from "../gen";
import { useOutletContext } from "@remix-run/react";
import { GeographyMenuCityCouncilDistricts } from "../components/geography-menu/city-council-districts";

export default function CityCouncilDistrictDefault() {
  const contextData = useOutletContext<FindCityCouncilDistrictsQueryResponse>();

  return (
    <GeographyMenuCityCouncilDistricts
      cityCouncilDistricts={contextData.cityCouncilDistricts}
    />
  );
}
