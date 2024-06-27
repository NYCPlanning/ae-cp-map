import { CommunityDistrict } from "~/gen";
import { AdminDropDown, AdminDropDownProps } from ".";
import { BoroId, DistrictId } from "~/components/FilterMenu";

export interface CommunityDistrictDropDownProps
  extends Pick<AdminDropDownProps, "selectValue"> {
  boroId: BoroId;
  updateSearchParams: (value: Record<string, string>) => void;
  communityDistricts: Array<CommunityDistrict> | null;
}
export function CommunityDistrictDropDown({
  selectValue,
  updateSearchParams,
  boroId,
  communityDistricts,
}: CommunityDistrictDropDownProps) {
  const updateDistrictId = (nextDistrictId: DistrictId) => {
    const districtType = "cd";
    if (boroId === null) {
      updateSearchParams({
        districtType,
      });
      return;
    }

    if (boroId !== null && nextDistrictId === null) {
      updateSearchParams({
        districtType,
        boroId,
      });
      return;
    }
    if (boroId !== null && nextDistrictId !== null) {
      updateSearchParams({
        districtType,
        boroId,
        districtId: nextDistrictId,
      });
      return;
    }
  };
  const communityDistrictOptions = communityDistricts?.map((cd) => (
    <option key={cd.id} value={cd.id}>
      {cd.id}
    </option>
  ));
  return (
    <AdminDropDown
      formId="districtId"
      formLabel="District Number"
      isSelectDisabled={communityDistricts === null}
      selectValue={selectValue}
      onSelectValueChange={updateDistrictId}
    >
      {communityDistrictOptions}
    </AdminDropDown>
  );
}
