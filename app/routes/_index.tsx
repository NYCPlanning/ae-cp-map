import { Hide, Button } from "@nycplanning/streetscape";
import { FilterMenu, FilterMenuProps } from "../components/FilterMenu";
import { useState } from "react";
import { useOutletContext } from "@remix-run/react";

export default function Index() {
  const [shouldShowFilterMenu, setShouldShowFilterMenu] = useState(false);
  const contextData = useOutletContext<FilterMenuProps>();
  return (
    <Hide above="lg">
      {shouldShowFilterMenu ? (
        <FilterMenu
          {...contextData}
          onClose={() => {
            setShouldShowFilterMenu(false);
          }}
        ></FilterMenu>
      ) : (
        <Button
          width={"full"}
          maxW={"21.25rem"}
          onClick={() => {
            setShouldShowFilterMenu(true);
          }}
        >
          Filter by Geography
        </Button>
      )}
    </Hide>
  );
}
