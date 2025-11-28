import { Checkbox, Text } from "@nycplanning/streetscape";
import type { TypographyProps } from "@chakra-ui/react";

export interface CbbrCheckboxProps {
  checkboxLabel: string;
  checkboxValue: string | number;
  isChecked: boolean;
  onCheckedChange?: (value: string | number, checked: boolean) => void;
  fontWeight?: TypographyProps["fontWeight"];
  fontSize?: TypographyProps["fontSize"];
}

export function CbbrCheckbox({
  checkboxLabel,
  checkboxValue,
  isChecked,
  onCheckedChange = () => null,
  fontWeight = "normal",
  fontSize = "xs",
}: CbbrCheckboxProps) {
  return (
    <Checkbox
      isChecked={isChecked}
      onChange={(e) => onCheckedChange?.(checkboxValue, e.target.checked)}
      colorScheme="gray"
      fontWeight={fontWeight}
      fontSize={fontSize}
      marginBottom={1.8}
      alignItems={"flex-start"}
      sx={{
        "& > span.chakra-checkbox__control": {
          width: 4,
          height: 4,
          marginTop: "3px",
          borderColor: "gray.600",
        },
      }}
    >
      <Text fontSize={"sm"} fontWeight={fontWeight} color={"gray.600"}>
        {checkboxLabel}
      </Text>
    </Checkbox>
  );
}
