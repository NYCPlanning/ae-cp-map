import { AdminParams } from "~/utils/types";
import { AdminDropdownProps, AdminDropdown } from ".";

export interface DistrictTypeDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  setAdminParams: (value: AdminParams) => void;
}

export function DistrictTypeDropdown({
  selectValue,
  setAdminParams,
}: DistrictTypeDropdownProps) {
  const updateDistrictType = (nextDistrictType: string | null) => {
    if (
      nextDistrictType !== "cd" &&
      nextDistrictType !== "ccd" &&
      nextDistrictType !== null
    )
      throw new Error("invalid district type selected");

    setAdminParams({
      districtType: nextDistrictType,
      boroughId: null,
      districtId: null,
    });
  };

  return (
    <AdminDropdown
      formId="districtType"
      formLabel="District Type"
      selectValue={selectValue}
      onSelectValueChange={updateDistrictType}
    >
      <option value={"cd"}>Community District</option>
      <option value={"ccd"}>City Council District</option>
    </AdminDropdown>
  );
}
