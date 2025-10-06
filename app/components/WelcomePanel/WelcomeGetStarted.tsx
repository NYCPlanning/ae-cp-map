import { useNavigate } from "react-router";
import { Box, Checkbox, type CheckboxProps } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@nycplanning/streetscape";
import { useCallback } from "react";

export const HIDE_WELCOME_KEY = "hide_welcome_message";
export const HIDE_WELCOME_VALUE = "yes";

function getWelcomeKey(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function setWelcomeKey(key: string, value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value);
}

function deleteWelcomeKey(name: string) {
  localStorage.removeItem(`${name}`);
}

export function isWelcomeHidden(welcomeCookieKey: string = HIDE_WELCOME_KEY) {
  return getWelcomeKey(welcomeCookieKey) === HIDE_WELCOME_VALUE;
}

export type WelcomeGetStartedProps = {
  onDismiss: () => void;
  hideWelcomeKey?: string;
  hideWelcomeValue?: string;
  label?: string;
} & Omit<CheckboxProps, "onChange" | "children">;

export function WelcomeGetStarted({
  onDismiss,
  hideWelcomeKey = HIDE_WELCOME_KEY,
  hideWelcomeValue = HIDE_WELCOME_VALUE,
  label = "Don’t show this again",
  ...checkboxProps
}: WelcomeGetStartedProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setWelcomeKey(hideWelcomeKey, hideWelcomeValue);
    } else {
      deleteWelcomeKey(hideWelcomeKey);
    }
  };
  const navigate = useNavigate();
  const handleButtonClick = useCallback(() => {
    navigate("/capital-projects", { replace: true });
    onDismiss();
  }, [navigate, onDismiss]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      boxSizing={"border-box"}
      borderTop={"2px solid"}
      borderColor={"gray.200"}
      sx={{
        scrollbarWidth: "none",
      }}
      height={"min-content"}
    >
      <Checkbox
        onChange={handleChange}
        {...checkboxProps}
        marginBottom={"1rem"}
        marginTop={"1rem"}
      >
        {label}
      </Checkbox>
      <Box width={"161px"}>
        <Button size="md" variant="primary" onClick={handleButtonClick}>
          Get Started
          <ChevronRightIcon />
        </Button>
      </Box>
    </Box>
  );
}
