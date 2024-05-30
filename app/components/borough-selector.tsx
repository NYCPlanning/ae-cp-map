import { FormControl, FormLabel, Select } from "@nycplanning/streetscape";
import { useLocation } from "@remix-run/react";

const fakeBoroughs = [{ id: "1" }, { id: "5" }];

export default function BoroughSelector() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <FormControl>
        <FormLabel>Borough</FormLabel>
        <Select variant="base" value={pathname.split("/")[3]}>
          <option value={""}>-Select-</option>
          {fakeBoroughs.map((district) => (
            <option key={district.id}>{district.id}</option>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
