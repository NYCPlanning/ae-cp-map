import { Button } from "@nycplanning/streetscape";
import type { Property } from "csstype";

export interface ClearFilterBtnProps {
  onClear: () => void;
  buttonLabel?: string;
  ariaLabel?: string;
  textAlign?: Property.TextAlign;
  verticalAlign?: string;
}

export function ClearFilterBtn({
  onClear,
  buttonLabel = "Reset Selections",
  ariaLabel,
}: ClearFilterBtnProps) {
  const handleClear = () => {
    try {
      onClear();
    } catch (error) {
      console.error("Error clearing selections:", error);
    }
  };

  return (
    <Button
      width="full"
      onClick={handleClear}
      aria-label={ariaLabel}
      fontSize={"sm"}
      lineHeight={"20px"}
      variant="tertiary"
      textDecoration={"underline"}
      color={"primary.600"}
      role={"button"}
      minHeight={"unset"}
      marginY={3}
      padding={0}
    >
      {buttonLabel}
    </Button>
  );
}
