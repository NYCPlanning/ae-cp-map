import { CommunityDistrict } from "~/gen";
import { AdminDropdown, AdminDropdownProps } from ".";
import { AdminParams, BoroughId, DistrictId } from "~/root";

export interface CommunityDistrictDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  boroughId: BoroughId;
  setAdminParams: (value: AdminParams) => void;
  communityDistricts: Array<CommunityDistrict> | null;
}
export function CommunityDistrictDropdown({
  selectValue,
  setAdminParams,
  boroughId,
  communityDistricts,
}: CommunityDistrictDropdownProps) {
  const updateDistrictId = (nextDistrictId: DistrictId) => {
    setAdminParams({
      districtType: "cd",
      boroughId,
      districtId: nextDistrictId,
    });
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
