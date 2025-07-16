import { Button } from "@nycplanning/streetscape";
import { useNavigate } from "react-router";

export interface ClearFilterBtnProps {
  onClear: () => void;
  buttonLabel?: string;
}

export function ClearFilterBtn({
  onClear,
  buttonLabel = "Reset Selections",
}: ClearFilterBtnProps) {
  const navigate = useNavigate();

  const handleClear = () => {
    try {
      onClear();
      navigate("/");
    } catch (error) {
      console.error("Error clearing selections:", error);
    }
  };

  return (
    <Button
      width="full"
      mt={4}
      onClick={handleClear}
      variant="tertiarty"
      textDecoration={"underline"}
      color={"primary.500"}
      padding={0}
      margin={0}
      textAlign={"right"}
      paddingRight={"12px"}
      role={"button"}
    >
      {buttonLabel}
    </Button>
  );
}
