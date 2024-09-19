import { AdminDropdownProps, AdminDropdown } from ".";

export interface DistrictTypeDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  updateSearchParams: (value: Record<string, string | null>) => void;
}

export function DistrictTypeDropdown({
  selectValue,
  updateSearchParams,
}: DistrictTypeDropdownProps) {
  const updateDistrictType = (nextDistrictType: string | null) => {
    const nextSearchParams: Record<string, string | null> =
      nextDistrictType === null
        ? {
            districtType: null,
            boroughId: null,
            districtId: null,
          }
        : {
            districtType: nextDistrictType,
            districtId: null,
            boroughId: null,
          };
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
