import { FormControl, FormLabel, Select } from "@nycplanning/streetscape";
import { useLocation, useNavigate } from "@remix-run/react";

const fakeCityCouncilDistricts = [{ id: "1" }, { id: "10" }];

export default function CityCouncilDistrictSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  console.debug("pathname", pathname);

  const onUpdateSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.debug(e.target.value);
    navigate(`/city-council-districts/${e.target.value}`);
  };

  return (
    <>
      <FormControl>
        <FormLabel>District</FormLabel>
        <Select
          variant="base"
          value={pathname.split("/")[2]}
          onChange={onUpdateSelector}
        >
          <option value={""}>-Select-</option>
          {fakeCityCouncilDistricts.map((district) => (
            <option key={district.id}>{district.id}</option>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
