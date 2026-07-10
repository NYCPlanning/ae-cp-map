import {
  getMapLayers,
  getNewMapLayerQueryParams,
  useUpdateSearchParams,
} from "~/utils/utils";
import { MapLayerToggle } from ".";

export function CommunityBoardBudgetRequestLayerToggle() {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const layersParam = searchParams.get("layers");
  const layers = getMapLayers(layersParam);

  const cbbrOn = layers.includes("cbbr");

  const toggleCbbr = () => {
    const newLayers = getNewMapLayerQueryParams({
      toggledLayer: "cbbr",
      currentLayersParam: layersParam,
    });
    updateSearchParams({ layers: newLayers });
  };

  const cbbrTooltipCopy = `Every year, boards submit prioritized capital budget requests that address local needs.
    Expense requests are not included in this tool. All capital budget requests, mapped and unmapped, are included.
   `;

  return (
    <MapLayerToggle
      id="cb-capital-budget-requests"
      label="Community Board Capital Budget Requests"
      isChecked={cbbrOn}
      onChange={toggleCbbr}
      tooltipLabel={cbbrTooltipCopy}
      legendIcon="cbbrs"
    />
  );
}
