import { FormControl, FormLabel, Select } from "@nycplanning/streetscape";
import { FormEvent, ReactNode } from "react";

export { BoroughDropDown } from "./BoroughDropDown";
export { DistrictTypeDropDown } from "./DistrictTypeDropDown";
export interface AdminDropDownProps {
  formId: string;
  formLabel: string;
  onFormLabelClick?: () => void;
  isSelectDisabled?: boolean;
  onSelectValueChange?: (value: null | string) => void;
  selectValue?: null | string;
  children: ReactNode;
}
export function AdminDropDown({
  formId,
  formLabel,
  isSelectDisabled = false,
  onFormLabelClick = () => null,
  onSelectValueChange = () => null,
  selectValue = null,
  children,
}: AdminDropDownProps) {
  return (
    <FormControl id={formId}>
      <FormLabel onClick={onFormLabelClick}>{formLabel}</FormLabel>
      <Select
        isDisabled={isSelectDisabled}
        placeholder="-Select-"
        variant="base"
        onChange={(e: FormEvent<HTMLSelectElement>) =>
          onSelectValueChange(
            e.currentTarget.value === "" ? null : e.currentTarget.value,
          )
        }
        value={selectValue ?? ""}
      >
        {children}
      </Select>
    </FormControl>
  );
}
