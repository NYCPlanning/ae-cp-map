import {
  Heading,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  VStack,
  Text,
  Flex,
  EducationIcon,
  HealthIcon,
  HousingIcon,
  InfrastructureIcon,
  ParksIcon,
  PeopleIcon,
  SafetyIcon,
  TransportationIcon,
} from "@nycplanning/streetscape";
import { env } from "~/utils/env";

export const CommunityBoardBudgetRequestLegend = ({
  filtersAccordionIndex,
  setFiltersAccordionIndex,
}: CommunityBoardBudgetRequestLegendProps) => {
  return (
    <AccordionItem
      fontFamily="body"
      color="primary.600"
      backgroundColor="gray.50"
      borderStyle="solid"
      borderRadius={"sm"}
      borderWidth={"1px"}
      marginTop={2}
      marginX={env.facDbPhase1 == "ON" ? "" : "2"}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton
            aria-label="Toggle legend panel"
            paddingY={0}
            paddingX={3}
            onClick={() => {
              isExpanded
                ? setFiltersAccordionIndex(
                    filtersAccordionIndex.filter((index) => index !== 2),
                  )
                : setFiltersAccordionIndex([...filtersAccordionIndex, 2]);
            }}
          >
            <Heading
              flex="1"
              textAlign="left"
              fontSize="xs"
              fontWeight="bold"
              lineHeight="32px"
              paddingBottom={0}
            >
              {`${isExpanded ? "Hide" : "Show"} Legend`}
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel
            paddingTop={0}
            paddingX={3}
            paddingBottom={6}
            display={"flex"}
            flexDirection={"column"}
          >
            <VStack>
              <Flex
                alignItems="center"
                width={"full"}
                gap={1}
                justifyContent="flex-start"
              >
                <HealthIcon
                  dark={true}
                  aria-label="health care and human services icon"
                />
                <Text fontSize="xs" textColor={"gray.600"}>
                  Health Care and Human Services
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                width={"full"}
                gap={1}
                justifyContent="flex-start"
              >
                <EducationIcon
                  dark={true}
                  aria-label="youth, education, and child welfare icon"
                />
                <Text fontSize="xs" textColor={"gray.600"}>
                  Youth, Education, and Child Welfare
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                width={"full"}
                gap={1}
                justifyContent="flex-start"
              >
                <SafetyIcon
                  dark={true}
                  aria-label="public safety and emergency services icon"
                />
                <Text fontSize="xs" textColor={"gray.600"}>
                  Public Safety and Emergency Services
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                width={"full"}
                gap={1}
                justifyContent="flex-start"
              >
                <InfrastructureIcon
                  dark={true}
                  aria-label="core infrastructure, city services, and resiliency icon"
                />
                <Text fontSize="xs" textColor={"gray.600"}>
                  Core Infrastructure, City Services, and Resiliency
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                width={"full"}
                gap={1}
                justifyContent="flex-start"
              >
                <HousingIcon
                  dark={true}
                  aria-label="housing, economic development, and land use icon"
                />
                <Text fontSize="xs" textColor={"gray.600"}>
                  Housing, Economic Development, and Land Use
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                width={"full"}
                gap={1}
                justifyContent="flex-start"
              >
                <TransportationIcon
                  dark={true}
                  aria-label="transportation and mobility icon"
                />
                <Text fontSize="xs" textColor={"gray.600"}>
                  Transportation and Mobility
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                width={"full"}
                gap={1}
                justifyContent="flex-start"
              >
                <ParksIcon
                  dark={true}
                  aria-label="parks, cultural, and other community facilities icon"
                />
                <Text fontSize="xs" textColor={"gray.600"}>
                  Parks, Cultural, and Other Community Facilities
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                width={"full"}
                gap={1}
                justifyContent="flex-start"
              >
                <PeopleIcon dark={true} aria-label="other needs icon" />
                <Text fontSize="xs" textColor={"gray.600"}>
                  Other Needs
                </Text>
              </Flex>
            </VStack>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};
export interface CommunityBoardBudgetRequestLegendProps {
  filtersAccordionIndex: Array<number>;
  setFiltersAccordionIndex: (newIndexArray: Array<number>) => void;
}
