import { AdminDropdownProps, AdminDropdown } from ".";

export interface DistrictTypeDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  updateSearchParams: (value: Record<string, string>) => void;
}

export function DistrictTypeDropdown({
  selectValue,
  updateSearchParams,
}: DistrictTypeDropdownProps) {
  const updateDistrictType = (nextDistrictType: string | null) => {
    const nextSearchParams: Record<string, string> =
      nextDistrictType === null ? {} : { districtType: nextDistrictType };
    updateSearchParams(nextSearchParams);
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
