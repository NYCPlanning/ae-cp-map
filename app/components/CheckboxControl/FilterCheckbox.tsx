import { Checkbox, Text } from "@nycplanning/streetscape";
import type { TypographyProps } from "@chakra-ui/react";

export interface FilterCheckboxProps {
  checkboxLabel: string;
  checkboxValue: string | number;
  isChecked: boolean;
  isIndeterminate?: boolean;
  onCheckedChange?: (value: string | number, checked: boolean) => void;
  fontWeight?: TypographyProps["fontWeight"];
  fontSize?: TypographyProps["fontSize"];
  indentLevel?: number;
}

export function FilterCheckbox({
  checkboxLabel,
  checkboxValue,
  isChecked,
  isIndeterminate = false,
  onCheckedChange = () => null,
  fontWeight = "normal",
  fontSize = "sm",
  indentLevel = 0,
}: FilterCheckboxProps) {
  return (
    <Checkbox
      isChecked={isChecked}
      isIndeterminate={isIndeterminate}
      onChange={(e) => onCheckedChange?.(checkboxValue, e.target.checked)}
      colorScheme="gray"
      fontWeight={fontWeight}
      fontSize={fontSize}
      marginBottom={1.8}
      alignItems={"flex-start"}
      paddingLeft={indentLevel * 2}
      sx={{
        "& > span.chakra-checkbox__control": {
          width: 4,
          height: 4,
          marginTop: "3px",
          borderColor: isChecked ? "primary.500" : "gray.600",
        },
        "& > span.chakra-checkbox__control > div": {
          width: 3,
          height: 3,
        },
      }}
    >
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={"gray.600"}
        textAlign={"left"}
      >
        {checkboxLabel}
      </Text>
    </Checkbox>
  );
}
