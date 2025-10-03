import {
  Flex,
  Select,
  NumberInput,
  NumberInputField,
  Text,
} from "@nycplanning/streetscape";
import { FormEvent } from "react";

export interface ProjectAmountMenuInputProps {
  label: string;
  inputValue?: null | string;
  selectValue: string;
  commitmentTotalInputsAreValid: boolean;
  onInputValueChange?: (value: null | string) => void;
  onSelectValueChange?: (value: string) => void;
}
export function ProjectAmountMenuInput({
  label,
  inputValue,
  selectValue = "K",
  commitmentTotalInputsAreValid,
  onInputValueChange = () => null,
  onSelectValueChange = () => null,
}: ProjectAmountMenuInputProps) {
  return (
    <Flex direction={"column"}>
      <Text color="gray.600" fontSize={"xs"} fontWeight={"medium"}>
        {label}
      </Text>
      <Flex>
        <NumberInput
          maxWidth={"4rem"}
          value={inputValue ?? ""}
          isInvalid={!commitmentTotalInputsAreValid}
        >
          <NumberInputField
            borderRightRadius={0}
            onChange={(event) => onInputValueChange(event.target.value)}
          />
        </NumberInput>
        <Select
          iconSize="sm"
          borderLeftRadius={0}
          maxWidth={"4rem"}
          variant="base"
          isCancellable={false}
          onChange={(e: FormEvent<HTMLSelectElement> | undefined) =>
            e && onSelectValueChange(e.currentTarget.value)
          }
          value={selectValue}
          isInvalid={!commitmentTotalInputsAreValid}
        >
          <option value="K">K</option>
          <option value="M">M</option>
          <option value="B">B</option>
        </Select>
      </Flex>
    </Flex>
  );
}
