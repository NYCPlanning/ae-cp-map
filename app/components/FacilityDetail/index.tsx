import { Agency, Facility } from "~/gen";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  ChevronLeftIcon,
  EmailInvertedIcon,
  ExternalLinkIcon,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Tag,
  Text,
  VStack,
  Button,
} from "@nycplanning/streetscape";
import { useNavigate, useSearchParams } from "react-router";
import { env } from "~/utils/env";

const { stateOfGoodRepair } = env;

export type FacilityDetailProps = {
  facility: Facility;
  facilityAgencies: Agency[];
  categoryPath: string;
  onNavigationClick: () => void;
};

const FACILITY_CATEGORY_ID_COLORS = new Map<number, string>([
  [1, "#F0CB32"],
  [2, "#58AE57"],
  [3, "#EB9028"],
  [4, "#86E3F3"],
  [5, "#4977FA"],
  [6, "#B66AC5"],
  [7, "#8E8EA9"],
]);

export function FacilityDetail({
  facility,
  facilityAgencies,
  categoryPath,
  onNavigationClick,
}: FacilityDetailProps) {
  // Parse date and remove leading 0's
  const [year, month, day] = facility.dataSource.retrieveDate.split("-").map((s: string) => s.replace(/^0+/, ''));
  console.log(facility)
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const agency: Agency | undefined = facilityAgencies.find((agency) => agency.initials === facility.oversightAgencyInitials);

  return (
    <VStack
      alignItems={"flex-start"}
      gap={2}
      overflowY={"scroll"}
      sx={{ scrollbarWidth: "none" }}
    >
      <HStack align={"center"} alignItems={"flex-start"}>
        <IconButton
          aria-label="Close budget request detail panel"
          icon={<ChevronLeftIcon boxSize={6} />}
          color={"gray.600"}
          backgroundColor={"inherit"}
          _hover={{
            border: "none",
            backgroundColor: "blackAlpha.100",
          }}
          onClick={onNavigationClick}
        />
        {
          facility.alsoAtLocation.length > 0 ?
            (
              <VStack
                alignItems={"flex-start"}
                width="100%"
                gap={1}
              >
                <Heading color="gray.600" fontWeight={"bold"} fontSize={"xl"}>
                  {facility.name}
                </Heading>
                <Text>AND {facility.alsoAtLocation.length} OTHER{facility.alsoAtLocation.length > 1 && "S"}</Text>
              </VStack>
            ) :
            (
              <Heading color="gray.600" fontWeight={"bold"} fontSize={"xl"}>
                {facility.name}
              </Heading>
            )
        }

      </HStack>
      <VStack
        alignItems={"flex-start"}
        borderTop={"1px solid"}
        borderColor={"primary.500"}
        width="100%"
        paddingBottom={2}
        justifyContent={"flex-start"}
        fontSize={"sm"}
      >
        <Text fontWeight={"bold"} pt={4}>{facility.address}</Text>
        <Text>BBL {facility.bbl} / BIN {facility.bin}</Text>
        <Text fontWeight={"bold"} pt={5}>Oversight Agency</Text>
        <Text>{agency !== undefined ? agency.name : facility.oversightAgencyInitials}</Text>
        <Text fontWeight={"bold"} pt={5}>Category</Text>
        <Text>{categoryPath}</Text>
        <HStack gap={0} pt={5}>
          <Text paddingRight={3} borderRight={"1px solid"} borderColor={"gray.400"}><span style={{ fontWeight: "bold" }}>Jurisdiction</span>: {facility.facilityJurisdiction === null ? "Not specified" : facility.facilityJurisdiction}</Text>
          <Text paddingLeft={3}><span style={{ fontWeight: "bold" }}>Type</span>: {facility.facilityOperatorType === null ? "Not specified" : facility.facilityOperatorType}</Text>
        </HStack>

        {
          (stateOfGoodRepair === 'ON' && facility.sgrLtr !== null) &&
          <>
            <Text fontWeight={"bold"} pt={5}>State of Good Repair</Text>
            <VStack
              fontFamily="body"
              backgroundColor="gray.50"
              borderColor={"gray.200"}
              borderStyle="solid"
              borderRadius={"sm"}
              borderWidth={"1px"}
              marginTop={2}
              marginX={0}
              width={"100%"}
              p={4}
            >
              <HStack gap={2} alignItems={"flex-start"}>
                <Tag variant={`grade${facility.sgrLtr}`} size={"gradesLg"}>
                  {facility.sgrLtr}
                </Tag>
                <VStack alignItems={"flex-start"} gap={0}>
                  <Text fontWeight={"bold"}>Overall Facility Grade</Text>
                  <Text>State of architecture, mechanical, and electrical systems</Text>
                </VStack>
              </HStack>
              <Accordion allowToggle width={"100%"} fontSize="xs">
                <AccordionItem border={0} p={0}>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        aria-label={`${isExpanded ? "Close" : "Open"} state of good repair menu`}
                        p={0}
                        _hover={{ backgroundColor: "gray.100" }}
                      >
                        <Heading
                          flex="1"
                          textAlign="left"
                          color={"primary.600"}
                          lineHeight="32px"
                          fontSize="xs"
                          paddingBottom={0}
                          paddingX={1}
                        >
                          See{isExpanded ? " Less" : " More"}
                        </Heading>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel
                        padding={0}
                      >
                        <VStack
                          alignItems={"flex-start"}
                          paddingY={2.5}
                          borderBottom={"1px solid"}
                          borderColor={"gray.400"}
                        >
                          <Text fontWeight={"bold"} fontSize={"sm"}>Breakdown</Text>
                          <HStack>
                            <Tag variant={`grade${facility.sgrArcLtr}`} size={"gradesSm"}>
                              {facility.sgrArcLtr}
                            </Tag>
                            <Text fontWeight={"bold"}>ARCHITECTURE</Text>
                          </HStack>
                          <HStack>
                            <Tag variant={`grade${facility.sgrSysLtr}`} size={"gradesSm"}>
                              {facility.sgrSysLtr}
                            </Tag>
                            <Text fontWeight={"bold"}>MECHANICAL AND ELECTRICAL SYSTEMS</Text>
                          </HStack>
                          {
                            facility.sgrYear !== null && (<Text>Assessment year: {facility.sgrYear}</Text>)
                          }

                        </VStack>
                        <VStack
                          alignItems={"flex-start"}
                          paddingY={2.5}
                        >
                          <Text fontWeight={"bold"} fontSize={"sm"}>About the Grades</Text>
                          <Text>
                            State of Good Repair (SGR) grades provide a high-level assessment of a facility's overall condition, ranging from <b>A (best)</b> to <b>F (poorest)</b>. Scores are intended as a general indicator only and may not reflect current conditions due to the timing of assessments.
                          </Text>
                          <VStack
                            bg={"white"}
                            width={"100%"}
                            p={4}
                            borderRadius={"8px"}
                          >
                            <VStack paddingX={2.5} paddingY={"22px"} borderBottom={"1px solid"} borderColor={"gray.300"} width={"100%"} alignItems={"flex-start"}>
                              <HStack gap={1.5}>
                                <Text fontWeight={"bold"}>GRADE A</Text>
                                <Tag variant={"gradeA"} size={"gradesDescription"}>
                                  Excellent
                                </Tag>
                              </HStack>
                              <Text fontSize={"sm"}>Facility assets are in excellent condition with minimal repair needs.</Text>
                            </VStack>
                            <VStack paddingX={2.5} paddingY={"22px"} borderBottom={"1px solid"} borderColor={"gray.300"} width={"100%"} alignItems={"flex-start"}>
                              <HStack gap={1.5}>
                                <Text fontWeight={"bold"}>GRADE B</Text>
                                <Tag variant={"gradeB"} size={"gradesDescription"}>
                                  Good
                                </Tag>
                              </HStack>
                              <Text fontSize={"sm"}>Facility assets are in good condition with limited repair needs.</Text>
                            </VStack>
                            <VStack paddingX={2.5} paddingY={"22px"} borderBottom={"1px solid"} borderColor={"gray.300"} width={"100%"} alignItems={"flex-start"}>
                              <HStack gap={1.5}>
                                <Text fontWeight={"bold"}>GRADE C</Text>
                                <Tag variant={"gradeC"} size={"gradesDescription"}>
                                  Fair
                                </Tag>
                              </HStack>
                              <Text fontSize={"sm"}>Facility assets are in fair condition with moderate repair needs.</Text>
                            </VStack>
                            <VStack paddingX={2.5} paddingY={"22px"} borderBottom={"1px solid"} borderColor={"gray.300"} width={"100%"} alignItems={"flex-start"}>
                              <HStack gap={1.5}>
                                <Text fontWeight={"bold"}>GRADE D</Text>
                                <Tag variant={"gradeD"} size={"gradesDescription"}>
                                  Poor
                                </Tag>
                              </HStack>
                              <Text fontSize={"sm"}>Facility assets are in poor condition with significant repair needs.</Text>
                            </VStack>
                            <VStack paddingX={2.5} paddingY={"22px"} width={"100%"} alignItems={"flex-start"}>
                              <HStack gap={1.5}>
                                <Text fontWeight={"bold"}>GRADE F</Text>
                                <Tag variant={"gradeF"} size={"gradesDescription"}>
                                  Critical
                                </Tag>
                              </HStack>
                              <Text fontSize={"sm"}>Facility assets are in critical condition with extensive repair needs.</Text>
                            </VStack>

                          </VStack>
                        </VStack>

                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </VStack>
          </>
        }

        <Accordion allowToggle width={"100%"}>
          <AccordionItem
            fontFamily="body"
            backgroundColor="gray.50"
            borderStyle="solid"
            borderRadius={"sm"}
            borderWidth={"1px"}
            marginTop={2}
            marginX={0}
          >
            <AccordionButton
              aria-label="Close source data menu"
              paddingY={0}
              paddingX={3}
              _hover={{ backgroundColor: "gray.100" }}
            >
              <Heading
                flex="1"
                textAlign="left"
                fontSize="xs"
                fontWeight="bold"
                lineHeight="32px"
                paddingBottom={0}
              >
                Source Data
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              paddingTop={0}
              paddingX={3}
              paddingBottom={2}
              display={"flex"}
              flexDirection={"column"}
              my={2}
              fontSize={"2xs"}
            >
              <Text fontWeight={"bold"}>{facility.dataSource.datasetName}</Text>
              <Text>Updated: {month}/{day}/{year}</Text>

              <Text color={"primary.600"}
              ><Link
                textDecorationLine={"underline"}
                href=""
              >
                  View the source data(UPDATE THIS ONCE LINK IS ADDED TO API)
                </Link>{" "}<ExternalLinkIcon /></Text>
              <Text pt={4} fontWeight={"bold"}>Notice an issue with this data?</Text>
              <Text>Help us keep this site up-to-date. E-mail caps@planning.nyc.gov.</Text>
              <Link href={`mailto:caps@planning.nyc.gov?subject=Facility ID ${facility.id}`} width={"100%"}>
                <Button variant="secondary" size="sm" width={"100%"} mt={3} ><EmailInvertedIcon /> Email us</Button></Link>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        {
          facility.alsoAtLocation.length > 0 &&
          (
            <VStack
              alignItems={"flex-start"}
              mt={4}
              pt={4}
              borderTop={"1px solid"}
              borderColor={"gray.200"}
              width="100%"
              justifyContent={"flex-start"}
              fontSize={"sm"}
            >
              <Text fontWeight={"bold"}>Also at this location</Text>
              {facility.alsoAtLocation.map((otherFacility) => <HStack gap={1} key={otherFacility.id}>
                <Flex marginX={1} marginY={1.5} w={2} h={2} bg={FACILITY_CATEGORY_ID_COLORS.get(otherFacility.categoryId ? otherFacility.categoryId : 1)} borderRadius={"2px"} />
                <Text
                  color={"primary.600"}
                  textDecorationLine={"underline"}
                  cursor={"pointer"}
                  onClick={() => {
                    navigate({
                      pathname: `/facilities/${otherFacility.id}`,
                      search: `?${searchParams.toString()}`,
                    });
                  }}
                >{otherFacility.name}</Text>
              </HStack>)}
            </VStack>
          )
        }
      </VStack>
    </VStack>
  );
}
