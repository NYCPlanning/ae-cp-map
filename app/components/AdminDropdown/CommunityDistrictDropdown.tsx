import { CommunityDistrict } from "~/gen";
import { AdminDropdown, AdminDropdownProps } from ".";
import { AdminParams, BoroughId, DistrictId } from "~/utils/types";

export interface CommunityDistrictDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  boroughId: BoroughId;
  communityDistricts: Array<CommunityDistrict> | null;
  setAdminParams: (value: AdminParams) => void;
}

export function CommunityDistrictDropdown({
  selectValue,
  boroughId,
  communityDistricts,
  setAdminParams,
}: CommunityDistrictDropdownProps) {
  const updateDistrictId = (nextDistrictId: DistrictId) => {
    setAdminParams({
      districtType: "cd",
      boroughId: boroughId,
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
