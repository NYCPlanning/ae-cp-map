import { Button } from "@nycplanning/streetscape";
import type { Property } from "csstype";

export interface ClearFilterBtnProps {
  onClear: () => void;
  buttonLabel?: string;
  textAlign?: Property.TextAlign;
  verticalAlign?: string;
}

export function ClearFilterBtn({
  onClear,
  buttonLabel = "Reset Selections",
  textAlign = "left",
  verticalAlign = "initial",
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
      fontSize={"sm"}
      lineHeight={"20px"}
      variant="tertiarty"
      textDecoration={"underline"}
      color={"primary.600"}
      textAlign={textAlign}
      role={"button"}
      minHeight={"unset"}
      marginY={3}
      padding={0}
      verticalAlign={verticalAlign}
    >
      {buttonLabel}
    </Button>
  );
}
