import { PlacementWithLogical } from "@chakra-ui/react";
import { Box, useBreakpointValue } from "@nycplanning/streetscape";
import { useUpdateSearchParams } from "../../utils/utils";
import { MapLayerToggle } from "../MapLayerToggle";

export function LayerVisibilityToggles() {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const capitalProjectsOn = searchParams.get("capitalProjects") !== "off";
  const cbbrOn = searchParams.get("cbbr") !== "off";

  const setCapitalProjects = (next: boolean) =>
    updateSearchParams({ capitalProjects: next ? undefined : "off" });

  const setCbbr = (next: boolean) =>
    updateSearchParams({ cbbr: next ? undefined : "off" });

  const capitalProjectsTooltipCopy = `New York City’s potential, planned, and ongoing capital projects.
  Unmapped projects, such as the purchase of vehicles or digital infrastructure, are not included in this tool.
  `;
  const capitalProjectsBudgetTooltipCopy = `Every year, boards submit prioritized capital budget requests that address local needs.
    Expense requests are not included in this tool. All capital budget requests, mapped and unmapped, are included.
   `;

  const placement =
    useBreakpointValue<PlacementWithLogical>({
      base: "bottom-start",
      md: "right",
    }) ?? "bottom";

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <MapLayerToggle
        id="capital-projects"
        label="Capital Projects"
        isChecked={capitalProjectsOn}
        onChange={(e) => setCapitalProjects(e.target.checked)}
        tooltipLabel={capitalProjectsTooltipCopy}
        tooltipPlacement={placement}
        iconColor="brand.800"
      />
      <MapLayerToggle
        id="cb-capital-budget-requests"
        label="Community Board Capital Budget Requests"
        isChecked={cbbrOn}
        onChange={(e) => setCbbr(e.target.checked)}
        tooltipLabel={capitalProjectsBudgetTooltipCopy}
        tooltipPlacement={placement}
        iconColor="#2B6CB0;"
      />
    </Box>
  );
}
