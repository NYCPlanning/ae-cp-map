import {
  FormControl,
  FormLabel,
  IconButton,
  Select,
} from "@nycplanning/streetscape";
import { FormEvent, ReactNode } from "react";
export { BoroughDropdown } from "./BoroughDropdown";
export { DistrictTypeDropdown } from "./DistrictTypeDropdown";
export { CommunityDistrictDropdown } from "./CommunityDistrictDropdown";
export { CityCouncilDistrictDropdown } from "./CityCouncilDistrictDropdown";
export { AgencyDropdown } from "./AgencyDropdown";
export { ProjectTypeDropdown } from "./ProjectTypeDropdown";

export interface AdminDropdownProps {
  formId: string;
  formLabel: string;
  onFormLabelClick?: () => void;
  isSelectDisabled?: boolean;
  onSelectValueChange?: (value: null | string) => void;
  selectValue?: null | string;
  children: ReactNode;
}
export function AdminDropdown({
  formId,
  formLabel,
  isSelectDisabled = false,
  onFormLabelClick = () => null,
  onSelectValueChange = () => null,
  selectValue = null,
  children,
}: AdminDropdownProps) {
  return (
    <FormControl id={formId}>
      <FormLabel onClick={onFormLabelClick} pb={0}>
        {formLabel}
      </FormLabel>
      <Select
        isDisabled={isSelectDisabled}
        placeholder="-Select-"
        variant="base"
        onChange={(e: FormEvent<HTMLSelectElement> | undefined) =>
          e &&
          onSelectValueChange(
            e.currentTarget.value === "" ? null : e.currentTarget.value,
          )
        }
        handleCancel={() => onSelectValueChange(null)}
        value={selectValue ?? ""}
        textOverflow={"ellipsis"}
      >
        {children}
      </Select>
    </FormControl>
  );
}
