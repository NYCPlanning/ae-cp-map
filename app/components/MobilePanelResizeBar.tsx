import { Box, BoxProps, Hide } from "@nycplanning/streetscape";

export interface MobilePanelResizeBarProps extends BoxProps {
  isExpanded: boolean;
  isExpandedToggle: () => void;
}
export function MobilePanelResizeBar({
  isExpanded,
  isExpandedToggle,
  ...props
}: MobilePanelResizeBarProps) {
  return (
    <Hide above="lg">
      <Box
        height={"4px"}
        width={20}
        backgroundColor={"gray.300"}
        borderRadius="2px"
        alignSelf={"center"}
        role="button"
        aria-label={isExpanded ? "Collapse panel" : "Expand panel"}
        onClick={isExpandedToggle}
        {...props}
      />
    </Hide>
  );
}
