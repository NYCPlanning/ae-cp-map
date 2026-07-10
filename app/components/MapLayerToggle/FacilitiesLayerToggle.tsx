import {
  getMapLayers,
  getNewMapLayerQueryParams,
  useUpdateSearchParams,
} from "~/utils/utils";
import { MapLayerToggle } from ".";

export function FacilitiesLayerToggle() {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const layersParam = searchParams.get("layers");
  const layers = getMapLayers(layersParam);
  const facilitiesOn = layers.includes("facilities");

  const toggleFacilities = () => {
    const newLayers = getNewMapLayerQueryParams({
      toggledLayer: "facilities",
      currentLayersParam: layersParam,
    });
    updateSearchParams({ layers: newLayers });
  };

  const tooltipCopy = `Facilities and programs owned, operated, funded, licensed, or certified by a City, State, or Federal agency.`;

  return (
    <MapLayerToggle
      id="facilities"
      label="Facilities"
      isChecked={facilitiesOn}
      onChange={toggleFacilities}
      tooltipLabel={tooltipCopy}
      legendIcon="facilities"
    />
  );
}
