import { CityCouncilDistrict } from "../../gen";
import CityCouncilDistrictSelector from "./admin-boundary-selector/city-council-district";
import { GeographyMenuBase } from "./base";
import { GoToGeography } from "../ui/buttons/go-to-geography";

export interface GeographyMenuCityCouncilDistricts {
  activeCityCouncilDistrictId?: string | null;
  cityCouncilDistricts?: Array<CityCouncilDistrict> | null;
}
export function GeographyMenuCityCouncilDistricts({
  activeCityCouncilDistrictId = null,
  cityCouncilDistricts = null,
}: GeographyMenuCityCouncilDistricts) {
  return (
    <GeographyMenuBase gridRowEnd={10}>
      <CityCouncilDistrictSelector
        activeBoundaryId={activeCityCouncilDistrictId}
        cityCouncilDistricts={cityCouncilDistricts}
      />
      <GoToGeography isDisabled={activeCityCouncilDistrictId === null} />
    </GeographyMenuBase>
  );
}
