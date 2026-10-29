import {
  Flex,
  Grid,
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
  Button,
  Tab,
  TabList,
  Tabs,
  useBreakpointValue,
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
  findFacilityAgencies,
  findCommunityDistrictsByBoroughId,
  findAgencyBudgets,
  findCapitalProjectManagingAgencies,
  findCommunityBoardBudgetRequestPolicyAreas,
  findCommunityBoardBudgetRequestNeedGroups,
  findCommunityBoardBudgetRequestAgencies,
  findCommunityBoardBudgetRequestAgencyCategoryResponses,
  findFacilityCategories,
} from "../gen";
import { SearchByAttributeMenu } from "../components/SearchByAttributeMenu";
import { env } from "../utils/env";
import {
  BoroughId,
  CommunityBoardBudgetRequestAgencyCategoryResponseId,
  CommunityBoardBudgetRequestNeedGroupId,
  CommunityBoardBudgetRequestPolicyAreaId,
  BoundaryId,
  BoundaryType,
  FacilityType,
  FacilityJurisdiction,
} from "../utils/types";
import { HowToUseThisTool } from "../components/AdminDropdownContent/HowToUseThisTool";
import {
  CapitalProjectLayerToggle,
  CommunityBoardBudgetRequestLayerToggle,
  FacilitiesLayerToggle,
} from "~/components/MapLayerToggle";
import { CommunityBoardBudgetRequestLegend } from "../components/CommunityBoardBudgetRequestLegend";
import { getMapLayers, useUpdateSearchParams } from "../utils/utils";
import type { RootContextType } from "../root";
import { MapViewControls } from "~/components/MapViewControls";
import { SearchByCbbrMenu } from "~/components/SearchByCbbrMenu";
import { SearchByFacilityMenu } from "~/components/SearchByFacilityMenu";
import { useState, useEffect, useRef } from "react";
import { useStore } from "~/store";
import { SupportingLayersPanel } from "~/components/SupportingLayersPanel";
import { registerMapControlsShortcut } from "./MapPage.utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const boundaryType = url.searchParams.get("boundaryType") as BoundaryType;
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
  const facilityTypesParam = url.searchParams.get("facilityTypes");
  const facilityTypes =
    facilityTypesParam === null
      ? []
      : (facilityTypesParam.split(",") as FacilityType[]);
  const facilityJurisdictionsParam = url.searchParams.get(
    "facilityJurisdictions",
  );
  const facilityJurisdictions =
    facilityJurisdictionsParam === null
      ? []
      : (facilityJurisdictionsParam.split(",") as FacilityJurisdiction[]);
  const facilityCategoryIdsParam = url.searchParams.get("facilityCategoryIds");
  const facilityCategoryIds =
    facilityCategoryIdsParam === null
      ? []
      : facilityCategoryIdsParam.split(",").map((id) => parseInt(id));
  const facilityGroupIdsParam = url.searchParams.get("facilityGroupIds");
  const facilityGroupIds =
    facilityGroupIdsParam === null
      ? []
      : facilityGroupIdsParam.split(",").map((id) => parseInt(id));
  const facilitySubgroupIdsParam = url.searchParams.get("facilitySubgroupIds");
  const facilitySubgroupIds =
    facilitySubgroupIdsParam === null
      ? []
      : facilitySubgroupIdsParam.split(",").map((id) => parseInt(id));

  const facilityOversightAgency = url.searchParams.get(
    "facilityOversightAgency",
  );

  const { managingAgencies } = await findCapitalProjectManagingAgencies({
    baseURL: `${env.zoningApiUrl}/api`,
  });

  const { agencyBudgets } = await findAgencyBudgets({
    baseURL: `${env.zoningApiUrl}/api`,
  });

  const facilityAgencies = await findFacilityAgencies({
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

  const facilityCategoriesList = await findFacilityCategories({
    baseURL: `${env.zoningApiUrl}/api`,
  });

  const { cbbrAgencyCategoryResponses } =
    await findCommunityBoardBudgetRequestAgencyCategoryResponses({
      baseURL: `${env.zoningApiUrl}/api`,
    });

  const { boroughs } = await findBoroughs({
    baseURL: `${env.zoningApiUrl}/api`,
  });

  if (boundaryType === "cd") {
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
        facilityTypes,
        facilityOversightAgency,
        facilityAgencies,
        facilityJurisdictions,
        facilityCategoriesList,
        facilityCategoryIds,
        facilityGroupIds,
        facilitySubgroupIds,
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
        facilityTypes,
        facilityOversightAgency,
        facilityAgencies,
        facilityJurisdictions,
        facilityCategoriesList,
        facilityCategoryIds,
        facilityGroupIds,
        facilitySubgroupIds,
      };
    }
  }

  if (boundaryType === "ccd") {
    const { cityCouncilDistricts } = await findCityCouncilDistricts({
      baseURL: `${env.zoningApiUrl}/api`,
    });
    return {
      boroughs,
      communityDistricts: null,
      cityCouncilDistricts,
      managingAgencies,
      agencyBudgets,
      cbbrPolicyAreas,
      cbbrNeedGroups,
      cbbrAgencies,
      cbbrAgencyCategoryResponses,
      cbbrAgencyCategoryResponseIds,
      facilityTypes,
      facilityOversightAgency,
      facilityAgencies,
      facilityJurisdictions,
      facilityCategoriesList,
      facilityCategoryIds,
      facilityGroupIds,
      facilitySubgroupIds,
    };
  }

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
    facilityTypes,
    facilityOversightAgency,
    facilityAgencies,
    facilityJurisdictions,
    facilityCategoriesList,
    facilityCategoryIds,
    facilityGroupIds,
    facilitySubgroupIds,
  };
};

