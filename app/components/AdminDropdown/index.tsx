import {
  FormControl,
  FormLabel,
  IconButton,
  Select,
} from "@nycplanning/streetscape";
import { FormEvent, ReactNode } from "react";
import { CloseIcon } from "@chakra-ui/icons";

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
        onChange={(e: FormEvent<HTMLSelectElement>) =>
          onSelectValueChange(
            e.currentTarget.value === "" ? null : e.currentTarget.value,
          )
        }
        value={selectValue ?? ""}
        textOverflow={"ellipsis"}
      >
        {children}
      </Select>
      {selectValue && (
        <IconButton
          aria-label={`Clear ${formLabel}`}
          variant="ghost"
          _focus={{
            border: 0,
            svg: {
              backgroundColor: "gray.200",
            },
          }}
          pos={"absolute"}
          minH={"unset"}
          minW={"unset"}
          height={"min-content"}
          width={"min-content"}
          bottom={2}
          right={10}
          cursor={"pointer"}
          onClick={() => {
            onSelectValueChange(null);
          }}
          icon={
            <CloseIcon
              boxSize={3}
              p={0.5}
              border={"1px solid"}
              borderRadius={16}
            />
          }
        />
      )}
    </FormControl>
  );
}
