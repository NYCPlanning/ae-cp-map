import { Box, Flex, Text, VStack, WrapItem } from "@nycplanning/streetscape";
import { useState } from "react";
import { Agency, CapitalProject } from "~/gen";
import { CapitalProjectsListItem } from "./CapitalProjectsListItem";
import { formatFiscalYearRange, currentDate } from "../../utils/utils";
import { Link, useLocation, useSearchParams } from "@remix-run/react";

export interface CapitalProjectsListProps {
  capitalProjects: CapitalProject[];
  agencies: Agency[];
}

export const CapitalProjectsList = ({
  capitalProjects,
  agencies,
}: CapitalProjectsListProps) => {
  const [isExpanded] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation().pathname;
  const listBody =
    capitalProjects.length === 0 ? (
      <Text>Reached end of projects</Text>
    ) : (
      capitalProjects.map((capitalProject) => {
        return (
          <WrapItem key={`${capitalProject.managingCode}${capitalProject.id}`}>
            <Link
              to={{
                search: `?${searchParams.toString()}`,
                pathname:
                  location +
                  `/${capitalProject.managingCode}/${capitalProject.id}`,
              }}
            >
              <CapitalProjectsListItem
                description={capitalProject.description}
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
            </Link>
          </WrapItem>
        );
      })
    );

  return (
    <>
      <Box
        borderTopWidth={"1px"}
        borderTopColor={"gray.400"}
        paddingTop={"16px"}
      >
        <Text as={"span"}>
          Mapped Capital Projects as of <Text as={"b"}>{currentDate()}</Text>
        </Text>
      </Box>
      <Flex direction={"column"} overflow={"hidden"}>
        <Box
          height={{ base: isExpanded ? "70vh" : "70vh" }}
          overflowY={{ base: "scroll" }}
        >
          <VStack align="stretch" paddingTop={"12px"} gap={"12px"}>
            {listBody}
          </VStack>
        </Box>
      </Flex>
    </>
  );
};
