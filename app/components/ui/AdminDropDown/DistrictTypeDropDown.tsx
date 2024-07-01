import { AdminDropDown, AdminDropDownProps } from ".";

export interface DistrictTypeDropDownProps
  extends Pick<AdminDropDownProps, "selectValue"> {
  updateSearchParams: (value: Record<string, string>) => void;
}

export function DistrictTypeDropDown({
  selectValue,
  updateSearchParams,
}: DistrictTypeDropDownProps) {
  const updateDistrictType = (nextDistrictType: string | null) => {
    const nextSearchParams: Record<string, string> =
      nextDistrictType === null ? {} : { districtType: nextDistrictType };
    updateSearchParams(nextSearchParams);
  };

  return (
    <AdminDropDown
      formId="districtType"
      formLabel="District Type"
      selectValue={selectValue}
      onSelectValueChange={updateDistrictType}
    >
      <option value={"cd"}>Community District</option>
      <option value={"ccd"}>City Council District</option>
    </AdminDropDown>
  );
}
