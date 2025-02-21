import { Box, Collapse, Flex, Text, VStack } from "@nycplanning/streetscape";
import { Agency, CapitalProject, CapitalProjectBudgeted } from "~/gen";
import { CapitalProjectsListItem } from "./CapitalProjectsListItem";
import { formatFiscalYearRange } from "../../utils/utils";

export interface CapitalProjectsListProps {
  capitalProjects: CapitalProject[];
  agencies: Agency[];
  isExpanded: boolean;
}

export const CapitalProjectsList = ({
  capitalProjects,
  agencies,
  isExpanded,
}: CapitalProjectsListProps) => {
  const listBody =
    capitalProjects.length === 0 ? (
      <Text>Reached end of projects</Text>
    ) : (
      capitalProjects.map((capitalProject) => {
        return (
          <CapitalProjectsListItem
            key={`${capitalProject.managingCode}${capitalProject.id}`}
            capitalProject={capitalProject as CapitalProjectBudgeted}
            agency={
              agencies.find(
                (agency) => agency.initials === capitalProject.managingAgency,
              )?.name
            }
            yearRange={formatFiscalYearRange(
              new Date(capitalProject.minDate),
              new Date(capitalProject.maxDate),
            )}
          />
        );
      })
    );

  return (
    <>
      <Box paddingBottom={4}>
        <Text as={"span"}>Mapped Capital Projects</Text>
      </Box>
      <Collapse in={isExpanded} startingHeight={200}>
        <Flex
          direction={"column"}
          height={{ base: isExpanded ? "70vh" : "100%", lg: "70vh" }}
          overflowX={"hidden"}
          overflowY={"auto"}
        >
          <VStack align={"start"} gap={3}>
            {listBody}
          </VStack>
        </Flex>
      </Collapse>
    </>
  );
};
