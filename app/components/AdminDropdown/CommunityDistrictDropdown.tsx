import { CommunityDistrict } from "~/gen";
import { AdminDropdown, AdminDropdownProps } from ".";
import { BoroughId, DistrictId } from "~/root";

export interface CommunityDistrictDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  boroughId: BoroughId;
  updateSearchParams: (value: Record<string, string>) => void;
  communityDistricts: Array<CommunityDistrict> | null;
}
export function CommunityDistrictDropdown({
  selectValue,
  updateSearchParams,
  boroughId,
  communityDistricts,
}: CommunityDistrictDropdownProps) {
  const updateDistrictId = (nextDistrictId: DistrictId) => {
    const districtType = "cd";
    if (boroughId === null) {
      updateSearchParams({
        districtType,
      });
      return;
    }

    if (boroughId !== null && nextDistrictId === null) {
      updateSearchParams({
        districtType,
        boroughId,
      });
      return;
    }
    if (boroughId !== null && nextDistrictId !== null) {
      updateSearchParams({
        districtType,
        boroughId,
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
    <AdminDropdown
      formId="districtId"
      formLabel="District Number"
      isSelectDisabled={communityDistricts === null}
      selectValue={selectValue}
      onSelectValueChange={updateDistrictId}
    >
      {communityDistrictOptions}
    </AdminDropdown>
  );
}
