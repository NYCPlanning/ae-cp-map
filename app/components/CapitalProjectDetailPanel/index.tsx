import { Box, Flex, Show } from "@nycplanning/streetscape";
import { Collapse } from "@chakra-ui/transition";
import {
  CapitalProjectDetail,
  CapitalProjectDetailProps,
} from "./CapitalProjectDetail";
import { useState } from "react";
import { MobilePanelResizeBar } from "../MobilePanelResizeBar";
export { CapitalProjectDetail } from "./CapitalProjectDetail";

export type CapitalProjectDetailPanelProps = CapitalProjectDetailProps;

export function CapitalProjectDetailPanel(
  props: CapitalProjectDetailPanelProps,
) {
  const [panelIsFullSize, setPanelIsFullSize] = useState(false);

  const togglePanelIsFullSize = () =>
    setPanelIsFullSize((panelIsFullSize) => !panelIsFullSize);
  return (
    <Flex
      borderTopRadius={"base"}
      borderBottomRadius={{ base: "0", lg: "base" }}
      background={"white"}
      direction={"column"}
      width={{ base: "full", lg: "21.25rem" }}
      maxW={{ lg: "unset" }}
      boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
      position={{ base: "fixed", lg: "static" }}
    >
      <MobilePanelResizeBar
        isExpanded={panelIsFullSize}
        isExpandedToggle={togglePanelIsFullSize}
        marginTop={"0.75rem"}
      />
      <CapitalProjectDetail
        capitalProject={props.capitalProject}
        agencies={props.agencies}
        navigationBtn={props.navigationBtn}
        onNavigationClick={props.onNavigationClick}
      />
      <Show below="lg">
        <Collapse in={panelIsFullSize}>
          {/* Placeholder for commitments */}
          <Box height={"100px"} />
        </Collapse>
      </Show>
    </Flex>
  );
}
