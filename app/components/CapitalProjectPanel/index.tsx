export { CapitalProjectDetail } from "./CapitalProjectDetail";
export { CapitalCommitmentsTimeline } from "./CapitalCommitmentsTimeline";
export { CapitalCommitmentsTable } from "./CapitalCommitmentsTable";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Show,
} from "@nycplanning/streetscape";
import {
  CapitalProjectDetail,
  CapitalProjectDetailProps,
} from "./CapitalProjectDetail";
import { useState } from "react";
import { MobilePanelResizeBar } from "../MobilePanelResizeBar";
import {
  CapitalCommitmentsTable,
  CapitalCommitmentsTableProps,
} from "./CapitalCommitmentsTable";
import { analytics } from "~/utils/analytics";

export interface CapitalProjectPanelProps
  extends CapitalProjectDetailProps,
    CapitalCommitmentsTableProps {}

export function CapitalProjectPanel(props: CapitalProjectPanelProps) {
  const [commitmentsAreVisible, setCommitmentsAreVisible] = useState(false);

  const toggleCommitmentsAreVisible = () => {
    if (commitmentsAreVisible) {
      analytics({
        category: "Accordion",
        action: "Toggle Commitment Details Accordion",
        name: "Closed",
      });
    } else {
      analytics({
        category: "Accordion",
        action: "Toggle Commitment Details Accordion",
        name: "Open",
      });
    }
    setCommitmentsAreVisible((commitmentsAreVisible) => !commitmentsAreVisible);
  };
  return (
    <Flex
      borderTopRadius={"base"}
      borderBottomRadius={{ base: "0", lg: "base" }}
      background={"white"}
      direction={"column"}
      width={"full"}
      maxW={{ lg: "unset" }}
      boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
      position={{ base: "fixed", lg: "static" }}
      maxHeight={{ lg: "90vh" }}
      overflow={{ lg: "auto" }}
    >
      <MobilePanelResizeBar
        isExpanded={commitmentsAreVisible}
        isExpandedToggle={toggleCommitmentsAreVisible}
        marginTop={"0.75rem"}
      />
      <CapitalProjectDetail
        capitalProject={props.capitalProject}
        managingAgencies={props.managingAgencies}
        capitalCommitments={props.capitalCommitments}
        onNavigationClick={props.onNavigationClick}
      />
      <Show below="lg">
        <Collapse in={commitmentsAreVisible}>
          <Flex paddingY={3} direction={"column"} maxHeight={"30vh"}>
            <Heading
              fontSize="sm"
              fontWeight={"bold"}
              paddingX={3}
              paddingBottom={3}
            >
              Commitment Details
            </Heading>
            <CapitalCommitmentsTable
              capitalCommitments={props.capitalCommitments}
              capitalCommitmentTypes={props.capitalCommitmentTypes}
            />
          </Flex>
        </Collapse>
      </Show>
      <Show above="lg">
        <Flex
          direction={"column"}
          backgroundColor="gray.50"
          paddingX={4}
          paddingBottom={commitmentsAreVisible ? 4 : 0}
          borderBottomRadius={"base"}
          maxHeight={"40vh"}
        >
          <Flex align={"center"} justifyContent={"space-between"}>
            <Heading fontSize={"lg"} fontWeight={"bold"}>
              Commitment Details
            </Heading>
            <IconButton
              aria-label="Close project detail panel"
              icon={
                commitmentsAreVisible ? (
                  <ChevronUpIcon boxSize={10} />
                ) : (
                  <ChevronDownIcon boxSize={10} />
                )
              }
              color={"gray.600"}
              backgroundColor={"inherit"}
              _hover={{
                border: "none",
                backgroundColor: "blackAlpha.100",
              }}
              onClick={toggleCommitmentsAreVisible}
            />
          </Flex>
          <Collapse in={commitmentsAreVisible}>
            <CapitalCommitmentsTable
              capitalCommitments={props.capitalCommitments}
              capitalCommitmentTypes={props.capitalCommitmentTypes}
            />
          </Collapse>
        </Flex>
      </Show>
    </Flex>
  );
}
