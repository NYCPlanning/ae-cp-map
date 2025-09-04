import {
  Box,
  Collapse,
  Flex,
  Heading,
  Text,
  VStack,
} from "@nycplanning/streetscape";
import { Agency, CapitalProject, CapitalProjectBudgeted } from "~/gen";
import { CapitalProjectsListItem } from "./CapitalProjectsListItem";
import { formatFiscalYearRange } from "../../utils/utils";
import { WarningIcon } from "@chakra-ui/icons";
import { showRedesign } from "~/utils/envFlags";

export interface CapitalProjectsListProps {
  capitalProjects: CapitalProject[];
  agencies: Agency[];
  capitalProjectsTotal: number;
  isExpanded: boolean;
}

export const CapitalProjectsList = ({
  capitalProjects,
  agencies,
  capitalProjectsTotal,
  isExpanded,
}: CapitalProjectsListProps) => {
  if (capitalProjectsTotal === 0) {
    return (
      <Flex
        bg={"gray.50"}
        paddingY={3}
        paddingX={2}
        borderRadius={"base"}
        width={"100%"}
      >
        <WarningIcon color={"state.warning"} fontSize={"1.5rem"} margin={2} />
        <VStack align="start" gap={0}>
          <Heading color="gray.600" fontWeight={"medium"}>
            No results
          </Heading>
          <Text textStyle="micro">
            No available results with current filters applied.
          </Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <>
      <Box paddingBottom={4}>
        <Text as={"span"}>Mapped Capital Projects</Text>
      </Box>
      <Collapse in={isExpanded} startingHeight={600}>
        <Flex
          direction={"column"}
          className={"insideCollapse"}
          height={{
            base: isExpanded ? "78dvh" : "100%",
            md: showRedesign ? "70dvh" : "",
            lg: showRedesign ? "65dvh" : "70dvh",
          }}
          overflowX={"hidden"}
          overflowY={"auto"}
        >
          <VStack align={"start"} gap={3}>
            {capitalProjects.map((capitalProject) => {
              return (
                <CapitalProjectsListItem
                  key={`${capitalProject.managingCode}${capitalProject.id}`}
                  capitalProject={capitalProject as CapitalProjectBudgeted}
                  agency={
                    agencies.find(
                      (agency) =>
                        agency.initials === capitalProject.managingAgency,
                    )?.name
                  }
                  yearRange={formatFiscalYearRange(
                    new Date(capitalProject.minDate),
                    new Date(capitalProject.maxDate),
                  )}
                />
              );
            })}
          </VStack>
        </Flex>
      </Collapse>
    </>
  );
};
