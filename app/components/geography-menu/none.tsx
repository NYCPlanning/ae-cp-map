import { GeographyMenuBase } from "./base";
import { GoToGeography } from "../ui/buttons/go-to-geography";

export function GeographyMenuNone() {
  return (
    <GeographyMenuBase>
      <GoToGeography isDisabled />
    </GeographyMenuBase>
  );
}
