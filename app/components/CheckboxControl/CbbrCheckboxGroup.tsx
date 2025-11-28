import { FormControl, FormLabel, SpacerProps } from "@nycplanning/streetscape";
import type { TypographyProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface CbbrCheckboxControlProps {
  formId: string;
  formLabel: string;
  fontWeight?: TypographyProps["fontWeight"];
  fontSize?: TypographyProps["fontSize"];
  marginBottom?: SpacerProps["marginBottom"];
  children: ReactNode;
}

export function CbbrCheckboxGroup({
  formId,
  formLabel,
  fontSize,
  fontWeight = "normal",
  marginBottom = 2,
  children,
}: CbbrCheckboxControlProps) {
  return (
    <FormControl id={formId} marginBottom={marginBottom} color="gray.500">
      <FormLabel pb={1} fontSize={fontSize} fontWeight={fontWeight}>
        {formLabel}
      </FormLabel>
      {children}
    </FormControl>
  );
}
