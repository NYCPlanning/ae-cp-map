import { CommunityDistrict } from "~/gen";
import { DropdownControl, DropdownControlProps } from ".";
import { AdminQueryParams, BoroughId, BoundaryId } from "~/utils/types";

export interface CommunityDistrictDropdownProps
  extends Pick<DropdownControlProps, "selectValue"> {
  boroughId: BoroughId;
  communityDistricts: Array<CommunityDistrict> | null;
  setAdminParams: (value: AdminQueryParams) => void;
}

export function CommunityDistrictDropdown({
  selectValue,
  boroughId,
  communityDistricts,
  setAdminParams,
}: CommunityDistrictDropdownProps) {
  const updateDistrictId = (nextDistrictId: BoundaryId) => {
    setAdminParams({
      boundaryType: "cd",
      boroughId: boroughId,
      boundaryId: nextDistrictId,
    });
  };

  const communityDistrictOptions = communityDistricts?.map((cd) => (
    <option key={cd.id} value={cd.id}>
      {cd.id}
    </option>
  ));
  return (
    <DropdownControl
      formId="districtId"
      formLabel="District Number"
      isSelectDisabled={communityDistricts === null}
      selectValue={selectValue}
      onSelectValueChange={updateDistrictId}
      marginBottom={0}
      fontWeight="700"
    >
      {communityDistrictOptions}
    </DropdownControl>
  );
}
