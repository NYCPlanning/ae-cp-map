import { FormControl, FormLabel, Select } from "@nycplanning/streetscape";
import { useLocation, useMatches, useNavigate } from "@remix-run/react";
import { ChangeEvent } from "react";

export function GeographyMenuTypeSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();
  console.debug("matches", matches);
  const { pathname } = location;

  return (
    <>
      <FormControl id="geographyType">
        <FormLabel>Geography Type</FormLabel>
        <Select
          variant="base"
          value={`/${pathname.split("/")[1]}`}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            navigate(e.target.value);
          }}
        >
          <option value={"/"}>-Select-</option>
          <option value={"/community-districts"}>Community District</option>
          <option value={"/city-council-districts"}>
            City Council District
          </option>
        </Select>
      </FormControl>
    </>
  );
}
