import { FormControl, FormLabel, Select } from "@nycplanning/streetscape";
import { useNavigate } from "@remix-run/react";
import { CityCouncilDistrict } from "~/gen";

export interface CityCouncilDistrictSelector {
  activeCityCouncilDistrictId: string;
  cityCouncilDistricts: Array<CityCouncilDistrict>;
}

export default function CityCouncilDistrictSelector({
  activeCityCouncilDistrictId,
  cityCouncilDistricts,
}: CityCouncilDistrictSelector) {
  const navigate = useNavigate();

  const onUpdateSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/city-council-districts/${e.target.value}`);
  };

  return (
    <>
      <FormControl>
        <FormLabel>District</FormLabel>
        <Select
          variant="base"
          value={activeCityCouncilDistrictId}
          onChange={onUpdateSelector}
        >
          <option value={""}>-Select-</option>
          {cityCouncilDistricts.map((district) => (
            <option key={district.id}>{district.id}</option>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
