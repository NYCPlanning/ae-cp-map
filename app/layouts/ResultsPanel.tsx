import {
  findAgencies,
  findBoroughs,
  findCapitalProjects,
  findFacilities,
  findCommunityBoardBudgetRequests,
  FindFacilitiesQueryParamsFacilityJurisdictionsEnumKey,
  FindFacilitiesQueryParamsFacilityOperatorTypesEnumKey,
} from "~/gen";
import {
  data,
  LoaderFunctionArgs,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSearchParams,
} from "react-router";
import {
  Card,
  CardBody,
  ChevronRightIcon,
  ClipboardCheckIcon,
  DarkableIconProps,
  EducationIcon,
  Flex,
  Heading,
  HealthIcon,
  HousingIcon,
  Icon,
  InfrastructureIcon,
  ParksIcon,
  PeopleIcon,
  SafetyIcon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  TransportationIcon,
  VStack,
} from "@nycplanning/streetscape";
import { Pagination } from "../components/Pagination";
import { useState, useEffect } from "react";
import { analytics } from "~/utils/analytics";
import { formatFiscalYearRange } from "~/utils/utils";
import { ContentPanelAccordion } from "../components/ContentPanelAccordion";
import {
  CapitalProjectListItemSkeleton,
  CommunityBoardBudgetRequestListItemSkeleton,
} from "~/components/Skeletons";
export const urlPaths = [
  "capital-projects",
  "community-board-budget-requests",
  "facilities",
];
import { ExportDataModal } from "../components/ExportDataModal";
import { NoResultsWarning } from "~/components/NoResultsWarning";
import { env } from "~/utils/env";
import { ADDRESS_SEARCH_RADIUS } from "~/components/HeaderBar/AddressSearch";
import { LinkBtn } from "~/components/LinkBtn";
import { SelectedLocations } from "~/components/SelectedLocations";
import { useStore } from "~/store";
import { FacilityListItemSkeleton } from "~/components/Skeletons/FacilityListItemSkeleton";
import { Tag } from "@chakra-ui/react";

const { stateOfGoodRepair } = env;

export const policyAreaIcons: Record<
  number,
  (props: DarkableIconProps) => JSX.Element
