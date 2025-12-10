import numbro from "numbro";
import {
  Box,
  ChevronLeftIcon,
  Flex,
  Heading,
  HStack,
  Text,
  IconButton,
  VStack,
  Tag,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@nycplanning/streetscape";
import { CapitalProjectBudgeted, Agency, CapitalCommitment } from "../../gen";
import { formatFiscalYearRange } from "~/utils/utils";
import { CapitalCommitmentsTimeline } from "./CapitalCommitmentsTimeline";
import {
  CapitalCommitmentsTable,
  CapitalCommitmentsTableProps,
} from "./CapitalCommitmentsTable";

export interface CapitalProjectDetailProps
  extends CapitalCommitmentsTableProps {
  capitalProject: CapitalProjectBudgeted;
  capitalCommitments: Array<CapitalCommitment>;
  managingAgencies: Agency[];
  onNavigationClick: () => void;
}

export const CapitalProjectDetail = ({
  capitalProject,
  capitalCommitments,
  managingAgencies,
  capitalCommitmentTypes,
  onNavigationClick,
}: CapitalProjectDetailProps) => {
  return (
    <VStack
      alignItems={"flex-start"}
      gap={2}
      overflowY={"scroll"}
      width="100%"
      sx={{ scrollbarWidth: "none" }}
      id="OUTER"
    >
      <HStack align={"center"}>
        <IconButton
          aria-label="Close project detail panel"
          icon={<ChevronLeftIcon boxSize={6} />}
          color={"gray.600"}
          backgroundColor={"inherit"}
          _hover={{
            border: "none",
            backgroundColor: "blackAlpha.100",
          }}
          onClick={onNavigationClick}
        />
        <Heading color="gray.600" fontWeight={"bold"} fontSize={"md"}>
          {capitalProject.description}
        </Heading>
      </HStack>

      <VStack
        alignItems={"flex-start"}
        borderBottom={"1px solid"}
        borderColor={"gray.200"}
        width="100%"
        paddingBottom={2}
        justifyContent={"flex-start"}
        fontSize={"sm"}
      >
        <Flex gap={2} flexWrap={"wrap"}>
          <HStack align={"flex-start"}>
            <Text fontWeight={"bold"}>Project ID: </Text>
            <Text>
              {capitalProject.managingCode}
              {capitalProject.id}
            </Text>
          </HStack>
          <HStack align={"flex-start"}>
            <Text fontWeight={"bold"}>Project Type: </Text>
            {capitalProject.budgetTypes.map((budgetType) => (
              <Tag key={budgetType}>
                <Text>{budgetType}</Text>
              </Tag>
            ))}
          </HStack>
        </Flex>
      </VStack>

      <Flex
        height={"auto"}
        direction={"column"}
        transition={"height 0.5s ease-in-out"}
        gap={4}
        width={"100%"}
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
                managingAgencies.find(
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
          <CapitalCommitmentsTimeline capitalCommitments={capitalCommitments} />
        </Box>
        <Flex
          direction={"column"}
          backgroundColor="gray.50"
          paddingX={4}
          borderRadius={"base"}
        >
          <Accordion
            width={"100%"}
            maxHeight={"100%"}
            defaultIndex={[0]}
            allowToggle
            overflowY={"scroll"}
            sx={{ scrollbarWidth: "none" }}
          >
            <AccordionItem border={"none"}>
              <AccordionButton p={0} aria-label="Toggle layers panel">
                <Heading
                  flex="1"
                  textAlign="left"
                  fontSize="md"
                  fontWeight="bold"
                  lineHeight="32px"
                  pb={0}
                >
                  Commitment Details
                </Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel px={0} pb={3}>
                <CapitalCommitmentsTable
                  capitalCommitments={capitalCommitments}
                  capitalCommitmentTypes={capitalCommitmentTypes}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </VStack>
  );
};
