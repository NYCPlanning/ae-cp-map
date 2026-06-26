import { useUpdateSearchParams } from "~/utils/utils";
import { MapLayerToggle } from ".";

export function FacilitiesLayerToggle() {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const facilitiesOn = searchParams.get("facilities") !== "off";

  const setFacilities = (next: boolean) =>
    updateSearchParams({ facilities: next ? undefined : "off" });

  const tooltipCopy = `Facilities and programs owned, operated, funded, licensed, or certified by a City, State, or Federal agency.`;

  return (
    <MapLayerToggle
      id="facilities"
      label="Facilities"
      isChecked={facilitiesOn}
      onChange={(e) => setFacilities(e.target.checked)}
      tooltipLabel={tooltipCopy}
      legendIcon="facilities"
    />
  );
}
