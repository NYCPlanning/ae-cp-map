import { useState } from "react";
import { Button } from "@nycplanning/streetscape";
import { useNavigate } from "@remix-run/react";

export interface ClearFilterBtnProps {
  onClear: () => void;
  buttonLabel?: string;
}

export function ClearFilterBtn({
  onClear,
  buttonLabel = "Reset Selections",
}: ClearFilterBtnProps) {
  const [isClearing, setIsClearing] = useState(false);
  const navigate = useNavigate();

  const handleClear = async () => {
    setIsClearing(true);
    try {
      await onClear();
      navigate("/");
    } catch (error) {
      console.error("Error clearing selections:", error);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <Button width="full" mt={4} onClick={handleClear} isDisabled={isClearing}>
      {buttonLabel}
    </Button>
  );
}
