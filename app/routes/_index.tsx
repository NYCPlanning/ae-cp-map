import { GridItem } from "@nycplanning/streetscape";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import { GoToGeography } from "../components/go-to-geography";

export default function DefaultHome() {
  return (
    <>
      <GridItem
        zIndex={1}
        gridColumnStart={2}
        gridColumnEnd={16}
        gridRowStart={2}
        gridRowEnd={8}
      >
        <GeographyMenu>
          <GeographyTypeSelector />
          <GoToGeography isDisabled />
        </GeographyMenu>
      </GridItem>
    </>
  );
}