> = {
  1: HealthIcon,
  2: EducationIcon,
  3: SafetyIcon,
  4: InfrastructureIcon,
  5: HousingIcon,
  6: TransportationIcon,
  7: ParksIcon,
  8: PeopleIcon,
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

const { zoningApiUrl } = env;

const tabs = [
  { urlPath: "capital-projects", label: "Capital Projects" },
  { urlPath: "community-board-budget-requests", label: "Budget Requests" },
  { urlPath: "facilities", label: "Facilities" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const boundaryType = url.searchParams.get("boundaryType");
  const boroughId = url.searchParams.get("boroughId");
  const boroughIdsString = url.searchParams.get("boroughIds");
  const boroughIds =
    boroughIdsString !== null ? boroughIdsString.split(",") : null;
  const boundaryId = url.searchParams.get("boundaryId");
  const cityCouncilDistrictIdsString = url.searchParams.get(
    "cityCouncilDistrictIds",
  );
  const cityCouncilDistrictIds =
    cityCouncilDistrictIdsString !== null
      ? cityCouncilDistrictIdsString.split(",")
      : boundaryId !== null
        ? [boundaryId]
        : null;
  const cbbrAgencyCategoryResponseIds = url.searchParams.get(
    "cbbrAgencyCategoryResponseIds",
  );
  const communityDistrictIdsString = url.searchParams.get(
    "communityDistrictIds",
  ) as string;
  const communityDistrictIds =
    communityDistrictIdsString !== null
      ? communityDistrictIdsString.split(",")
      : boroughId === null || boundaryId === null
        ? null
        : [`${boroughId}${boundaryId}`];

  const cbbrNeedGroupId = url.searchParams.get("cbbrNeedGroupId");
  const itemsPerPage = 7;
  const cbbrPageParam = url.searchParams.get("cbbrPage");
  const cbbrPolicyAreaId = url.searchParams.get("cbbrPolicyAreaId");
  const cbbrAgencyInitials = url.searchParams.get("cbbrAgencyInitials");
  const bufferParam = url.searchParams.get("radius");
  const buffer = bufferParam === null ? -1 : parseInt(bufferParam);
  const pin = url.searchParams.get("pin");
  const [lon, lat] =
    pin === null
      ? [undefined, undefined]
      : pin.split(",").map((d) => parseFloat(d));

  const cbbrPage = cbbrPageParam === null ? 1 : parseInt(cbbrPageParam);
  if (isNaN(cbbrPage)) {
    throw data("Bad Request", { status: 400 });
  }
  const cbbrOffset = (cbbrPage - 1) * itemsPerPage;
  const budgetRequestsPromise = findCommunityBoardBudgetRequests(
    {
      ...(communityDistrictIds !== null && boundaryType === "cd"
        ? { communityDistrictIds }
        : {}),
      ...(cityCouncilDistrictIds !== null && boundaryType === "ccd"
        ? { cityCouncilDistrictIds }
        : {}),
      ...(boroughIds !== null && boundaryType === "borough"
        ? { boroughIds: boroughIds }
        : {}),
      ...(buffer >= ADDRESS_SEARCH_RADIUS.MIN &&
      buffer <= ADDRESS_SEARCH_RADIUS.MAX &&
      lon !== undefined &&
      lat !== undefined
        ? { geometry: "Point", buffer, lats: [lat], lons: [lon] }
        : {}),
      cbbrType: "C",
      cbbrAgencyCategoryResponseIds:
        cbbrAgencyCategoryResponseIds === null
          ? undefined
          : cbbrAgencyCategoryResponseIds
              .split(",")
              .map((item) => parseInt(item)),
      cbbrNeedGroupId:
        cbbrNeedGroupId === null ? undefined : parseInt(cbbrNeedGroupId),
      cbbrPolicyAreaId:
        cbbrPolicyAreaId === null ? undefined : parseInt(cbbrPolicyAreaId),
      agencyInitials:
        cbbrAgencyInitials === null ? undefined : cbbrAgencyInitials,
      limit: itemsPerPage,
      offset: cbbrOffset,
    },
    {
      baseURL: `${zoningApiUrl}/api`,
    },
  );

  const cpPageParam = url.searchParams.get("cpPage");
  const cpPage = cpPageParam === null ? 1 : parseInt(cpPageParam);
  if (isNaN(cpPage)) {
    throw data("Bad Request", { status: 400 });
  }
  const cpOffset = (cpPage - 1) * itemsPerPage;
  const managingAgency = url.searchParams.get("managingAgency");
  const agencyBudget = url.searchParams.get("agencyBudget");
  const commitmentsTotalMin = url.searchParams.get("commitmentsTotalMin");
  const commitmentsTotalMax = url.searchParams.get("commitmentsTotalMax");
  const capitalProjectsPromise = findCapitalProjects(
    {
      ...(communityDistrictIds !== null && boundaryType === "cd"
        ? { communityDistrictIds }
        : {}),
      ...(cityCouncilDistrictIds !== null && boundaryType === "ccd"
        ? { cityCouncilDistrictIds }
        : {}),
      ...(boroughIds !== null && boundaryType === "borough"
        ? { boroughIds: boroughIds }
        : {}),
      ...(buffer >= ADDRESS_SEARCH_RADIUS.MIN &&
      buffer <= ADDRESS_SEARCH_RADIUS.MAX &&
      lon !== undefined &&
      lat !== undefined
        ? { geometry: "Point", buffer, lats: [lat], lons: [lon] }
        : {}),
      ...(managingAgency === null ? {} : { managingAgency }),
      ...(agencyBudget === null ? {} : { agencyBudget }),
      ...(commitmentsTotalMin === null ? {} : { commitmentsTotalMin }),
      ...(commitmentsTotalMax === null ? {} : { commitmentsTotalMax }),
      ...(boundaryId !== null ||
      boroughIds !== null ||
      cityCouncilDistrictIds !== null ||
      communityDistrictIds !== null ||
      (buffer >= ADDRESS_SEARCH_RADIUS.MIN &&
        buffer <= ADDRESS_SEARCH_RADIUS.MAX &&
        lon !== undefined &&
        lat !== undefined)
        ? {}
        : { isMapped: true }),
      limit: itemsPerPage,
      offset: cpOffset,
    },
    {
      baseURL: `${zoningApiUrl}/api`,
    },
  );

  const agenciesPromise = findAgencies({
    baseURL: `${zoningApiUrl}/api`,
  });

  const boroughsPromise = findBoroughs({
    baseURL: `${zoningApiUrl}/api`,
  });

  const facilitiesPageParam = url.searchParams.get("facilitiesPage");
  const facilitiesPage =
    facilitiesPageParam === null ? 1 : parseInt(facilitiesPageParam);
  if (isNaN(facilitiesPage)) {
    throw data("Bad Request", { status: 400 });
  }
  const facilityOffset = (facilitiesPage - 1) * itemsPerPage;
  const facilityJurisdictions = url.searchParams.get("facilityJurisdictions");
  const facilityTypes = url.searchParams.get("facilityTypes");
  const facilityOversightAgency = url.searchParams.get(
    "facilityOversightAgency",
  );
  const facilityCategoryIds = url.searchParams.get("facilityCategoryIds");
  const facilityGroupIds = url.searchParams.get("facilityGroupIds");
  const facilitySubgroupIds = url.searchParams.get("facilitySubgroupIds");
  const bbl = url.searchParams.get("bbl");
  const bin = url.searchParams.get("bin");
  const facilitiesPromise = findFacilities(
    {
      ...(communityDistrictIds !== null && boundaryType === "cd"
        ? { communityDistrictIds }
        : {}),
      ...(cityCouncilDistrictIds !== null && boundaryType === "ccd"
        ? { cityCouncilDistrictIds }
        : {}),
      ...(boroughIds !== null && boundaryType === "borough"
        ? { boroughIds: boroughIds }
        : {}),
      ...(buffer >= ADDRESS_SEARCH_RADIUS.MIN &&
      buffer <= ADDRESS_SEARCH_RADIUS.MAX &&
      lon !== undefined &&
      lat !== undefined
        ? { geometry: "Point", buffer, lats: [lat], lons: [lon] }
        : {}),
      facilityJurisdictions:
        facilityJurisdictions === null
          ? undefined
          : (facilityJurisdictions.split(
              ",",
            ) as FindFacilitiesQueryParamsFacilityJurisdictionsEnumKey[]),
      facilityOperatorTypes:
        facilityTypes === null
          ? undefined
          : (facilityTypes.split(
              ",",
            ) as FindFacilitiesQueryParamsFacilityOperatorTypesEnumKey[]),
      facilityOversightAgency:
        facilityOversightAgency === null ? undefined : facilityOversightAgency,
      facilityCategoryIds:
        facilityCategoryIds === null
          ? undefined
          : facilityCategoryIds.split(",").map((item) => parseInt(item)),
      facilityGroupIds:
        facilityGroupIds === null
          ? undefined
          : facilityGroupIds.split(",").map((item) => parseInt(item)),
      facilitySubgroupIds:
        facilitySubgroupIds === null
          ? undefined
          : facilitySubgroupIds.split(",").map((item) => parseInt(item)),
      bbl: bbl === null ? undefined : bbl,
      bin: bin === null ? undefined : bin,
      limit: itemsPerPage,
      offset: facilityOffset,
    },
    {
      baseURL: `${zoningApiUrl}/api`,
    },
  );

  const [
    budgetRequestsResponse,
    capitalProjectsResponse,
    agenciesResponse,
    boroughsResponse,
    facilitiesResponse,
  ] = await Promise.all([
    budgetRequestsPromise,
    capitalProjectsPromise,
    agenciesPromise,
    boroughsPromise,
    facilitiesPromise,
  ]);

  return {
    agenciesResponse,
    boroughsResponse,
    budgetRequestsResponse,
    capitalProjectsResponse,
    facilitiesResponse,
  };
}

export default function ResultsPanel() {
  const cbbrAgencyCategoryResponseCheckboxes = useStore(
    (state) => state.cbbrAgencyCategoryResponseCheckboxes,
  );
  const zeroCBBRs =
    cbbrAgencyCategoryResponseCheckboxes.find((c) => c.checked === true) ===
    undefined;
  const {
    budgetRequestsResponse,
    capitalProjectsResponse: { capitalProjects, totalProjects },
    facilitiesResponse: { facilities, totalFacilities },
    agenciesResponse: { agencies },
    boroughsResponse: { boroughs },
  } = useLoaderData<typeof loader>();
  const { communityBoardBudgetRequests } = zeroCBBRs
    ? { communityBoardBudgetRequests: [] }
    : budgetRequestsResponse;
  const { totalBudgetRequests } = zeroCBBRs
    ? { totalBudgetRequests: 0 }
    : budgetRequestsResponse;

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tabIndex, setTabIndex] = useState(() =>
    tabs.findIndex((tab) => `/${tab.urlPath}` === pathname),
  );
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  useEffect(() => {
    setTabIndex(tabs.findIndex((tab) => `/${tab.urlPath}` === pathname));
  }, [pathname]);

  const handleTabsChange = (index: number) => {
    navigate({
      pathname: tabs[index].urlPath,
      search: `?${searchParams.toString()}`,
    });
  };

  const boundaryType = searchParams.get("boundaryType");
  const boroughId = searchParams.get("boroughId");
  const boundaryId = searchParams.get("boundaryId");
  const cityCouncilDistrictIdsString = searchParams.get(
    "cityCouncilDistrictIds",
  );
  const cityCouncilDistrictIds =
    cityCouncilDistrictIdsString !== null
      ? cityCouncilDistrictIdsString.split(",")
      : boundaryId !== null
        ? [boundaryId]
        : null;
  const communityDistrictIdsString = searchParams.get(
    "communityDistrictIds",
  ) as string;
  const communityDistrictIds =
    communityDistrictIdsString !== null
      ? communityDistrictIdsString.split(",")
      : boroughId === null || boundaryId === null
        ? null
        : [`${boroughId}${boundaryId}`];

  let exportDataGeography = "All";
  let exportDataFileName = "projects_in_geographies.zip";
  if (boundaryType === "cd" && boroughId !== null && boundaryId !== null) {
    const borough = boroughs.find((borough) => borough.id === boroughId);
    exportDataGeography =
      borough !== undefined
        ? `Community District ${borough.abbr}${boundaryId}`
        : "";
    exportDataFileName =
      borough !== undefined
        ? `community_district_${borough.title.toLowerCase()}_cd${boundaryId}.csv`
        : "";
  }

  if (boundaryType === "ccd" && boundaryId !== null) {
    exportDataGeography = `City Council District ${boundaryId}`;
    exportDataFileName = `city_council_district_${boundaryId}.csv`;
  }

  const cbbrAgencyCategoryResponseIds = searchParams.get(
    "cbbrAgencyCategoryResponseIds",
  );
  const cbbrNeedGroupId = searchParams.get("cbbrNeedGroupId");
  const cbbrPolicyAreaId = searchParams.get("cbbrPolicyAreaId");
  const agencyInitials = searchParams.get("agencyInitials");
  const cbbrDownloadParams = new URLSearchParams({
    cbbrType: "C",
    ...(communityDistrictIds !== null && boundaryType === "cd"
      ? { communityDistrictIds: communityDistrictIds.join(",") }
      : {}),
    ...(cityCouncilDistrictIds !== null && boundaryType === "ccd"
      ? { cityCouncilDistrictIds: cityCouncilDistrictIds.join(",") }
      : {}),
    ...(cbbrAgencyCategoryResponseIds === null
      ? {}
      : { cbbrAgencyCategoryResponseIds }),
    ...(cbbrNeedGroupId === null ? {} : { cbbrNeedGroupId }),
    ...(cbbrPolicyAreaId === null ? {} : { cbbrPolicyAreaId }),
    ...(agencyInitials === null ? {} : { agencyInitials }),
  }).toString();

  const { hoveredOverItem, setHoveredOverItem, clearRadiusFilter } =
    useOutletContext<{
      hoveredOverItem: string;
      setHoveredOverItem: (v: string | null) => void;
      clearRadiusFilter: () => void;
    }>();

  const boroughIds = searchParams.get("boroughIds");
  const radiusParam = searchParams.get("radius");
  const radius = radiusParam === null ? -1 : parseInt(radiusParam);

  const showSelections =
    (boundaryType !== null && boundaryId !== null) ||
    (boundaryType !== null && boroughIds !== null && boroughIds.length > 0) ||
    (boundaryType !== null &&
      cityCouncilDistrictIds !== null &&
      cityCouncilDistrictIds.length > 0) ||
    (boundaryType !== null &&
      communityDistrictIds !== null &&
      communityDistrictIds.length > 0) ||
    (radius !== null && radius > 0);

  return (
    <ContentPanelAccordion accordionHeading={`Results`}>
      {showSelections && (
        <SelectedLocations clearRadiusFilter={clearRadiusFilter} />
      )}
      <Tabs index={tabIndex} onChange={handleTabsChange} isFitted={true}>
        <TabList
          maxWidth={"100%"}
          borderBottomWidth="1px"
          borderColor="gray.200"
          marginY={2}
        >
          <Tab fontSize={"xs"} flexWrap={"wrap"}>
            <Text>Capital&nbsp;Projects&nbsp;</Text>
          </Tab>
          <Tab fontSize={"xs"} flexWrap={"wrap"}>
            <Text>Budget&nbsp;Requests&nbsp;</Text>
          </Tab>
          <Tab fontSize={"xs"} flexWrap={"wrap"}>
            <Text>Facilities&nbsp;</Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel padding={0}>
            <VStack align={"start"}>
              {capitalProjects.length === 0 ? (
                <NoResultsWarning />
              ) : (
                capitalProjects.map((capitalProject, index) => {
                  if (isNavigating)
                    return (
                      <CapitalProjectListItemSkeleton
                        key={`capitalproject${index}`}
                      />
                    );
                  return (
                    <Card
                      key={`${capitalProject.managingCode}${capitalProject.id}`}
                      backgroundColor={
                        `${capitalProject.managingCode}${capitalProject.id}` ===
                        hoveredOverItem
                          ? "gray.100"
                          : "gray.50"
                      }
                      variant={"calm"}
                      direction={"row"}
                      width={"100%"}
                      justifyContent={"space-between"}
                      _hover={{
                        cursor: "pointer",
                        backgroundColor: "gray.100",
                      }}
                      onMouseOver={() => {
                        setHoveredOverItem(
                          `${capitalProject.managingCode}${capitalProject.id}`,
                        );
                      }}
                      onMouseLeave={() => {
                        setHoveredOverItem(null);
                      }}
                      onClick={() => {
                        navigate({
                          search: `?${searchParams.toString()}`,
                          pathname: `capital-projects/${capitalProject.managingCode}/${capitalProject.id}`,
                        });
                        analytics({
                          category: "Capital Project",
                          action: "Click",
                          name: `capital-projects/${capitalProject.managingCode}/${capitalProject.id}`,
                        });
                      }}
                    >
                      <CardBody
                        marginRight={6}
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Flex direction={"column"} marginRight={2}>
                          <Heading fontSize={"sm"} fontWeight={"bold"}>
                            {capitalProject.description}
                          </Heading>
                          <Text fontSize={"xs"}>
                            {
                              agencies.find(
                                (agency) =>
                                  agency.initials ===
                                  capitalProject.managingAgency,
                              )?.name
                            }
                          </Text>
                        </Flex>
                        <Text fontSize={"xs"} textAlign={"right"}>
                          {formatFiscalYearRange(
                            new Date(capitalProject.minDate),
                            new Date(capitalProject.maxDate),
                          )}
                        </Text>
                      </CardBody>
                      <ChevronRightIcon boxSize={6} marginY={"auto"} />
                    </Card>
                  );
                })
              )}
            </VStack>
          </TabPanel>
          <TabPanel padding={0}>
            <VStack align={"start"}>
              {communityBoardBudgetRequests.length === 0 ? (
                <NoResultsWarning />
              ) : (
                communityBoardBudgetRequests.map((budgetRequest, index) => {
                  if (isNavigating)
                    return (
                      <CommunityBoardBudgetRequestListItemSkeleton
                        key={`cbbr${index}`}
                      />
                    );

                  const PolicyAreaIcon =
                    budgetRequest.cbbrPolicyAreaId in policyAreaIcons
                      ? policyAreaIcons[budgetRequest.cbbrPolicyAreaId]
                      : Icon;
                  return (
                    <Card
                      key={budgetRequest.id}
                      backgroundColor={
                        budgetRequest.id === hoveredOverItem
                          ? "gray.100"
                          : "gray.50"
                      }
                      variant={"calm"}
                      direction={"row"}
                      width={"100%"}
                      justifyContent={"space-between"}
                      _hover={{
                        cursor: "pointer",
                        backgroundColor: "gray.100",
                      }}
                      onMouseOver={() => {
                        setHoveredOverItem(`${budgetRequest.id}`);
                      }}
                      onMouseLeave={() => {
                        setHoveredOverItem(null);
                      }}
                      onClick={() => {
                        navigate({
                          search: `?${searchParams.toString()}`,
                          pathname: `community-board-budget-requests/${budgetRequest.id}`,
                        });
                        analytics({
                          category: "Community Board Budget Requests",
                          action: "Click",
                          pathname: `community-board-budget-requests/${budgetRequest.id}`,
                        });
                      }}
                    >
                      <Flex direction={"row"}>
                        <PolicyAreaIcon boxSize={10} />
                        <CardBody marginLeft={5} marginRight={6}>
                          <Heading fontSize={"sm"} fontWeight={"bold"}>
                            {budgetRequest.title}
                            {budgetRequest.isContinuedSupport ? "*" : ""}
                          </Heading>
                          <Text fontSize={"xs"}>
                            Communty Board{" "}
                            {budgetRequest.communityBoardId.slice(0, 2)}{" "}
                            {budgetRequest.communityBoardId.slice(2, 4)}
                          </Text>
                        </CardBody>
                      </Flex>
                      <ChevronRightIcon boxSize={6} marginY={"auto"} />
                    </Card>
                  );
                })
              )}
            </VStack>
          </TabPanel>
          <TabPanel padding={0}>
            <VStack align={"start"}>
              {facilities.length === 0 ? (
                <NoResultsWarning />
              ) : (
                facilities.map((facility, index) => {
                  if (isNavigating)
                    return (
                      <FacilityListItemSkeleton key={`facility${index}`} />
                    );
                  Icon;
                  return (
                    <Card
                      key={facility.id}
                      backgroundColor={
                        facility.id === hoveredOverItem ? "gray.100" : "gray.50"
                      }
                      variant={"calm"}
                      direction={"row"}
                      width={"100%"}
                      justifyContent={"space-between"}
                      _hover={{
                        cursor: "pointer",
                        backgroundColor: "gray.100",
                      }}
                      onMouseOver={() => {
                        setHoveredOverItem(`${facility.id}`);
                      }}
                      onMouseLeave={() => {
                        setHoveredOverItem(null);
                      }}
                      onClick={() => {
                        navigate({
                          search: `?${searchParams.toString()}`,
                          pathname: `facilities/${facility.id}`,
                        });
                        analytics({
                          category: "Facilities",
                          action: "Click",
                          pathname: `facilities/${facility.id}`,
                        });
                      }}
                    >
                      <Flex direction={"row"}>
                        <Flex
                          marginX={1}
                          marginY={1.5}
                          w={2}
                          h={2}
                          bg={FACILITY_CATEGORY_ID_COLORS.get(
                            facility.categoryId ? facility.categoryId : 1,
                          )}
                          borderRadius={"2px"}
                        />
                        <CardBody marginLeft={5} marginRight={6}>
                          <Heading fontSize={"sm"} fontWeight={"bold"}>
                            {facility.name}
                          </Heading>
                          <Text fontSize={"xs"}>
                            {
                              agencies.find(
                                (agency) =>
                                  agency.initials ===
                                  facility.oversightAgencyInitials,
                              )?.name
                            }
                          </Text>
                        </CardBody>
                      </Flex>
                      {stateOfGoodRepair === "ON" && facility.hasSogrData ? (
                        <Tooltip
                          offset={[-40, 10]}
                          hasArrow
                          placement="top"
                          maxWidth={"15rem"}
                          label="State of Good Repair (SGR) score is available. This facility has been assessed and graded to reflect physical condition."
                        >
                          <Tag
                            backgroundColor={"cherrybl.50"}
                            textColor={"cherrybl.800"}
                            variant={"gradeA"}
                            size={"gradesDescription"}
                          >
                            <ClipboardCheckIcon boxSize={3} marginRight={1} />
                            Graded
                          </Tag>
                        </Tooltip>
                      ) : null}
                    </Card>
                  );
                })
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Flex
        paddingTop={4}
        alignItems="center"
        justifyContent="space-between"
        marginTop="auto"
        marginBottom={{ base: 4, md: 0 }}
        borderTopWidth="1px"
        borderColor="gray.300"
      >
        <Pagination
          total={
            tabIndex === 0
              ? totalProjects
              : tabIndex === 1
                ? totalBudgetRequests
                : totalFacilities
          }
          pageParamKey={
            tabIndex === 0
              ? "cpPage"
              : tabIndex === 1
                ? "cbbrPage"
                : "facilitiesPage"
          }
          label={tabs[tabIndex].label}
        />
        {tabIndex === 0 && (
          <ExportDataModal
            geography={exportDataGeography}
            fileName={exportDataFileName}
          />
        )}
        {tabIndex === 1 && (
          <LinkBtn
            isExternal
            href={`${zoningApiUrl}/api${pathname}/csv?${cbbrDownloadParams}`}
          >
            Export Data
          </LinkBtn>
        )}
      </Flex>
    </ContentPanelAccordion>
  );
}
