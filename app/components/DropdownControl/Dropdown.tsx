import { TypographyProps } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Select,
  SpacerProps,
} from "@nycplanning/streetscape";
import { FormEvent, ReactNode } from "react";

export interface DropdownControlProps {
  formId: string;
  formLabel: string;
  onFormLabelClick?: () => void;
  isSelectDisabled?: boolean;
  onSelectValueChange?: (value: null | string) => void;
  selectValue?: null | string | number;
  fontWeight?: TypographyProps["fontWeight"];
  placeholder?: string;
  marginBottom?: SpacerProps["marginBottom"];
  children: ReactNode;
}

export function DropdownControl({
  formId,
  formLabel,
  isSelectDisabled = false,
  onFormLabelClick = () => null,
  onSelectValueChange = () => null,
  selectValue = null,
  fontWeight = "normal",
  placeholder = "-Select-",
  marginBottom = 2,
  children,
}: DropdownControlProps) {
  return (
    <FormControl id={formId} marginBottom={marginBottom} color="gray.500">
      <FormLabel
        onClick={onFormLabelClick}
        pb={1}
        fontSize={"xs"}
        fontWeight={fontWeight}
      >
        {formLabel}
      </FormLabel>
      <Select
        isDisabled={isSelectDisabled}
        placeholder={placeholder}
        onChange={(e: FormEvent<HTMLSelectElement> | undefined) =>
          e &&
          onSelectValueChange(
            e.currentTarget.value === "" ? null : e.currentTarget.value,
          )
        }
        handleCancel={() => onSelectValueChange(null)}
        value={selectValue !== null ? selectValue : ""}
        textOverflow={"ellipsis"}
        color="gray.600"
        borderColor="gray.600"
        borderRadius="lg"
      >
        {children}
      </Select>
    </FormControl>
  );
}
