import { CityCouncilDistrict } from "~/gen";
import { AdminDropdownProps, AdminDropdown } from ".";
import { DistrictId } from "~/root";

export interface CityCouncilDistrictDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  updateSearchParams: (value: Record<string, string>) => void;
  cityCouncilDistricts: Array<CityCouncilDistrict> | null;
}
export function CityCouncilDistrictDropdown({
  selectValue,
  updateSearchParams,
  cityCouncilDistricts,
}: CityCouncilDistrictDropdownProps) {
  const updateDistrictId = (nextDistrictId: DistrictId) => {
    const districtType = "ccd";

    if (nextDistrictId === null) {
      updateSearchParams({
        districtType,
      });
      return;
    }
    if (nextDistrictId !== null) {
      updateSearchParams({
        districtType,
        districtId: nextDistrictId,
      });
      return;
    }
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