export default function MapPage() {
  const {
    viewState,
    setViewState,
    clearCombobox,
    addressSearchSliderValue,
    clearRadiusFilter,
  } = useOutletContext<RootContextType>();
  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const [hoveredOverItem, setHoveredOverItem] = useState<string | null>(null);
  const [filtersAccordionIndex, setFiltersAccordionIndex] = useState<number[]>(
    [],
  );
  const [isHousingGrowthExpanded, setIsHousingGrowthExpanded] = useState(false);
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
    managingAgencies,
    agencyBudgets,
    cbbrPolicyAreas,
    cbbrNeedGroups,
    cbbrAgencies,
    cbbrAgencyCategoryResponses,
    cbbrAgencyCategoryResponseIds,
    facilityTypes,
    facilityOversightAgency,
    facilityAgencies,
    facilityJurisdictions,
    facilityCategoriesList,
    facilityCategoryIds,
    facilityGroupIds,
    facilitySubgroupIds,
  } = useLoaderData<typeof loader>();

  const {
    initializeCbbrAgencyCategoryResponseCheckboxes,
    initializeFacilityTypeCheckboxes,
    initializeFacilityJurisdictionCheckboxes,
    updateAllCbbrAgencyCategoryResponseCheckboxesByValue,
    initializeAllFacilityCategoryCheckboxes,
    updateAllFacilityCategoryCheckboxesByValue,
  } = useStore((state) => state);

  useEffect(() => {
    if (cbbrAgencyCategoryResponseIds.length === 0) {
      initializeCbbrAgencyCategoryResponseCheckboxes({
        checkboxes: cbbrAgencyCategoryResponses,
        cbbrAgencyCategoryResponseIds: cbbrAgencyCategoryResponses.map(
          (resp) => resp.id,
        ),
      });
    } else {
      initializeCbbrAgencyCategoryResponseCheckboxes({
        checkboxes: cbbrAgencyCategoryResponses,
        cbbrAgencyCategoryResponseIds: cbbrAgencyCategoryResponseIds.map((id) =>
          parseInt(id),
        ),
      });
    }
    initializeFacilityTypeCheckboxes({
      checkboxes: ["Public", "Non-public", "Not specified"],
      facilityTypes:
        facilityTypes.length === 0
          ? ["Public", "Non-public", "Not specified"]
          : facilityTypes,
    });
    initializeFacilityJurisdictionCheckboxes({
      checkboxes: ["City", "State", "Federal", "County", "Not specified"],
      facilityJurisdictions:
        facilityJurisdictions.length === 0
          ? ["City", "State", "Federal", "County", "Not specified"]
          : facilityJurisdictions,
    });
    initializeAllFacilityCategoryCheckboxes({
      facilityCategoriesList,
      facilityCategoryIds,
      facilityGroupIds,
      facilitySubgroupIds,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearCapitalProjectFilters = () => {
    updateSearchParams({
      managingAgency: null,
      agencyBudget: null,
      commitmentsTotalMin: null,
      commitmentsTotalMax: null,
    });
  };

  const clearCbbrProjectFilters = () => {
    updateAllCbbrAgencyCategoryResponseCheckboxesByValue(true);
    updateSearchParams({
      cbbrPolicyAreaId: null,
      cbbrNeedGroupId: null,
      cbbrAgencyInitials: null,
      cbbrAgencyCategoryResponseIds: null,
    });
  };

  const clearFacilityFilters = () => {
    initializeFacilityTypeCheckboxes({
      checkboxes: ["Public", "Non-public", "Not specified"],
      facilityTypes: ["Public", "Non-public", "Not specified"],
    });
    initializeFacilityJurisdictionCheckboxes({
      checkboxes: ["City", "State", "Federal", "County", "Not specified"],
      facilityJurisdictions: [
        "City",
        "State",
        "Federal",
        "County",
        "Not specified",
      ],
    });
    updateAllFacilityCategoryCheckboxesByValue(true);
    updateSearchParams({
      facilityTypes: null,
      facilityOversightAgency: null,
      facilityJurisdictions: null,
      facilityCategoryIds: null,
      facilityGroupIds: null,
      facilitySubgroupIds: null,
    });
  };

  const layers = getMapLayers(searchParams.get("layers"));
  const showCapitalProjects = layers.includes("capitalProjects");
  const showCbbr = layers.includes("cbbr");
  const showFacilities = layers.includes("facilities");

  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boundaryId = searchParams.get("boundaryId") as BoundaryId;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const boroughIds = searchParams.get("boroughIds") as BoroughId;
  const cityCouncilDistrictIds = searchParams.get(
    "cityCouncilDistrictIds",
  ) as string;
  const communityDistrictIds = searchParams.get(
    "communityDistrictIds",
  ) as string;

  const getDefaultIndex = (type: BoundaryType | null) => {
    switch (type) {
      case "ccd":
        return 1;
      case "borough":
        return 2;
      default:
        return 0;
    }
  };

  const isLargeScreen =
    useBreakpointValue({
      base: false,
      md: true,
      lg: true,
    }) ?? false;

  const [layersAccordionIndex, setLayersAccordionIndex] = useState<number[]>(
    [],
  );

  // accordian panel mobile collapse
  const previousIsLargeScreen = useRef<boolean | null>(null);

  useEffect(() => {
    if (previousIsLargeScreen.current === isLargeScreen) {
      return;
    }

    previousIsLargeScreen.current = isLargeScreen;

    setLayersAccordionIndex(isLargeScreen ? [0] : []);
  }, [isLargeScreen]);

  // results panel mobile collapse
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    setIsPanelOpen(isLargeScreen);
  }, [isLargeScreen]);

  const [areControlsVisible, setAreControlsVisible] = useState(true);

  useEffect(() => {
    return registerMapControlsShortcut(setAreControlsVisible);
  }, []);

  const [savedGeoSelection, setSavedGeoSelection] = useState<{
    cd: { communityDistrictIds: string } | undefined;
    ccd: { cityCouncilDistrictIds: string } | undefined;
    borough: { boroughIds: string } | undefined;
  }>({ cd: undefined, ccd: undefined, borough: undefined });

  return (
    <Grid
      templateColumns={{
        base: "0 [col-start] 1fr repeat(6, 1fr) 1fr [col-end] 0",
        md: "1.5dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 1.5dvw",
        lg: "1.18dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 1.18dvw",
        xl: "0.86dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 0.86dvw",
        "2xl": "0.8dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 0.82dvw",
      }}
      gap={{
        base: "0 3dvw",
        md: "0 1.6dvw",
        lg: "0 1.22dvw",
        xl: "0 0.94dvw",
        "2xl": "0 0.78dvw",
      }}
      templateRows={{
        base: "2dvh [tabs-start] 7dvh [panels-start] 2dvh [results-start] minmax(0, 1fr) [panels-end] 2dvh 7dvh",
        md: "2dvh [tabs-start] 7dvh [panels-start] 2dvh [results-start] minmax(0, 1fr) [panels-end] 2dvh",
        lg: "2dvh [tabs-start] min-content [tabs-end] [panels-start] minmax(0, 1fr) [panels-end] 2dvh",
      }}
      width={"100%"}
      height={"100%"}
      minHeight={0}
      minWidth={0}
      overflow={"hidden"}
      className={"mapLayout"}
    >
      <GridItem
        gridColumn={"1 / -1"}
        gridRow={"1 / -1"}
        className={"atlasContainer"}
      >
        <Atlas
          viewState={viewState}
          setViewState={(MapViewState) => setViewState(MapViewState)}
          showCapitalProjects={showCapitalProjects}
          showCbbr={showCbbr}
          showFacilities={showFacilities}
          hoveredOverItem={hoveredOverItem}
          setHoveredOverItem={setHoveredOverItem}
          clearCombobox={clearCombobox}
          addressSearchSliderValue={addressSearchSliderValue}
        />{" "}
      </GridItem>
      <GridItem
        bgColor="white"
        borderRadius="lg"
        gridRow={"tabs-start / panels-start"}
        gridColumn={{
          base: "col-start / span 8",
          md: "col-start / span 7",
          xl: "5 / span 5",
          "2xl": "4 / span 7",
        }}
        display={areControlsVisible ? undefined : "none"}
        height={"fit-content"}
        alignSelf={"start"}
        className={"tabsContainer"}
      >
        <Tabs
          variant={"mapControl"}
          style={{
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            borderRadius: "lg",
          }}
          whiteSpace={"nowrap"}
          width={{ base: "100%", md: "fit-content" }}
          defaultIndex={getDefaultIndex(boundaryType)}
        >
          <TabList
            key={"TabList"}
            display={{ base: "grid", md: "inline-grid" }}
            gridAutoColumns={"1fr"}
          >
            <Tab
              key={"Community Districts"}
              fontSize={{
                base: "xs",
                md: "sm",
              }}
              gridRow={1}
              onClick={() => {
                if (boundaryType === "borough" && boroughIds !== null)
                  setSavedGeoSelection({
                    ...savedGeoSelection,
                    borough: { boroughIds },
                  });
                if (
                  boundaryType === "ccd" &&
                  (boundaryId !== null || cityCouncilDistrictIds !== null)
                )
                  setSavedGeoSelection({
                    ...savedGeoSelection,
                    ccd: {
                      cityCouncilDistrictIds,
                    },
                  });
                if (savedGeoSelection.cd === undefined) {
                  updateSearchParams({
                    boundaryType: "cd",
                    boroughIds: null,
                    cityCouncilDistrictIds: null,
                    communityDistrictIds: null,
                  });
                } else {
                  updateSearchParams({
                    boundaryType: "cd",
                    boroughIds: null,
                    cityCouncilDistrictIds: null,
                    communityDistrictIds:
                      savedGeoSelection.cd.communityDistrictIds,
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
              gridRow={1}
              onClick={() => {
                if (boundaryType === "borough" && boroughIds !== null)
                  setSavedGeoSelection({
                    ...savedGeoSelection,
                    borough: { boroughIds },
                  });
                if (
                  boundaryType === "cd" &&
                  ((boundaryId !== null && boroughId !== null) ||
                    communityDistrictIds !== null)
                )
                  setSavedGeoSelection({
                    ...savedGeoSelection,
                    cd: { communityDistrictIds },
                  });
                if (savedGeoSelection.ccd === undefined) {
                  updateSearchParams({
                    boundaryType: "ccd",
                    boroughIds: null,
                    communityDistrictIds: null,
                  });
                } else {
                  updateSearchParams({
                    boundaryType: "ccd",
                    boroughIds: null,
                    cityCouncilDistrictIds:
                      savedGeoSelection.ccd.cityCouncilDistrictIds,
                    communityDistrictIds: null,
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
              gridRow={1}
              onClick={() => {
                if (
                  boundaryType === "cd" &&
                  ((boundaryId !== null && boroughId !== null) ||
                    communityDistrictIds !== null)
                )
                  setSavedGeoSelection({
                    ...savedGeoSelection,
                    cd: { communityDistrictIds },
                  });
                if (
                  boundaryType === "ccd" &&
                  (boundaryId !== null || cityCouncilDistrictIds !== null)
                )
                  setSavedGeoSelection({
                    ...savedGeoSelection,
                    ccd: {
                      cityCouncilDistrictIds,
                    },
                  });
                if (savedGeoSelection.borough === undefined) {
                  updateSearchParams({
                    boundaryType: "borough",
                    boroughIds: null,
                    cityCouncilDistrictIds: null,
                    communityDistrictIds: null,
                  });
                } else {
                  updateSearchParams({
                    boundaryType: "borough",
                    boroughIds: savedGeoSelection.borough.boroughIds,
                    cityCouncilDistrictIds: null,
                    communityDistrictIds: null,
                  });
                }
              }}
            >
              Boroughs
            </Tab>
          </TabList>
        </Tabs>
      </GridItem>
      <GridItem
        gridColumn={{
          base: "col-start / span 7",
          md: "col-start / span 5",
          lg: "col-start / span 4",
          xl: "col-start / span 3",
          "2xl": "col-start / span 2",
        }}
        gridRow={{
          base: "panels-start / panels-end",
          lg: "panels-start / panels-end",
          xl: "tabs-start / panels-end",
        }}
        display={areControlsVisible ? undefined : "none"}
        maxHeight={"100%"}
        pointerEvents={"none"}
        zIndex={"1"}
        sx={{
          scrollbarWidth: "none",
        }}
        className={"filtersContainer"}
      >
        <Flex
          direction={"column"}
          width={{ base: "100%", lg: "auto" }}
          alignItems={"center"}
          flexShrink={{ lg: 0 }}
          maxHeight={"100%"}
          pointerEvents={"auto"}
          backgroundColor={"white"}
          borderRadius={10}
          overflowY={"scroll"}
          padding={4}
          sx={{
            scrollbarWidth: "none",
          }}
          boxShadow={"0 2px 8px 0 rgba(0, 0, 0, 0.20)"}
        >
          <Accordion
            allowMultiple
            width={"100%"}
            index={layersAccordionIndex}
            onChange={(nextIndex) => {
              setLayersAccordionIndex(nextIndex as number[]);
            }}
          >
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
                            onClick={() => {
                              setFiltersAccordionIndex([0, 1, 2, 3]);
                              setIsHousingGrowthExpanded(true);
                            }}
                          >
                            Expand All
                          </Link>
                          <Text>|</Text>
                          <Link
                            color={"primary.600"}
                            textDecor={"underline"}
                            cursor={"pointer"}
                            onClick={() => {
                              setFiltersAccordionIndex([]);
                              setIsHousingGrowthExpanded(false);
                            }}
                          >
                            Collapse All
                          </Link>
                        </HStack>
                        <Link
                          color={"primary.600"}
                          textDecor={"underline"}
                          cursor={"pointer"}
                          onClick={() => {
                            updateSearchParams({
                              managingAgency: null,
                              agencyBudget: null,
                              commitmentsTotalMin: null,
                              commitmentsTotalMax: null,
                              cbbrPolicyAreaId: null,
                              cbbrNeedGroupId: null,
                              cbbrAgencyInitials: null,
                              cbbrAgencyCategoryResponseIds: null,
                              facilityTypes: null,
                              facilityOversightAgency: null,
                              facilityJurisdictions: null,
                            });
                            updateAllCbbrAgencyCategoryResponseCheckboxesByValue(
                              true,
                            );
                            initializeFacilityTypeCheckboxes({
                              checkboxes: [
                                "Public",
                                "Non-public",
                                "Not specified",
                              ],
                              facilityTypes: [
                                "Public",
                                "Non-public",
                                "Not specified",
                              ],
                            });
                            initializeFacilityJurisdictionCheckboxes({
                              checkboxes: [
                                "City",
                                "State",
                                "Federal",
                                "County",
                                "Not specified",
                              ],
                              facilityJurisdictions: [
                                "City",
                                "State",
                                "Federal",
                                "County",
                                "Not specified",
                              ],
                            });
                          }}
                        >
                          Clear All
                        </Link>
                      </HStack>
                      <Box display={"flex"} flexDirection={"column"} gap={4}>
                        <Box>
                          <CapitalProjectLayerToggle />
                          <SearchByAttributeMenu
                            agencies={managingAgencies}
                            projectTypes={agencyBudgets}
                            onClear={clearCapitalProjectFilters}
                            updateFiltersAccordion={updateFiltersAccordion(0)}
                            isLayerVisible={showCapitalProjects}
                          />
                        </Box>
                        <Box>
                          <CommunityBoardBudgetRequestLayerToggle />
                          <SearchByCbbrMenu
                            cbbrPolicyAreas={cbbrPolicyAreas}
                            cbbrNeedGroups={cbbrNeedGroups}
                            cbbrAgencies={cbbrAgencies}
                            cbbrAgencyCategoryResponses={
                              cbbrAgencyCategoryResponses
                            }
                            onClear={clearCbbrProjectFilters}
                            updateFiltersAccordion={updateFiltersAccordion(1)}
                            isLayerVisible={showCbbr}
                          />
                          <CommunityBoardBudgetRequestLegend
                            updateFiltersAccordion={updateFiltersAccordion(2)}
                            isLayerVisible={showCbbr}
                          />
                        </Box>
                        <Box>
                          <FacilitiesLayerToggle />
                          <SearchByFacilityMenu
                            onClear={clearFacilityFilters}
                            updateFiltersAccordion={updateFiltersAccordion(3)}
                            facilityAgencies={facilityAgencies}
                            facilityOversightAgency={facilityOversightAgency}
                            isLayerVisible={showFacilities}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Accordion>
                  <SupportingLayersPanel
                    isExpanded={isHousingGrowthExpanded}
                    onExpandedChange={setIsHousingGrowthExpanded}
                  />
                  <HowToUseThisTool />
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </GridItem>
      <GridItem
        gridColumnStart={{ base: 9, md: 7, lg: 6, xl: 5, "2xl": 4 }}
        gridRow={{
          base: "panels-start / span 1",
          lg: "panels-start / panels-end",
        }}
        display={areControlsVisible ? undefined : "none"}
        width={"fit-content"}
        height={"fit-content"}
        alignSelf={"start"}
        zIndex={"2"}
        className={"mapControlsContainer"}
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
          md: "8 / col-end",
          lg: "9 / span 5",
          xl: "10 / col-end",
          "2xl": "11 / col-end",
        }}
        gridRow={{
          base: "1 / -1",
          md: "panels-start / panels-end",
          lg: "tabs-start / -1",
        }}
        height={"100%"}
        pointerEvents={"none"}
        zIndex={"3"}
        sx={{
          scrollbarWidth: "none",
        }}
        display={areControlsVisible ? "flex" : "none"}
        flexDirection={"column"}
        justifyContent={{ base: "end", md: "start" }}
        className={"resultsContainer"}
      >
        <Flex
          width={"full"}
          gap={3}
          pointerEvents={"auto"}
          sx={{
            scrollbarWidth: "none",
          }}
          direction={"column"}
          flexShrink={{ lg: 0 }}
          height={{
            base: isPanelOpen ? "100%" : "64px",
            md: "auto",
          }}
          maxHeight={{
            base: isPanelOpen ? "100%" : "64px",
            md: "full",
          }}
          opacity={1}
          overflowY={isPanelOpen ? "scroll" : "hidden"}
          backgroundColor={"white"}
          borderRadius={{
            base: "10px 10px 0 0",
            md: "10px",
          }}
          padding={4}
          boxShadow={"0 8px 4px 0 rgba(0, 0, 0, 0.08)"}
          transition={"max-height 0.1s ease"}
        >
          <Outlet
            context={{
              hoveredOverItem,
              setHoveredOverItem,
              clearRadiusFilter,
              isPanelOpen,
              setIsPanelOpen,
            }}
          />
        </Flex>
      </GridItem>
      {!areControlsVisible && (
        <GridItem
          gridColumn={"1 / -1"}
          gridRow={"1 / -1"}
          zIndex={"10"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"start"}
          paddingTop={"2dvh"}
          pointerEvents={"none"}
        >
          <Button
            type="button"
            variant="primary"
            onClick={() => setAreControlsVisible(true)}
            pointerEvents={"auto"}
          >
            Show controls (H)
          </Button>
        </GridItem>
      )}
    </Grid>
  );
}
