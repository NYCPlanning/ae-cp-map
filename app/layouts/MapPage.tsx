import {
  Flex,
  GridItem,
  Accordion,
  Box,
  Collapse,
  AccordionItem,
  AccordionButton,
  Heading,
  AccordionIcon,
  AccordionPanel,
  Text,
  HStack,
  Link,
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
  DistrictType,
} from "../utils/types";
import { HowToUseThisTool } from "../components/AdminDropdownContent/HowToUseThisTool";
import { MapLayersPanel } from "../components/AdminMapLayersPanel";
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
                        <HStack fontSize={"xs"} paddingBottom={2}>
                          <Link
                            color={"primary.600"}
                            textDecor={"underline"}
                            cursor={"pointer"}
                            onClick={() => setFiltersAccordionIndex([0, 1, 2])}
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
                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                          <CapitalProjectLayerToggle />
                          <SearchByAttributeMenu
                            agencies={managingAgencies}
                            projectTypes={agencyBudgets}
                            onClear={clearCapitalProjectFilters}
                            filtersAccordionIndex={filtersAccordionIndex}
                            setFiltersAccordionIndex={setFiltersAccordionIndex}
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
                            filtersAccordionIndex={filtersAccordionIndex}
                            setFiltersAccordionIndex={setFiltersAccordionIndex}
                          />
                          <CommunityBoardBudgetRequestLegend
                            filtersAccordionIndex={filtersAccordionIndex}
                            setFiltersAccordionIndex={setFiltersAccordionIndex}
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
                    filtersAccordionIndex={filtersAccordionIndex}
                    setFiltersAccordionIndex={setFiltersAccordionIndex}
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
                    filtersAccordionIndex={filtersAccordionIndex}
                    setFiltersAccordionIndex={setFiltersAccordionIndex}
                  />
                  <CommunityBoardBudgetRequestLegend
                    filtersAccordionIndex={filtersAccordionIndex}
                    setFiltersAccordionIndex={setFiltersAccordionIndex}
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
