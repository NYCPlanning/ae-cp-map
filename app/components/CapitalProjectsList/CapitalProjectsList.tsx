import { Box, Flex, Text, VStack } from "@nycplanning/streetscape";
import { useState } from "react";
import { Agency, CapitalProject, CapitalProjectBudgeted } from "~/gen";
import { CapitalProjectsListItem } from "./CapitalProjectsListItem";
import { formatFiscalYearRange, currentDate } from "../../utils/utils";

export interface CapitalProjectsListProps {
  capitalProjects: CapitalProject[];
  agencies: Agency[];
}

export const CapitalProjectsList = ({
  capitalProjects,
  agencies,
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
        <Text as={"span"}>
          Mapped Capital Projects as of <Text as={"b"}>{currentDate()}</Text>
        </Text>
      </Box>
      <Flex direction={"column"} overflow={"hidden"}>
        <Box height={"70vh"} overflowY={{ base: "scroll" }}>
          <VStack align={"start"} gap={3}>
            {listBody}
          </VStack>
        </Box>
      </Flex>
    </>
  );
};
