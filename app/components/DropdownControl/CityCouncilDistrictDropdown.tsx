import { CityCouncilDistrict } from "~/gen";
import { DropdownControlProps, DropdownControl } from ".";
import { AdminQueryParams, DistrictId } from "~/utils/types";

export interface CityCouncilDistrictDropdownProps
  extends Pick<DropdownControlProps, "selectValue"> {
  cityCouncilDistricts: Array<CityCouncilDistrict> | null;
  setAdminParams: (value: AdminQueryParams) => void;
}
export function CityCouncilDistrictDropdown({
  selectValue,
  cityCouncilDistricts,
  setAdminParams,
}: CityCouncilDistrictDropdownProps) {
  const updateDistrictId = (nextDistrictId: DistrictId) => {
    setAdminParams({
      districtType: "ccd",
      boroughId: null,
      districtId: nextDistrictId,
    });
  };

  const cityCouncilDistrictOptions = cityCouncilDistricts?.map((cd) => (
    <option key={cd.id} value={cd.id}>
      {cd.id}
    </option>
  ));
  return (
    <DropdownControl
      formId="districtId"
      formLabel="District Number"
      isSelectDisabled={cityCouncilDistricts === null}
      selectValue={selectValue}
      onSelectValueChange={updateDistrictId}
      marginBottom={0}
      fontWeight="700"
    >
      {cityCouncilDistrictOptions}
    </DropdownControl>
  );
}
