import { FormControl, FormLabel, Select } from "@nycplanning/streetscape";
import { useLocation } from "@remix-run/react";

const fakeCommunityDistricts = [{ id: "01" }, { id: "10" }];

export default function CommunityDistrictSelector() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <FormControl>
        <FormLabel>District</FormLabel>
        <Select variant="base" value={pathname.split("/")[3]}>
          <option value={""}>-Select-</option>
          {fakeCommunityDistricts.map((district) => (
            <option key={district.id}>{district.id}</option>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
