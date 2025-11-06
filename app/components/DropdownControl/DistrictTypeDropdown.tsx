import { AdminQueryParams } from "~/utils/types";
import { DropdownControlProps, DropdownControl } from ".";

export interface DistrictTypeDropdownProps
  extends Pick<DropdownControlProps, "selectValue"> {
  setAdminParams: (value: AdminQueryParams) => void;
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
    });
  };

  return (
    <DropdownControl
      formId="districtType"
      formLabel="District Type"
      selectValue={selectValue}
      onSelectValueChange={updateDistrictType}
      fontWeight="700"
    >
      <option value={"cd"}>Community District</option>
      <option value={"ccd"}>City Council District</option>
    </DropdownControl>
  );
}
