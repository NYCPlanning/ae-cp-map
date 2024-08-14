import { Flex } from "@nycplanning/streetscape";
import { MobilePanelSizeControl } from "../MobilePanelSizeControl";
import {
  CapitalProjectDetail,
  CapitalProjectDetailProps,
} from "./CapitalProjectDetail";
import { useState } from "react";
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
      height={{ base: panelIsFullSize ? "90vh" : "auto", lg: "auto" }}
      boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
      position={{ base: "fixed", lg: "static" }}
    >
      <MobilePanelSizeControl
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
    </Flex>
  );
}
