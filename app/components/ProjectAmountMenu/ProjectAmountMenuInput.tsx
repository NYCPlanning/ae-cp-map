import { Input, Flex, Select } from "@nycplanning/streetscape";
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
  selectValue,
  commitmentTotalInputsAreValid,
  onInputValueChange = () => null,
  onSelectValueChange = () => null,
}: ProjectAmountMenuInputProps) {
  return (
    <Flex direction={"column"}>
      <p
        style={{
          color: "var(--text-subtle)",
          fontSize: "0.75rem",
          letterSpacing: "0.18px",
        }}
      >
        {label}
      </p>
      <Flex>
        <Input
          maxWidth={"4rem"}
          borderRightRadius={0}
          type={"number"}
          onChange={(event) => onInputValueChange(event.target.value)}
          value={inputValue ?? ""}
          isInvalid={!commitmentTotalInputsAreValid}
        />
        <Select
          iconSize="sm"
          borderLeftRadius={0}
          maxWidth={"4rem"}
          variant="base"
          onChange={(e: FormEvent<HTMLSelectElement>) =>
            onSelectValueChange(e.currentTarget.value)
          }
          value={selectValue ?? "K"}
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
