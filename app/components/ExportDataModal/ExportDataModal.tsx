import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Radio,
  RadioGroup,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Box,
  Stack,
  StreetscapeProvider,
  HStack,
} from "@nycplanning/streetscape";
import { useEffect, useState } from "react";
import { LinkBtn } from "../LinkBtn";
import { useSearchParams, useLocation, useRouteLoaderData } from "react-router";
import { env } from "~/utils/env";
import { useStore } from "~/store";
import {
  ExportDataModalProps,
  ExportDataModalSelectedDownloadOptionsProps,
  UpdateExportDataModalProps,
} from "~/store/export-data-modal";

const { zoningApiUrl } = env;

interface SelectedDownloadOptions {
  selectedLocationText: string;
  selectedLocationSubtext: string | null;
  multipleLocationsSelected: boolean;
  capitalProjectsAppliedFilters: number;
  communityBoardBudgetRequestsAppliedFilters: number;
  facilitiesAppliedFilters: number;
}

function getSelectedDownloadOptions({
  boroughs,
  boroughIds,
  cityCouncilDistrictIds,
  communityDistrictIds,
  search,
  buffer,
  lats,
  lons,
  managingAgency,
  agencyBudget,
  commitmentsTotalMin,
  commitmentsTotalMax,
  cbbrAgencyCategoryResponseIds,
  cbbrNeedGroupId,
  cbbrPolicyAreaId,
  agencyInitials,
  facilityTypes,
  facilityOversightAgency,
  facilityJurisdictions,
  facilityCategoryIds,
  facilityGroupIds,
  facilitySubgroupIds,
}: ExportDataModalSelectedDownloadOptionsProps) {
  const distance = buffer === null ? 0 : parseInt(buffer);

  const getLocation = () => {
    if (buffer !== null && lats !== null && lons !== null) {
      return {
        selectedLocationText: search === null ? `[${lons}, ${lats}]` : search,
        selectedLocationSubtext:
          distance >= 2640
            ? `${new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(distance / 5280)} miles`
            : `${distance} feet`,
        multipleLocationsSelected: false,
      };
    } else if (communityDistrictIds !== null) {
      return {
        selectedLocationText:
          communityDistrictIds.length > 2
            ? `${boroughs?.find((borough) => borough.id === communityDistrictIds[0][0])?.title} Community District ${parseInt(communityDistrictIds[0].slice(1))}, and others`
            : communityDistrictIds.length === 2
              ? `${boroughs?.find((borough) => borough.id === communityDistrictIds[0][0])?.title} Community District ${parseInt(communityDistrictIds[0].slice(1))}, ${boroughs?.find((borough) => borough.id === communityDistrictIds[1][0])?.title} Community District ${parseInt(communityDistrictIds[1].slice(1))}`
              : `${boroughs?.find((borough) => borough.id === communityDistrictIds[0][0])?.title} Community District ${parseInt(communityDistrictIds[0].slice(1))}`,
        selectedLocationSubtext: `Geographic Filters (${communityDistrictIds.length})`,
        multipleLocationsSelected: communityDistrictIds.length > 1,
      };
    } else if (cityCouncilDistrictIds !== null) {
      return {
        selectedLocationText:
          cityCouncilDistrictIds.length > 2
            ? `City Council District ${cityCouncilDistrictIds[0]}, and others`
            : cityCouncilDistrictIds.length === 2
              ? `City Council District ${cityCouncilDistrictIds[0]}, City Council District ${cityCouncilDistrictIds[1]}`
              : `City Council District ${cityCouncilDistrictIds[0]}`,
        selectedLocationSubtext: `Geographic Filters (${cityCouncilDistrictIds.length})`,
        multipleLocationsSelected: cityCouncilDistrictIds.length > 1,
      };
    } else if (boroughIds !== null) {
      return {
        selectedLocationText:
          boroughIds.length > 2
            ? `${boroughs?.find((borough) => borough.id === boroughIds[0])?.title}, and others`
            : boroughIds.length === 2
              ? `${boroughs?.find((borough) => borough.id === boroughIds[0])?.title}, ${boroughs?.find((borough) => borough.id === boroughIds[1])?.title}`
              : `${boroughs?.find((borough) => borough.id === boroughIds[0])?.title}`,
        selectedLocationSubtext: `Geographic Filters (${boroughIds.length})`,
        multipleLocationsSelected: boroughIds.length > 1,
      };
    } else {
      return {
        selectedLocationText: "New York City (all)",
        selectedLocationSubtext: null,
        multipleLocationsSelected: false,
      };
    }
  };

  const getAppliedFilterCount = (filters: Array<null | string | string[]>) => {
    return filters.reduce((acc, curr) => {
      return (curr === null ? 0 : 1) + acc;
    }, 0);
  };

  return {
    ...getLocation(),
    capitalProjectsAppliedFilters: getAppliedFilterCount([
      managingAgency,
      agencyBudget,
      commitmentsTotalMin,
      commitmentsTotalMax,
    ]),
    communityBoardBudgetRequestsAppliedFilters: getAppliedFilterCount([
      cbbrAgencyCategoryResponseIds,
      cbbrNeedGroupId,
      cbbrPolicyAreaId,
      agencyInitials,
    ]),
    facilitiesAppliedFilters: getAppliedFilterCount([
      facilityTypes,
      facilityOversightAgency,
      facilityJurisdictions,
      facilityCategoryIds,
      facilityGroupIds,
      facilitySubgroupIds,
    ]),
  };
}

