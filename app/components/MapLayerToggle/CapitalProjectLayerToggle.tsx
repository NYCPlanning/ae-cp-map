import {
  getMapLayers,
  getNewMapLayerQueryParams,
  useUpdateSearchParams,
} from "~/utils/utils";
import { MapLayerToggle } from ".";

export function CapitalProjectLayerToggle() {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const layersParam = searchParams.get("layers");
  const layers = getMapLayers(layersParam);
  const capitalProjectsOn = layers.includes("capitalProjects");

  const toggleCapitalProjects = () => {
    const newLayers = getNewMapLayerQueryParams({
      toggledLayer: "capitalProjects",
      currentLayersParam: layersParam,
    });
    updateSearchParams({ layers: newLayers });
  };

  const capitalProjectsTooltipCopy = `New York City’s potential, planned, and ongoing capital projects.
  Unmapped projects, such as the purchase of vehicles or digital infrastructure, are not included in this tool.
  `;

  return (
    <MapLayerToggle
      id="capital-projects-toggle"
      label="Capital Projects"
      isChecked={capitalProjectsOn}
      onChange={toggleCapitalProjects}
      tooltipLabel={capitalProjectsTooltipCopy}
      legendIcon="capital-projects"
    />
  );
}
