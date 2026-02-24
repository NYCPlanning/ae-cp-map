import {
  Flex,
  GridItem,
  Accordion,
  Box,
  AccordionItem,
  AccordionButton,
  Heading,
  AccordionIcon,
  AccordionPanel,
  Text,
  HStack,
  Link,
  Tab,
  TabList,
  Tabs,
} from "@nycplanning/streetscape";
import {
  Outlet,
  useLoaderData,
  useOutletContext,
  LoaderFunctionArgs,
} from "react-router";
import { Atlas, MAX_ZOOM, MIN_ZOOM } from "../components/atlas.client";
import {
  findBoroughs,
  findCityCouncilDistricts,
  findCommunityDistrictsByBoroughId,
  findAgencyBudgets,
  findCapitalProjectManagingAgencies,
  findCommunityBoardBudgetRequestPolicyAreas,
  findCommunityBoardBudgetRequestNeedGroups,
  findCommunityBoardBudgetRequestAgencies,
  findCommunityBoardBudgetRequestAgencyCategoryResponses,
} from "../gen";
import { FilterMenu } from "../components/FilterMenu";
import { SearchByAttributeMenu } from "../components/SearchByAttributeMenu";
import { env } from "../utils/env";
import {
  BoroughId,
  CommunityBoardBudgetRequestAgencyCategoryResponseId,
  CommunityBoardBudgetRequestNeedGroupId,
  CommunityBoardBudgetRequestPolicyAreaId,
  DistrictId,
  DistrictType,
} from "../utils/types";
import { HowToUseThisTool } from "../components/AdminDropdownContent/HowToUseThisTool";
import {
  CapitalProjectLayerToggle,
  CommunityBoardBudgetRequestLayerToggle,
} from "~/components/MapLayerToggle";
import { CommunityBoardBudgetRequestLegend } from "../components/CommunityBoardBudgetRequestLegend";
import { useUpdateSearchParams } from "../utils/utils";
import type { RootContextType } from "../root";
import { MapViewControls } from "~/components/MapViewControls";
import { SearchByCbbrMenu } from "~/components/SearchByCbbrMenu";
import { useState } from "react";
import { MapLayersPanel } from "~/components/AdminMapLayersPanel";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const districtType = url.searchParams.get("districtType") as DistrictType;
  const boroughId = url.searchParams.get("boroughId") as BoroughId;
  const cbbrNeedGroupId = url.searchParams.get(
    "cbbrNeedGroupId",
  ) as CommunityBoardBudgetRequestNeedGroupId;
  const cbbrPolicyAreaId = url.searchParams.get(
    "cbbrPolicyAreaId",
  ) as CommunityBoardBudgetRequestPolicyAreaId;
  const cbbrAgencyInitials = url.searchParams.get("cbbrAgencyInitials");
  const cbbrAgencyCategoryResponseIdsParam = url.searchParams.get(
    "cbbrAgencyCategoryResponseIds",
  ) as CommunityBoardBudgetRequestAgencyCategoryResponseId;
  const cbbrAgencyCategoryResponseIds =
    cbbrAgencyCategoryResponseIdsParam === null
      ? []
      : cbbrAgencyCategoryResponseIdsParam.split(",");

  const { managingAgencies } = await findCapitalProjectManagingAgencies({
    baseURL: `${env.zoningApiUrl}/api`,
  });

  const { agencyBudgets } = await findAgencyBudgets({
    baseURL: `${env.zoningApiUrl}/api`,
  });

  const { cbbrPolicyAreas } = await findCommunityBoardBudgetRequestPolicyAreas(
    {
      cbbrNeedGroupId:
        cbbrNeedGroupId !== null ? parseInt(cbbrNeedGroupId) : undefined,
      agencyInitials:
        cbbrAgencyInitials !== null ? cbbrAgencyInitials : undefined,
    },
    {
      baseURL: `${env.zoningApiUrl}/api`,
    },
  );

  const { cbbrNeedGroups } = await findCommunityBoardBudgetRequestNeedGroups(
    {
      cbbrPolicyAreaId:
        cbbrPolicyAreaId !== null ? parseInt(cbbrPolicyAreaId) : undefined,
      agencyInitials:
        cbbrAgencyInitials !== null ? cbbrAgencyInitials : undefined,
    },
    {
      baseURL: `${env.zoningApiUrl}/api`,
    },
  );

  const { cbbrAgencies } = await findCommunityBoardBudgetRequestAgencies(
    {
      cbbrNeedGroupId:
        cbbrNeedGroupId !== null ? parseInt(cbbrNeedGroupId) : undefined,
      cbbrPolicyAreaId:
        cbbrPolicyAreaId !== null ? parseInt(cbbrPolicyAreaId) : undefined,
    },
    {
      baseURL: `${env.zoningApiUrl}/api`,
    },
  );

  const { cbbrAgencyCategoryResponses } =
    await findCommunityBoardBudgetRequestAgencyCategoryResponses({
      baseURL: `${env.zoningApiUrl}/api`,
    });

  if (districtType === "cd") {
    const { boroughs } = await findBoroughs({
      baseURL: `${env.zoningApiUrl}/api`,
    });

    if (boroughId === null) {
      return {
        boroughs,
        communityDistricts: null,
        cityCouncilDistricts: null,
        managingAgencies,
        agencyBudgets,
        cbbrPolicyAreas,
        cbbrNeedGroups,
        cbbrAgencies,
        cbbrAgencyCategoryResponses,
        cbbrAgencyCategoryResponseIds,
      };
    } else {
      const { communityDistricts } = await findCommunityDistrictsByBoroughId(
        boroughId,
        {
          baseURL: `${env.zoningApiUrl}/api`,
        },
      );

      return {
        boroughs,
        communityDistricts,
        cityCouncilDistricts: null,
        managingAgencies,
        agencyBudgets,
        cbbrPolicyAreas,
        cbbrNeedGroups,
        cbbrAgencies,
        cbbrAgencyCategoryResponses,
        cbbrAgencyCategoryResponseIds,
      };
    }
  }

  if (districtType === "ccd") {
    const { cityCouncilDistricts } = await findCityCouncilDistricts({
      baseURL: `${env.zoningApiUrl}/api`,
    });
    return {
      boroughs: null,
      communityDistricts: null,
      cityCouncilDistricts,
      managingAgencies,
      agencyBudgets,
      cbbrPolicyAreas,
      cbbrNeedGroups,
      cbbrAgencies,
      cbbrAgencyCategoryResponses,
      cbbrAgencyCategoryResponseIds,
    };
  }

  return {
    boroughs: null,
    communityDistricts: null,
    cityCouncilDistricts: null,
    managingAgencies,
    agencyBudgets,
    cbbrPolicyAreas,
    cbbrNeedGroups,
    cbbrAgencies,
    cbbrAgencyCategoryResponses,
    cbbrAgencyCategoryResponseIds,
  };
};

