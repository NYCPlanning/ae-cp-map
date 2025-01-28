import { FormControl, FormLabel, Select } from "@nycplanning/streetscape";
import { FormEvent, ReactNode } from "react";
import { CloseIcon } from "@chakra-ui/icons";

export { BoroughDropdown } from "./BoroughDropdown";
export { DistrictTypeDropdown } from "./DistrictTypeDropdown";
export { CommunityDistrictDropdown } from "./CommunityDistrictDropdown";
export { CityCouncilDistrictDropdown } from "./CityCouncilDistrictDropdown";

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
        onChange={(e: FormEvent<HTMLSelectElement>) =>
          onSelectValueChange(
            e.currentTarget.value === "" ? null : e.currentTarget.value,
          )
        }
        value={selectValue ?? ""}
      >
        {children}
      </Select>
      {selectValue && (
        <CloseIcon
          style={{
            height: "0.75rem",
            width: "0.75rem",
            position: "absolute",
            bottom: "0.875rem",
            right: "2.5rem",
            border: "1px solid",
            borderRadius: "1rem",
            padding: "2px",
            cursor: "pointer",
          }}
          onClick={() => {
            onSelectValueChange(null);
          }}
        />
      )}
    </FormControl>
  );
}
