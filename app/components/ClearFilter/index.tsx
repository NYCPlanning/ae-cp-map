import { Button } from "@nycplanning/streetscape";

export interface ClearFilterBtnProps {
  onClear: () => void;
  buttonLabel?: string;
}

export function ClearFilterBtn({
  onClear,
  buttonLabel = "Reset Selections",
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
      textAlign={"left"}
      role={"button"}
      minHeight={"unset"}
      marginY={3}
      padding={0}
    >
      {buttonLabel}
    </Button>
  );
}
