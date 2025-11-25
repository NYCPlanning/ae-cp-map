import { CommunityDistrict } from "~/gen";
import { DropdownControl, DropdownControlProps } from ".";
import { AdminQueryParams, BoroughId, DistrictId } from "~/utils/types";

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
      onSelectValueChange={(nextDistrictId) => {
        if (typeof nextDistrictId !== "string")
          throw new Error("Unexpected type for borough id. Expected string");
        setAdminParams({
          districtType: "cd",
          boroughId: boroughId,
          districtId: nextDistrictId,
        });
      }}
      marginBottom={0}
      fontWeight="700"
    >
      {communityDistrictOptions}
    </DropdownControl>
  );
}
