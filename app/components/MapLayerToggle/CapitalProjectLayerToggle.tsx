import { useUpdateSearchParams } from "~/utils/utils";
import { MapLayerToggle } from ".";
import { SEARCH_PARAMS } from "~/utils/params";

export function CapitalProjectLayerToggle() {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const capitalProjectsOn = searchParams.get("capitalProjects") !== "off";

  const setCapitalProjects = (next: boolean) =>
    updateSearchParams({
      [SEARCH_PARAMS.LAYER.CAPITAL_PROJECT.KEY]: next ? undefined : "off",
    });

  const capitalProjectsTooltipCopy = `New York City’s potential, planned, and ongoing capital projects.
  Unmapped projects, such as the purchase of vehicles or digital infrastructure, are not included in this tool.
  `;

  return (
    <MapLayerToggle
      id="capital-projects-toggle"
      label="Capital Projects"
      isChecked={capitalProjectsOn}
      onChange={(e) => setCapitalProjects(e.target.checked)}
      tooltipLabel={capitalProjectsTooltipCopy}
      iconColor="brand.800"
    />
  );
}
