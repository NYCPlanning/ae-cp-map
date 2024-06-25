import { Hide, Button } from "@nycplanning/streetscape";
import { FilterMenu } from "../components/FilterMenu";
import { useState } from "react";

export default function Index() {
  const [shouldShowFilterMenu, setShouldShowFilterMenu] = useState(false);
  return (
    <Hide above="lg">
      {shouldShowFilterMenu ? (
        <FilterMenu
          onClose={() => {
            setShouldShowFilterMenu(false);
          }}
        />
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
