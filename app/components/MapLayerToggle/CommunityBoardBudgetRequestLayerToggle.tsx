import { useUpdateSearchParams } from "~/utils/utils";
import { MapLayerToggle } from ".";

export function CommunityBoardBudgetRequestLayerToggle() {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const cbbrOn = searchParams.get("cbbr") !== "off";

  const setCbbr = (next: boolean) =>
    updateSearchParams({ cbbr: next ? undefined : "off" });

  const capitalProjectsBudgetTooltipCopy = `Every year, boards submit prioritized capital budget requests that address local needs.
    Expense requests are not included in this tool. All capital budget requests, mapped and unmapped, are included.
   `;

  return (
    <MapLayerToggle
      id="cb-capital-budget-requests"
      label="Community Board Capital Budget Requests"
      isChecked={cbbrOn}
      onChange={(e) => setCbbr(e.target.checked)}
      tooltipLabel={capitalProjectsBudgetTooltipCopy}
      iconColor="#2B6CB0;"
      legendIcon="cbbrs"
    />
  );
}
