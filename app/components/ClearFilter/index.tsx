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
      variant="tertiarty"
      textDecoration={"underline"}
      color={"primary.500"}
      textAlign={"right"}
      role={"button"}
      minHeight={"unset"}
      p={0}
    >
      {buttonLabel}
    </Button>
  );
}
