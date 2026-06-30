import {
  FormControl,
  FormLabel,
  InfoIcon,
  SpacerProps,
  Tooltip,
} from "@nycplanning/streetscape";
import type { TypographyProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface FilterCheckboxControlProps {
  formId: string;
  formLabel: string;
  fontWeight?: TypographyProps["fontWeight"];
  fontSize?: TypographyProps["fontSize"];
  marginBottom?: SpacerProps["marginBottom"];
  tooltip?: string;
  children: ReactNode;
}

export function FilterCheckboxGroup({
  formId,
  formLabel,
  fontSize,
  fontWeight = "normal",
  marginBottom = 2,
  tooltip,
  children,
}: FilterCheckboxControlProps) {
  return (
    <FormControl
      id={formId}
      marginBottom={marginBottom}
      color="gray.500"
      display={"flex"}
      flexDir={"column"}
    >
      <FormLabel
        pb={1}
        fontSize={fontSize}
        fontWeight={fontWeight}
        display={"flex"}
        gap={1}
      >
        {formLabel}
        {tooltip !== undefined && (
          <Tooltip label={tooltip}>
            <InfoIcon />
          </Tooltip>
        )}
      </FormLabel>
      {children}
    </FormControl>
  );
}
