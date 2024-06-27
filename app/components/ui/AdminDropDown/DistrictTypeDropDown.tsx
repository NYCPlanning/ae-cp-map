import { AdminDropDown, AdminDropDownProps } from ".";

export type DistrictTypeDropDownProps = Pick<
  AdminDropDownProps,
  "onSelectValueChange" | "selectValue"
>;

export function DistrictTypeDropDown({
  selectValue,
  onSelectValueChange,
}: DistrictTypeDropDownProps) {
  return (
    <AdminDropDown
      formId="districtType"
      formLabel="District Type"
      selectValue={selectValue}
      onSelectValueChange={onSelectValueChange}
    >
      <option value={"cd"}>Community District</option>
      <option value={"ccd"}>City Council District</option>
    </AdminDropDown>
  );
}
