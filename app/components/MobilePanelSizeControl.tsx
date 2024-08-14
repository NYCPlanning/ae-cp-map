import { Box, BoxProps, Hide } from "@nycplanning/streetscape";

export interface MobilePanelSizeControlProps extends BoxProps {
  isExpanded: boolean;
  isExpandedToggle: () => void;
}
export function MobilePanelSizeControl({
  isExpanded,
  isExpandedToggle,
  ...props
}: MobilePanelSizeControlProps) {
  return (
    <Hide above="lg">
      <Box
        height={"4px"}
        width={20}
        backgroundColor={"gray.300"}
        borderRadius="2px"
        alignSelf={"center"}
        role="button"
        aria-label={
          isExpanded
            ? "Collapse project detail panel"
            : "Expand project detail panel"
        }
        onClick={isExpandedToggle}
        {...props}
      />
    </Hide>
  );
}