export default function MapPage() {
  const { viewState, setViewState } = useOutletContext<RootContextType>();
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const showCapitalProjects = searchParams.get("capitalProjects") !== "off";
  const showCbbr = searchParams.get("cbbr") !== "off";
  const [hoveredOverItem, setHoveredOverItem] = useState<string | null>(null);
  const [filtersAccordionIndex, setFiltersAccordionIndex] = useState<number[]>(
    [],
  );
  const updateFiltersAccordion = (index: number) => {
    const updateFunction = () => {
      filtersAccordionIndex.includes(index)
        ? setFiltersAccordionIndex(
          filtersAccordionIndex.filter((i) => i !== index),
        )
        : setFiltersAccordionIndex([...filtersAccordionIndex, index]);
    };
    return updateFunction;
  };

  const {
    boroughs,
    communityDistricts,
    cityCouncilDistricts,
    managingAgencies,
    agencyBudgets,
    cbbrPolicyAreas,
    cbbrNeedGroups,
    cbbrAgencies,
    cbbrAgencyCategoryResponses,
    cbbrAgencyCategoryResponseIds,
  } = useLoaderData<typeof loader>();

  const clearCapitalProjectFilters = () => {
    updateSearchParams({
      managingAgency: null,
      agencyBudget: null,
      commitmentsTotalMin: null,
      commitmentsTotalMax: null,
    });
  };

  const clearCbbrProjectFilters = () => {
    updateSearchParams({
      cbbrPolicyAreaId: null,
      cbbrNeedGroupId: null,
      cbbrAgencyInitials: null,
      cbbrAgencyCategoryResponseIds: null,
    });
  };

  const districtType = searchParams.get("districtType") as DistrictType;
  const districtId = searchParams.get("districtId") as DistrictId;
  const boroughId = searchParams.get("boroughId") as BoroughId;

  const getDefaultIndex = (type: DistrictType | null) => {
    switch (type) {
      case "ccd":
        return 1;
      default:
        return 0;
    }
  };

  const [savedGeoSelection, setSavedGeoSelection] = useState<{
    cd: { boroughId: BoroughId; districtId: DistrictId } | undefined;
    ccd: { districtId: DistrictId } | undefined;
  }>({ cd: undefined, ccd: undefined });

  if (env.facDbPhase1 == "ON")
    return (
      <>
        <GridItem
          gridColumn={"1 / -1"}
          gridRow={{
            base: "2 / 5",
            md: "2 / -1",
          }}
        >
          <Atlas
            viewState={viewState}
            setViewState={(MapViewState) => setViewState(MapViewState)}
            showCapitalProjects={showCapitalProjects}
            showCbbr={showCbbr}
            hoveredOverItem={hoveredOverItem}
            setHoveredOverItem={setHoveredOverItem}
          />{" "}
        </GridItem>
        <GridItem
          bgColor="white"
          borderRadius="lg"
          gridRowStart={3}
          gridColumn={{
            base: "col-start / span 8",
            md: "col-start / span 12",
            xl: "5 / span 5",
            "2xl": "4 / span 4",
          }}
          maxW={"480px"}
        >
          <Tabs
            isFitted
            variant={"mapControl"}
            style={{
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              borderRadius: "lg",
            }}
            whiteSpace={"nowrap"}
            defaultIndex={getDefaultIndex(districtType)}
          >
            <TabList key={"TabList"}>
              <Tab
                key={"Community Districts"}
                fontSize={{
                  base: "xs",
                  md: "sm",
                }}
                onClick={() => {
                  if (districtId !== null)
                    setSavedGeoSelection({
                      ...savedGeoSelection,
                      ccd: { districtId },
                    });
                  if (savedGeoSelection.cd === undefined) {
                    updateSearchParams({
                      districtType: "cd",
                      boroughId: null,
                      districtId: null,
                    });
                  } else {
                    updateSearchParams({
                      districtType: "cd",
                      boroughId: savedGeoSelection.cd.boroughId,
                      districtId: savedGeoSelection.cd.districtId,
                    });
                  }
                }}
              >
                Community Districts
              </Tab>
              <Tab
                key={"City Council"}
                fontSize={{
                  base: "xs",
                  md: "sm",
                }}
                onClick={() => {
                  if (districtId !== null)
                    setSavedGeoSelection({
                      ...savedGeoSelection,
                      cd: { boroughId, districtId },
                    });
                  if (savedGeoSelection.ccd === undefined) {
                    updateSearchParams({
                      districtType: "ccd",
                      boroughId: null,
                      districtId: null,
                    });
                  } else {
                    updateSearchParams({
                      districtType: "ccd",
                      boroughId: null,
                      districtId: savedGeoSelection.ccd.districtId,
                    });
                  }
                }}
              >
                City Council
              </Tab>
              <Tab
                key={"Boroughs"}
                fontSize={{
                  base: "xs",
                  md: "sm",
                }}
                onClick={() => null}
              >
                Boroughs
              </Tab>
            </TabList>
          </Tabs>
        </GridItem>
        <GridItem
          gridColumn={{
            base: "col-start / span 7",
            md: "col-start / span 4",
            xl: "col-start / span 3",
            "2xl": "col-start / span 2",
          }}
          gridRow={{
            base: "4 / row-end",
            md: "4 / row-end",
            lg: "4 / span 1",
            xl: "3 / span 2",
          }}
          paddingTop={{
            base: "2dvh",
            xl: 0,
          }}
          height={"fit-content"}
          maxHeight={"100%"}
          overflowY={{ lg: "scroll" }}
          zIndex={"1"}
          sx={{
            scrollbarWidth: "none",
          }}
        >
          <Flex
            direction={"column"}
            width={{ base: "100%", lg: "auto" }}
            alignItems={"center"}
            flexShrink={{ lg: 0 }}
            maxHeight={{
              base: "82vh",
              md: "89vh",
              lg: "full",
            }}
            backgroundColor={"white"}
            borderRadius={10}
            overflowY={"scroll"}
            padding={4}
            sx={{
              scrollbarWidth: "none",
            }}
            boxShadow={"0 2px 8px 0 rgba(0, 0, 0, 0.20)"}
          >
            <Accordion allowMultiple defaultIndex={[0]} width={"100%"}>
              <AccordionItem borderTop={"none"} borderBottom={"none"}>
                <AccordionButton p={0} aria-label="Toggle layers panel">
                  <Heading
                    flex="1"
                    textAlign="left"
                    fontSize="md"
                    fontWeight="bold"
                    lineHeight="32px"
                    pb={0}
                  >
                    Capital Planning Data
                  </Heading>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={0} pt={2} pb={0}>
                  <Box>
                    <Accordion
                      allowMultiple
                      index={filtersAccordionIndex}
                      width={"100%"}
                    >
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        paddingBottom={2}
                      >
                        <Text fontSize={"xs"}>Layer Filters</Text>
                        <HStack
                          fontSize={"sm"}
                          paddingBottom={2}
                          width={"100%"}
                          justifyContent={"space-between"}
                          whiteSpace={"nowrap"}
                          flexWrap={"wrap"}
                          rowGap={0}
                        >
                          <HStack>
                            <Link
                              color={"primary.600"}
                              textDecor={"underline"}
                              cursor={"pointer"}
                              onClick={() =>
                                setFiltersAccordionIndex([0, 1, 2])
                              }
                            >
                              Expand All
                            </Link>
                            <Text>|</Text>
                            <Link
                              color={"primary.600"}
                              textDecor={"underline"}
                              cursor={"pointer"}
                              onClick={() => setFiltersAccordionIndex([])}
                            >
                              Collapse All
                            </Link>
                          </HStack>
                          <Link
                            color={"primary.600"}
                            textDecor={"underline"}
                            cursor={"pointer"}
                            onClick={() =>
                              updateSearchParams({
                                managingAgency: null,
                                agencyBudget: null,
                                commitmentsTotalMin: null,
                                commitmentsTotalMax: null,
                                cbbrPolicyAreaId: null,
                                cbbrNeedGroupId: null,
                                cbbrAgencyInitials: null,
                                cbbrAgencyCategoryResponseIds: null,
                              })
                            }
                          >
                            Clear All
                          </Link>
                        </HStack>
                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                          <CapitalProjectLayerToggle />
                          <SearchByAttributeMenu
                            agencies={managingAgencies}
                            projectTypes={agencyBudgets}
                            onClear={clearCapitalProjectFilters}
                            updateFiltersAccordion={updateFiltersAccordion(0)}
                          />
                          <CommunityBoardBudgetRequestLayerToggle />
                          <SearchByCbbrMenu
                            cbbrPolicyAreas={cbbrPolicyAreas}
                            cbbrNeedGroups={cbbrNeedGroups}
                            cbbrAgencies={cbbrAgencies}
                            cbbrAgencyCategoryResponses={
                              cbbrAgencyCategoryResponses
                            }
                            cbbrAgencyCategoryResponseIds={
                              cbbrAgencyCategoryResponseIds
                            }
                            onClear={clearCbbrProjectFilters}
                            updateFiltersAccordion={updateFiltersAccordion(1)}
                          />
                          <CommunityBoardBudgetRequestLegend
                            updateFiltersAccordion={updateFiltersAccordion(2)}
                          />
                        </Box>
                      </Box>
                    </Accordion>
                    <Box display={"flex"} flexDirection={"column"} gap={2}>
                      <FilterMenu
                        boroughs={boroughs}
                        communityDistricts={communityDistricts}
                        cityCouncilDistricts={cityCouncilDistricts}
                      />
                    </Box>

                    <HowToUseThisTool />
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </GridItem>
        <GridItem
          gridColumnStart={{ base: 9, md: 6, lg: 6, xl: 5, "2xl": 4 }}
          gridRowStart={{ base: 4, md: 4, lg: 4, xl: 4 }}
          width={"fit-content"}
          height={"fit-content"}
          paddingTop={{
            base: "2dvh",
            xl: 1,
          }}
        >
          <MapViewControls
            viewState={viewState}
            setViewState={setViewState}
            minZoom={MIN_ZOOM}
            maxZoom={MAX_ZOOM}
          />
        </GridItem>
        <GridItem
          gridColumn={{
            base: "1 / -1",
            lg: "9 / span 5",
            xl: "10 / col-end",
            "2xl": "11 / col-end",
          }}
          gridRow={{
            base: "3 / -1",
            lg: "row-start / span 2",
          }}
          height={"100%"}
          pointerEvents={"none"}
          zIndex={"2"}
          sx={{
            scrollbarWidth: "none",
          }}
          overflowY={"scroll"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={{ base: "end", lg: "start" }}
        >
          <Flex
            width={"full"}
            gap={3}
            pointerEvents={"none"}
            sx={{
              "> *": {
                pointerEvents: "auto",
              },
              scrollbarWidth: "none",
            }}
            direction={"column"}
            flexShrink={{ lg: 0 }}
            maxHeight={"full"}
            justify={"end"}
            backgroundColor={"white"}
            borderRadius={10}
            overflowY={"scroll"}
            padding={4}
            boxShadow={"0 8px 4px 0 rgba(0, 0, 0, 0.08)"}
          >
            <Outlet context={{ hoveredOverItem, setHoveredOverItem }} />
          </Flex>
        </GridItem>
      </>
    );

  return (
    <>
      <GridItem
        gridColumn={"1 / -1"}
        gridRow={{
          base: "2 / 5",
          md: "2 / -1",
        }}
      >
        <Atlas
          viewState={viewState}
          setViewState={(MapViewState) => setViewState(MapViewState)}
          showCapitalProjects={showCapitalProjects}
          showCbbr={showCbbr}
          hoveredOverItem={hoveredOverItem}
          setHoveredOverItem={setHoveredOverItem}
        />{" "}
      </GridItem>
      <GridItem
        gridColumn={{
          base: "col-start / span 7",
          md: "col-start / span 4",
          xl: "col-start / span 3",
          "2xl": "col-start / span 2",
        }}
        gridRow={{
          base: "row-start / row-end",
          md: "row-start / row-end",
          lg: "row-start / span 1",
        }}
        height={"fit-content"}
        maxHeight={"100%"}
        overflowY={{ lg: "scroll" }}
        zIndex={"1"}
        sx={{
          scrollbarWidth: "none",
        }}
      >
        <Flex
          direction={"column"}
          width={{ base: "100%", lg: "auto" }}
          alignItems={"center"}
          flexShrink={{ lg: 0 }}
          maxHeight={{
            base: "82vh",
            md: "89vh",
            lg: "full",
          }}
          backgroundColor={"white"}
          borderRadius={10}
          overflowY={"scroll"}
          padding={4}
          sx={{
            scrollbarWidth: "none",
          }}
          boxShadow={"0 2px 8px 0 rgba(0, 0, 0, 0.20)"}
        >
          {env.facDbPhase1 == "ON" ? (
            <Accordion allowMultiple defaultIndex={[0]} width={"100%"}>
              <AccordionItem borderTop={"none"} borderBottom={"none"}>
                <AccordionButton p={0} aria-label="Toggle layers panel">
                  <Heading
                    flex="1"
                    textAlign="left"
                    fontSize="md"
                    fontWeight="bold"
                    lineHeight="32px"
                    pb={0}
                  >
                    Capital Planning Data
                  </Heading>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={0} pt={2} pb={0}>
                  <Box>
                    <Accordion
                      allowMultiple
                      index={filtersAccordionIndex}
                      width={"100%"}
                    >
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        paddingBottom={2}
                      >
                        <Text fontSize={"xs"}>Layer Filters</Text>
                        <HStack
                          fontSize={"sm"}
                          paddingBottom={2}
                          width={"100%"}
                          justifyContent={"space-between"}
                          whiteSpace={"nowrap"}
                          flexWrap={"wrap"}
                          rowGap={0}
                        >
                          <HStack>
                            <Link
                              color={"primary.600"}
                              textDecor={"underline"}
                              cursor={"pointer"}
                              onClick={() =>
                                setFiltersAccordionIndex([0, 1, 2])
                              }
                            >
                              Expand All
                            </Link>
                            <Text>|</Text>
                            <Link
                              color={"primary.600"}
                              textDecor={"underline"}
                              cursor={"pointer"}
                              onClick={() => setFiltersAccordionIndex([])}
                            >
                              Collapse All
                            </Link>
                          </HStack>
                          <Link
                            color={"primary.600"}
                            textDecor={"underline"}
                            cursor={"pointer"}
                            onClick={() =>
                              updateSearchParams({
                                managingAgency: null,
                                agencyBudget: null,
                                commitmentsTotalMin: null,
                                commitmentsTotalMax: null,
                                cbbrPolicyAreaId: null,
                                cbbrNeedGroupId: null,
                                cbbrAgencyInitials: null,
                                cbbrAgencyCategoryResponseIds: null,
                              })
                            }
                          >
                            Clear All
                          </Link>
                        </HStack>
                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                          <CapitalProjectLayerToggle />
                          <SearchByAttributeMenu
                            agencies={managingAgencies}
                            projectTypes={agencyBudgets}
                            onClear={clearCapitalProjectFilters}
                            updateFiltersAccordion={updateFiltersAccordion(0)}
                          />
                          <CommunityBoardBudgetRequestLayerToggle />
                          <SearchByCbbrMenu
                            cbbrPolicyAreas={cbbrPolicyAreas}
                            cbbrNeedGroups={cbbrNeedGroups}
                            cbbrAgencies={cbbrAgencies}
                            cbbrAgencyCategoryResponses={
                              cbbrAgencyCategoryResponses
                            }
                            cbbrAgencyCategoryResponseIds={
                              cbbrAgencyCategoryResponseIds
                            }
                            onClear={clearCbbrProjectFilters}
                            updateFiltersAccordion={updateFiltersAccordion(1)}
                          />
                          <CommunityBoardBudgetRequestLegend
                            updateFiltersAccordion={updateFiltersAccordion(2)}
                          />
                        </Box>
                      </Box>
                    </Accordion>
                    <Box display={"flex"} flexDirection={"column"} gap={2}>
                      <FilterMenu
                        boroughs={boroughs}
                        communityDistricts={communityDistricts}
                        cityCouncilDistricts={cityCouncilDistricts}
                      />
                    </Box>

                    <HowToUseThisTool />
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ) : (
            <Accordion allowMultiple defaultIndex={[0]} width={"100%"}>
              <MapLayersPanel>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                  <CapitalProjectLayerToggle />
                  <SearchByAttributeMenu
                    agencies={managingAgencies}
                    projectTypes={agencyBudgets}
                    onClear={clearCapitalProjectFilters}
                    updateFiltersAccordion={updateFiltersAccordion(0)}
                  />
                  <CommunityBoardBudgetRequestLayerToggle />
                  <SearchByCbbrMenu
                    cbbrPolicyAreas={cbbrPolicyAreas}
                    cbbrNeedGroups={cbbrNeedGroups}
                    cbbrAgencies={cbbrAgencies}
                    cbbrAgencyCategoryResponses={cbbrAgencyCategoryResponses}
                    cbbrAgencyCategoryResponseIds={
                      cbbrAgencyCategoryResponseIds
                    }
                    onClear={clearCbbrProjectFilters}
                    updateFiltersAccordion={updateFiltersAccordion(1)}
                  />
                  <CommunityBoardBudgetRequestLegend
                    updateFiltersAccordion={updateFiltersAccordion(2)}
                  />
                </Box>
              </MapLayersPanel>
              <FilterMenu
                boroughs={boroughs}
                communityDistricts={communityDistricts}
                cityCouncilDistricts={cityCouncilDistricts}
              />
              <HowToUseThisTool />
            </Accordion>
          )}
        </Flex>
      </GridItem>
      <GridItem
        gridColumnStart={{ base: 9, md: 6, lg: 6, xl: 5, "2xl": 4 }}
        gridRowStart={{ base: 3, md: 3, lg: 3 }}
        width={"fit-content"}
        height={"fit-content"}
      >
        <MapViewControls
          viewState={viewState}
          setViewState={setViewState}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
        />
      </GridItem>
      <GridItem
        gridColumn={{
          base: "1 / -1",
          md: "9 / span 5",
          xl: "10 / col-end",
          "2xl": "11 / col-end",
        }}
        gridRow={{
          base: "3 / -1",
          md: "row-start / row-end",
          lg: "row-start / span 1",
        }}
        height={"100%"}
        pointerEvents={"none"}
        zIndex={"2"}
        sx={{
          scrollbarWidth: "none",
        }}
        overflowY={"scroll"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={{ base: "end", md: "start" }}
      >
        <Flex
          width={"full"}
          gap={3}
          pointerEvents={"none"}
          sx={{
            "> *": {
              pointerEvents: "auto",
            },
            scrollbarWidth: "none",
          }}
          direction={"column"}
          flexShrink={{ lg: 0 }}
          maxHeight={"full"}
          justify={"end"}
          backgroundColor={"white"}
          borderRadius={10}
          overflowY={"scroll"}
          padding={4}
          boxShadow={"0 8px 4px 0 rgba(0, 0, 0, 0.08)"}
        >
          <Outlet context={{ hoveredOverItem, setHoveredOverItem }} />
        </Flex>
      </GridItem>
    </>
  );
}
