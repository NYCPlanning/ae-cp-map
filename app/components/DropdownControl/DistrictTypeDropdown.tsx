import { AdminQueryParams } from "~/utils/types";
import { DropdownControlProps, DropdownControl } from ".";
import { SEARCH_PARAMS } from "~/utils/params";

export interface DistrictTypeDropdownProps
  extends Pick<DropdownControlProps, "selectValue"> {
  setAdminParams: (value: AdminQueryParams) => void;
}

export function DistrictTypeDropdown({
  selectValue,
  setAdminParams,
}: DistrictTypeDropdownProps) {
  return (
    <DropdownControl
      formId="districtType"
      formLabel="District Type"
      selectValue={selectValue}
      onSelectValueChange={(nextDistrictType) => {
        if (
          nextDistrictType !== "cd" &&
          nextDistrictType !== "ccd" &&
          nextDistrictType !== null
        )
          throw new Error("invalid district type selected");

        setAdminParams({
          [SEARCH_PARAMS.GEOGRAPHY.DISTRICT_TYPE.KEY]: nextDistrictType,
        });
      }}
      fontWeight="700"
    >
      <option value={"cd"}>Community District</option>
      <option value={"ccd"}>City Council District</option>
    </DropdownControl>
  );
}
