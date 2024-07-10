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
} from "@nycplanning/streetscape";
import { CapitalProjectBudgeted, Agency } from "../../gen";

export interface CapitalProjectDetailPanelProps {
  capitalProject: CapitalProjectBudgeted;
  capitalCommitmentsTimeline: React.ReactNode;
  agencies: Agency[];
  onClose: () => void;
}

export const CapitalProjectDetailPanel = ({
  capitalProject,
  capitalCommitmentsTimeline,
  agencies,
  onClose,
}: CapitalProjectDetailPanelProps) => {
  return (
    <Flex direction={"column"} padding={{ base: 3, lg: 4 }}>
      <HStack
        align={"center"}
        borderBottom={"1px"}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        paddingBottom={"0.25rem"}
      >
        <IconButton
          aria-label="Close project detail panel"
          icon={<ChevronLeftIcon boxSize={10} />}
          color={"gray.600"}
          backgroundColor={"inherit"}
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
      <Box marginY={"1rem"}>
        <Box display={"flex"} fontSize={"sm"}>
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
        <Box display={"flex"} fontSize={"sm"}>
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
                  paddingX={0.5}
                  paddingY={0.25}
                  borderRadius={"0.25rem"}
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
        height={"auto"}
        direction={"column"}
        transition={"height 0.5s ease-in-out"}
        gap={4}
      >
        <Box
          backgroundColor="gray.50"
          borderRadius={"base"}
          padding={"0.75rem"}
        >
          <Box>
            <Text fontSize={"xs"}>Managing Agency</Text>
            <Heading color="gray.600" fontWeight={"medium"} fontSize={"sm"}>
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
              <Text fontSize={"xs"}>Commitments</Text>
              <Heading color="primary.600" fontWeight={"bold"} fontSize={"sm"}>
                {formatFiscalYearRange(
                  new Date(capitalProject.minDate),
                  new Date(capitalProject.maxDate),
                )}
              </Heading>
            </Box>
            <Box display={"flex"} flexDirection={"column"} textAlign={"right"}>
              <Text fontSize={"xs"}>Total</Text>
              <Heading
                color="primary.500"
                fontWeight={"medium"}
                fontSize={"sm"}
              >
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
          {capitalCommitmentsTimeline}
        </Box>
      </Flex>
    </Flex>
  );
};
