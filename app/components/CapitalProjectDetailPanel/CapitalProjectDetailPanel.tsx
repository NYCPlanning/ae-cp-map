import { useState } from "react";
import { getYear, getMonth, compareAsc } from "date-fns";
import numbro from "numbro";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  Wrap,
  WrapItem,
  IconButton,
  Hide,
} from "@nycplanning/streetscape";
import { CapitalProjectBudgeted, Agency } from "../../gen";

export interface CapitalProjectDetailPanelProps {
  capitalProject: CapitalProjectBudgeted;
  agencies: Agency[];
  onClose: () => void;
}

const getFiscalYearForDate = (date: Date): number => {
  const year = getYear(date);
  const month = getMonth(date);
  return month <= 6 ? year : year + 1;
};

const formatFiscalYearRange = (minDate: Date, maxDate: Date) => {
  return compareAsc(minDate, maxDate) === 0
    ? `FY${getFiscalYearForDate(minDate)}`
    : `FY${getFiscalYearForDate(minDate)} - FY${getFiscalYearForDate(maxDate)}`;
};

export const CapitalProjectDetailPanel = ({
  capitalProject,
  agencies,
  onClose,
}: CapitalProjectDetailPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Flex
      borderTopRadius={"base"}
      borderBottomRadius={{ base: "0", lg: "base" }}
      padding={{ base: 3, lg: 4 }}
      background={"white"}
      direction={"column"}
      width={{ base: "full", lg: "21.25rem" }}
      maxW={{ lg: "unset" }}
      boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
      gap={4}
    >
      <Hide above="lg">
        <Box
          height={"4px"}
          width={20}
          backgroundColor={"gray.300"}
          borderRadius="2px"
          alignSelf={"center"}
          role="button"
          aria-label={
            isExpanded
              ? "Collapse project detail panel"
              : "Expand project detail panel"
          }
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        />
      </Hide>
      <HStack
        align={"start"}
        borderBottom={"1px"}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        paddingBottom={"0.5rem"}
      >
        <IconButton
          aria-label="Close project detail panel"
          icon={<ChevronLeftIcon boxSize={10} />}
          color={"black"}
          backgroundColor={"white"}
          _hover={{
            border: "none",
            backgroundColor: "blackAlpha.100",
          }}
          onClick={onClose}
        />
        <Heading color="gray.600" fontWeight={"bold"} fontSize={"lg"}>
          {capitalProject.description}
        </Heading>
      </HStack>
      <Box>
        <Box display={"flex"}>
          <Heading
            color="gray.600"
            fontWeight={"bold"}
            minWidth={"fit-content"}
          >
            Project ID:&nbsp;
          </Heading>
          <Text>
            {capitalProject.managingCode}
            {capitalProject.id}
          </Text>
        </Box>
        <Box display={"flex"}>
          <Heading
            color="gray.600"
            fontWeight={"bold"}
            minWidth={"fit-content"}
          >
            Project Type:&nbsp;
          </Heading>
          <Wrap spacing={1}>
            {capitalProject.budgetTypes.map((budgetType) => (
              <WrapItem key={budgetType}>
                <Text
                  as={"span"}
                  display={"inline-block"}
                  width="auto"
                  paddingX={1}
                  paddingY={0.5}
                  borderRadius={"0.5rem"}
                  backgroundColor={"gray.100"}
                >
                  {budgetType}
                </Text>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Box>
      <Flex
        height={{ base: isExpanded ? "436px" : "132px", lg: "auto" }}
        overflowY={{ base: "scroll", lg: "auto" }}
        direction={"column"}
        transition={"height 0.5s ease-in-out"}
        gap={4}
      >
        <Box
          backgroundColor="gray.50"
          paddingY={3}
          paddingX={2}
          borderRadius={"base"}
        >
          <Box>
            <Text fontSize={"sm"}>Managing Agency</Text>
            <Heading color="gray.600" fontWeight={"medium"}>
              {
                agencies.find(
                  (agency) => agency.initials === capitalProject.managingAgency,
                )?.name
              }
            </Heading>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            marginTop={"0.5rem"}
          >
            <Box display={"flex"} flexDirection={"column"} textAlign={"left"}>
              <Text fontSize={"sm"}>Commitments</Text>
              <Heading color="primary.600" fontWeight={"bold"}>
                {formatFiscalYearRange(
                  new Date(capitalProject.minDate),
                  new Date(capitalProject.maxDate),
                )}
              </Heading>
            </Box>
            <Box display={"flex"} flexDirection={"column"} textAlign={"right"}>
              <Text fontSize={"sm"}>Total</Text>
              <Heading color="primary.500" fontWeight={"medium"}>
                {numbro(capitalProject.commitmentsTotal)
                  .format({
                    average: true,
                    mantissa: 2,
                    output: "currency",
                    spaceSeparated: true,
                  })
                  .toUpperCase()}
              </Heading>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
