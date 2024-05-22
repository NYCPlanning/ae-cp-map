import { Flex, Button, Hide, Show } from "@nycplanning/streetscape";
import { ReactNode, useState } from "react";
import { FilterMenu } from "./FilterMenu";

export const Overlay = () => {
  const [shouldShowFilterMenu, setShouldShowFilterMenu] = useState(false);

  return (
    <Flex
      position="relative"
      padding={{ base: 3, lg: 8 }}
      height={"100vh"}
      width={"100vw"}
      direction={{ base: "column", lg: "row" }}
      justify={{ base: "flex-end", lg: "flex-start" }}
      align={{ base: "center", lg: "flex-start" }}
      pointerEvents={"none"}
      sx={{
        "*": {
          pointerEvents: "auto",
        },
      }}
    >
      <Show above="lg">
        <FilterMenu onClose={() => setShouldShowFilterMenu(false)} />
      </Show>
      {shouldShowFilterMenu ? (
        <Hide above="lg">
          <FilterMenu onClose={() => setShouldShowFilterMenu(false)} />
        </Hide>
      ) : null}
      {!shouldShowFilterMenu ? (
        <Hide above="lg">
          <Button
            width={"full"}
            maxW={"21.25rem"}
            onClick={() => {
              setShouldShowFilterMenu(true);
            }}
          >
            Filter by Geography
          </Button>
        </Hide>
      ) : null}
    </Flex>
  );
};

export interface OverlayProps {
  children: ReactNode;
}
