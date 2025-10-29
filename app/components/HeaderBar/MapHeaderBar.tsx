import { GridItem } from "@nycplanning/streetscape";
import { HeaderBar } from "./HeaderBar";

export function MapHeaderBar({
  clearSelections,
}: {
  clearSelections: () => void;
}) {
  return (
    <GridItem
      zIndex={"1000"}
      backgroundColor={"white"}
      gridColumnStart={"1"}
      gridColumnEnd={"-1"}
      gridRowStart={"1"}
      gridRowEnd={"2"}
      boxShadow={"0 2px 8px 0 rgba(0, 0, 0, 0.16)"}
    >
      <HeaderBar clearSelections={clearSelections} />
    </GridItem>
  );
}
