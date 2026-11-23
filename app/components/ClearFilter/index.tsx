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
      alignSelf="start"
      backgroundColor="transparent"
      onClick={handleClear}
      aria-label={ariaLabel}
      fontSize={"sm"}
      variant="tertiary"
      color={"primary.600"}
    >
      {buttonLabel}
    </Button>
  );
}
