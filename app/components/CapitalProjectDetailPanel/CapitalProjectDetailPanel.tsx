import { useState } from "react";
import { formatFiscalYearRange } from "../../utils/utils";
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

export const CapitalProjectDetailPanel = ({
  capitalProject,
  agencies,
  onClose,
}: CapitalProjectDetailPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Flex
      borderRadius={"base"}
      padding={{ base: 3, lg: 4 }}
      background={"white"}
      direction={"column"}
      width={{ base: "full", lg: "21.25rem" }}
      maxW={{ base: "21.25rem", lg: "unset" }}
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
      <HStack align={"start"}>
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
      <Flex
        height={{ base: isExpanded ? "436px" : "196px", lg: "auto" }}
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
          <Heading color="gray.600" fontWeight={"medium"}>
            Capital Commitments
          </Heading>
          <Text mb={3}>
            {formatFiscalYearRange(
              new Date(capitalProject.minDate),
              new Date(capitalProject.maxDate),
            )}
          </Text>
          <Heading color="gray.600" fontWeight={"medium"}>
            Total Future Commitments
          </Heading>
          <Text>
            {numbro(capitalProject.commitmentsTotal)
              .format({
                average: true,
                mantissa: 2,
                output: "currency",
                spaceSeparated: true,
              })
              .toUpperCase()}
          </Text>
        </Box>
        <Text>
          Project ID: {capitalProject.managingCode}
          {capitalProject.id}
        </Text>
        <Box>
          <Heading color="gray.600" fontWeight={"medium"}>
            Managing Agency
          </Heading>
          <Text>
            {
              agencies.find(
                (agency) => agency.initials === capitalProject.managingAgency,
              )?.name
            }
          </Text>
        </Box>
        <Box>
          <Heading color="gray.600" fontWeight={"medium"}>
            Sponsoring Agency
          </Heading>
          <Text>
            {capitalProject.sponsoringAgencies
              .map(
                (initials) =>
                  agencies.find((agency) => agency.initials === initials)?.name,
              )
              .join(" ")}
          </Text>
        </Box>
        <Box>
          <Heading color="gray.600" fontWeight={"medium"} mb={2}>
            Project Type
          </Heading>
          <Wrap spacing={1}>
            {capitalProject.budgetTypes.map((budgetType) => (
              <WrapItem key={budgetType}>
                <Text
                  as={"span"}
                  display={"inline-block"}
                  width="auto"
                  paddingX={2}
                  paddingY={1}
                  borderRadius={"0.5rem"}
                  borderColor="gray.400"
                  borderStyle={"solid"}
                  borderWidth={"1.5px"}
                  backgroundColor={"gray.100"}
                >
                  {budgetType}
                </Text>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Flex>
    </Flex>
  );
};
