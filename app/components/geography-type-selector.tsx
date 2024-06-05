import { FormControl, FormLabel, Select } from "@nycplanning/streetscape";
import { useLocation, useNavigate } from "@remix-run/react";
import { ChangeEvent } from "react";

export function GeographyTypeSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  // console.debug("geography selector pathname", pathname.split("/")[1]);
  // console.debug("geography selector location", location);

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
