import { CityCouncilDistrict } from "~/gen";
import { AdminDropdownProps, AdminDropdown } from ".";
import { AdminParams, DistrictId } from "~/utils/types";
import { analytics } from "../../utils/analytics";

export interface CityCouncilDistrictDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  cityCouncilDistricts: Array<CityCouncilDistrict> | null;
  setAdminParams: (value: AdminParams) => void;
}
export function CityCouncilDistrictDropdown({
  selectValue,
  cityCouncilDistricts,
  setAdminParams,
}: CityCouncilDistrictDropdownProps) {
  const updateDistrictId = (nextDistrictId: DistrictId) => {
    analytics({
      category: "Dropdown Menu",
      action: "Change City Council District",
      name: nextDistrictId,
    });

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
