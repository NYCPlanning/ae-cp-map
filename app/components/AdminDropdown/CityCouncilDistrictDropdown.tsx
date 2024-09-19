import { CityCouncilDistrict } from "~/gen";
import { AdminDropdownProps, AdminDropdown } from ".";
import { AdminParams, DistrictId } from "~/root";

export interface CityCouncilDistrictDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  setAdminParams: (value: AdminParams) => void;
  cityCouncilDistricts: Array<CityCouncilDistrict> | null;
}
export function CityCouncilDistrictDropdown({
  selectValue,
  setAdminParams,
  cityCouncilDistricts,
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
    <AdminDropdown
      formId="districtId"
      formLabel="District Number"
      isSelectDisabled={cityCouncilDistricts === null}
      selectValue={selectValue}
      onSelectValueChange={updateDistrictId}
    >
      {cityCouncilDistrictOptions}
    </AdminDropdown>
  );
}
