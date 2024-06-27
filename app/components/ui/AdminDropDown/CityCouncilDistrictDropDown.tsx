import { BoroId, DistrictId } from "~/components/FilterMenu";
import { CityCouncilDistrict, CommunityDistrict } from "~/gen";
import { AdminDropDown, AdminDropDownProps } from ".";

export interface CityCouncilDistrictDropDownProps
  extends Pick<AdminDropDownProps, "selectValue"> {
  updateSearchParams: (value: Record<string, string>) => void;
  cityCouncilDistricts: Array<CityCouncilDistrict> | null;
}
export function CityCouncilDistrictDropDown({
  selectValue,
  updateSearchParams,
  cityCouncilDistricts,
}: CityCouncilDistrictDropDownProps) {
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
    <AdminDropDown
      formId="districtId"
      formLabel="District Number"
      isSelectDisabled={cityCouncilDistricts === null}
      selectValue={selectValue}
      onSelectValueChange={updateDistrictId}
    >
      {cityCouncilDistrictOptions}
    </AdminDropDown>
  );
}