export function ExportDataModal() {
  const {
    budgetRequestsResponse: { totalBudgetRequests: totalCBBRsFromLoaderData },
    capitalProjectsResponse: {
      totalProjects: totalCapitalProjectsFromLoaderData,
    },
    facilitiesResponse: { totalFacilities: totalFacilitiesFromLoaderData },
    boroughsResponse: { boroughs },
  } = useRouteLoaderData("layouts/ResultsPanel");

  const {
    dataSetForExport,
    totalRecords,
    boroughIds,
    cityCouncilDistrictIds,
    communityDistrictIds,
    search,
    buffer,
    lats,
    lons,
    managingAgency,
    agencyBudget,
    commitmentsTotalMin,
    commitmentsTotalMax,
    cbbrAgencyCategoryResponseIds,
    cbbrNeedGroupId,
    cbbrPolicyAreaId,
    agencyInitials,
    facilityTypes,
    facilityOversightAgency,
    facilityJurisdictions,
    facilityCategoryIds,
    facilityGroupIds,
    facilitySubgroupIds,
    initializeExportDataModal,
    updateDataSetForExport,
    getExportDataModalDownloadQuery,
    clearGeoFilters,
    clearCapitalProjectFilters,
    clearCommunityBoardBudgetRequestFilters,
    clearFacilityFilters,
  } = useStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  // Set the options when the Download Modal is opened
  useEffect(() => {
    // Get Geo URL page parameters
    const boroughIdsString = searchParams.get("boroughIds");
    const boroughIdsFromQueryParams =
      boroughIdsString !== null ? boroughIdsString.split(",") : null;
    const cityCouncilDistrictIdsString = searchParams.get(
      "cityCouncilDistrictIds",
    );
    const cityCouncilDistrictIdsFromQueryParams =
      cityCouncilDistrictIdsString !== null
        ? cityCouncilDistrictIdsString.split(",")
        : null;
    const communityDistrictIdsString = searchParams.get(
      "communityDistrictIds",
    ) as string;
    const communityDistrictIdsFromQueryParams =
      communityDistrictIdsString !== null
        ? communityDistrictIdsString.split(",")
        : null;
    const searchFromQueryParams = searchParams.get("search");
    const bufferFromQueryParams = searchParams.get("radius");
    const pin = searchParams.get("pin");
    const [lonsFromQueryParams, latsFromQueryParams] =
      pin !== null ? pin.split(",") : [null, null];

    // Get Capital Project URL page parameters
    const managingAgencyFromQueryParams = searchParams.get("managingAgency");
    const agencyBudgetFromQueryParams = searchParams.get("agencyBudget");
    const commitmentsTotalMinFromQueryParams = searchParams.get(
      "commitmentsTotalMin",
    );
    const commitmentsTotalMaxFromQueryParams = searchParams.get(
      "commitmentsTotalMax",
    );

    // Get CBBR URL page parameters
    const cbbrAgencyCategoryResponseIdsFromQueryParams = searchParams.get(
      "cbbrAgencyCategoryResponseIds",
    );
    const cbbrNeedGroupIdFromQueryParams = searchParams.get("cbbrNeedGroupId");
    const cbbrPolicyAreaIdFromQueryParams =
      searchParams.get("cbbrPolicyAreaId");
    const agencyInitialsFromQueryParams =
      searchParams.get("cbbrAgencyInitials");

    // Get Facility URL page parameters
    const facilityTypesFromQueryParams = searchParams.get("facilityTypes");
    const facilityOversightAgencyFromQueryParams = searchParams.get(
      "facilityOversightAgency",
    );
    const facilityJurisdictionsFromQueryParams = searchParams.get(
      "facilityJurisdictions",
    );
    const facilityCategoryIdsFromQueryParams = searchParams.get(
      "facilityCategoryIds",
    );
    const facilityGroupIdsFromQueryParams =
      searchParams.get("facilityGroupIds");
    const facilitySubgroupIdsFromQueryParams = searchParams.get(
      "facilitySubgroupIds",
    );

    const dataSetForExport = pathname.slice(
      1,
    ) as ExportDataModalProps["dataSetForExport"];

    initializeExportDataModal({
      dataSetForExport,
      totalRecords: {
        "capital-projects": totalCapitalProjectsFromLoaderData,
        "community-board-budget-requests": totalCBBRsFromLoaderData,
        facilities: totalFacilitiesFromLoaderData,
      },
      boroughIds: boroughIdsFromQueryParams,
      cityCouncilDistrictIds: cityCouncilDistrictIdsFromQueryParams,
      communityDistrictIds: communityDistrictIdsFromQueryParams,
      search: searchFromQueryParams,
      buffer: bufferFromQueryParams,
      lats: latsFromQueryParams,
      lons: lonsFromQueryParams,
      managingAgency: managingAgencyFromQueryParams,
      agencyBudget: agencyBudgetFromQueryParams,
      commitmentsTotalMin: commitmentsTotalMinFromQueryParams,
      commitmentsTotalMax: commitmentsTotalMaxFromQueryParams,
      cbbrAgencyCategoryResponseIds:
        cbbrAgencyCategoryResponseIdsFromQueryParams,
      cbbrNeedGroupId: cbbrNeedGroupIdFromQueryParams,
      cbbrPolicyAreaId: cbbrPolicyAreaIdFromQueryParams,
      agencyInitials: agencyInitialsFromQueryParams,
      facilityTypes: facilityTypesFromQueryParams,
      facilityOversightAgency: facilityOversightAgencyFromQueryParams,
      facilityJurisdictions: facilityJurisdictionsFromQueryParams,
      facilityCategoryIds: facilityCategoryIdsFromQueryParams,
      facilityGroupIds: facilityGroupIdsFromQueryParams,
      facilitySubgroupIds: facilitySubgroupIdsFromQueryParams,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const downloadLink = `${zoningApiUrl}/${getExportDataModalDownloadQuery()}`;

  const selectedDownloadOptions: SelectedDownloadOptions =
    getSelectedDownloadOptions({
      boroughs,
      boroughIds,
      cityCouncilDistrictIds,
      communityDistrictIds,
      search,
      buffer,
      lats,
      lons,
      managingAgency,
      agencyBudget,
      commitmentsTotalMin,
      commitmentsTotalMax,
      cbbrAgencyCategoryResponseIds,
      cbbrNeedGroupId,
      cbbrPolicyAreaId,
      agencyInitials,
      facilityTypes,
      facilityOversightAgency,
      facilityJurisdictions,
      facilityCategoryIds,
      facilityGroupIds,
      facilitySubgroupIds,
    });

  return (
    <>
      {/* If you don't wrap the radios in a StreetscapeProvider in their own local tree, they won't appear.  The global one is not enough. */}
      <StreetscapeProvider>
        <Button size="xs" onClick={onOpen}>
          Export Data
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent
            height={"min-content"}
            width={{ base: "100vw", md: "400px" }}
            m={4}
          >
            <Box fontWeight={"bold"} margin={"1rem"}>
              <ModalHeader padding={"0.5rem"}>
                Export {totalRecords[dataSetForExport]?.toLocaleString("en-US")}{" "}
                Records
              </ModalHeader>
              <ModalCloseButton />
            </Box>
            <ModalBody>
              <Box marginBottom={6}>
                <Heading
                  as={"h2"}
                  fontWeight={"bold"}
                  fontSize={"xs"}
                  color={"primary.600"}
                >
                  Selected Location
                  {selectedDownloadOptions.multipleLocationsSelected ? "s" : ""}
                </Heading>
                <Text fontSize="sm">
                  {selectedDownloadOptions.selectedLocationText}
                </Text>
                {selectedDownloadOptions.selectedLocationText !==
                  "New York City (all)" && (
                  <HStack justifyContent={"space-between"}>
                    <Text fontSize="xs">
                      {selectedDownloadOptions.selectedLocationSubtext}
                    </Text>
                    <Button
                      variant={"tertiary"}
                      size="xs"
                      minH="fit-content"
                      onClick={clearGeoFilters}
                    >
                      clear
                    </Button>
                  </HStack>
                )}
              </Box>
              <Box>
                <FormControl>
                  <FormLabel htmlFor="export-all-districts">
                    <Heading
                      as={"h2"}
                      fontWeight={"bold"}
                      fontSize={"xs"}
                      color={"primary.600"}
                    >
                      Datasets
                    </Heading>
                  </FormLabel>
                  <RadioGroup
                    name="datasets"
                    value={dataSetForExport}
                    onChange={(e) =>
                      updateDataSetForExport({
                        dataSetForExport:
                          e as UpdateExportDataModalProps["dataSetForExport"],
                      })
                    }
                  >
                    <Stack gap={3}>
                      <Stack gap={0}>
                        <Radio
                          name="capital-projects"
                          size="sm"
                          value="capital-projects"
                        >
                          <Text fontSize="md">Capital Projects</Text>
                        </Radio>
                        {selectedDownloadOptions.capitalProjectsAppliedFilters >
                          0 && (
                          <HStack justifyContent={"space-between"}>
                            <Text fontSize="xs" ml={7}>
                              Applied Filters (
                              {
                                selectedDownloadOptions.capitalProjectsAppliedFilters
                              }
                              )
                            </Text>
                            <Button
                              variant={"tertiary"}
                              size="xs"
                              minH="fit-content"
                              onClick={clearCapitalProjectFilters}
                            >
                              clear
                            </Button>
                          </HStack>
                        )}
                      </Stack>
                      <Stack gap={0}>
                        <Radio
                          name="community-board-budget-requests"
                          size="sm"
                          value="community-board-budget-requests"
                        >
                          <Text fontSize="md">
                            Community Board Budget Requests
                          </Text>
                        </Radio>
                        {selectedDownloadOptions.communityBoardBudgetRequestsAppliedFilters >
                          0 && (
                          <HStack justifyContent={"space-between"}>
                            <Text fontSize="xs" ml={7}>
                              Applied Filters (
                              {
                                selectedDownloadOptions.communityBoardBudgetRequestsAppliedFilters
                              }
                              )
                            </Text>
                            <Button
                              variant={"tertiary"}
                              size="xs"
                              minH="fit-content"
                              onClick={clearCommunityBoardBudgetRequestFilters}
                            >
                              clear
                            </Button>
                          </HStack>
                        )}
                      </Stack>
                      <Stack gap={0}>
                        <Radio name="facilities" size="sm" value="facilities">
                          <Text fontSize="md">Facilities</Text>
                        </Radio>
                        {selectedDownloadOptions.facilitiesAppliedFilters >
                          0 && (
                          <HStack justifyContent={"space-between"}>
                            <Text fontSize="xs" ml={7}>
                              Applied Filters (
                              {selectedDownloadOptions.facilitiesAppliedFilters}
                              )
                            </Text>
                            <Button
                              variant={"tertiary"}
                              size="xs"
                              minH="fit-content"
                              onClick={clearFacilityFilters}
                            >
                              clear
                            </Button>
                          </HStack>
                        )}
                      </Stack>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Box>
            </ModalBody>
            <ModalFooter>
              <LinkBtn
                isExternal
                href={downloadLink}
                width={"full"}
                textAlign={"center"}
                fontWeight={"bold"}
              >
                Export Selection <span style={{ fontWeight: 400 }}>(CSV)</span>
              </LinkBtn>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </StreetscapeProvider>
    </>
  );
}
