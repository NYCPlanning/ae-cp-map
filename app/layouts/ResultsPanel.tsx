import {
  findAgencies,
  findBoroughs,
  findCapitalProjects,
  findCommunityBoardBudgetRequests,
} from "~/gen";
import {
  data,
  LoaderFunctionArgs,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import {
  Card,
  CardBody,
  ChevronRightIcon,
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
  TransportationIcon,
  VStack,
} from "@nycplanning/streetscape";
import { Pagination } from "../components/Pagination";
import { useState, useEffect } from "react";
import { analytics } from "~/utils/analytics";
import { formatFiscalYearRange } from "~/utils/utils";
import { ContentPanelAccordion } from "../components/ContentPanelAccordion";
export const urlPaths = ["capital-projects", "community-board-budget-requests"];
import { ExportDataModal } from "../components/ExportDataModal";
import { NoResultsWarning } from "~/components/NoResultsWarning";

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

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const itemsPerPage = 7;
  const cbbrPageParam = url.searchParams.get("cbbrPage");
  const cbbrPage = cbbrPageParam === null ? 1 : parseInt(cbbrPageParam);
  if (isNaN(cbbrPage)) {
    throw data("Bad Request", { status: 400 });
  }
  const cbbrOffset = (cbbrPage - 1) * itemsPerPage;
  const budgetRequestsPromise = findCommunityBoardBudgetRequests(
    {
      cbbrType: "C",
      limit: itemsPerPage,
      offset: cbbrOffset,
    },
    {
      baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
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
  const districtType = url.searchParams.get("districtType");
  const boroughId = url.searchParams.get("boroughId");
  const districtId = url.searchParams.get("districtId");
  const capitalProjectsPromise = findCapitalProjects(
    {
      ...(boroughId !== null && districtId !== null && districtType === "cd"
        ? { communityDistrictId: `${boroughId}${districtId}` }
        : {}),
      ...(districtId !== null && districtType === "ccd"
        ? { cityCouncilDistrictId: districtId }
        : {}),
      ...(managingAgency === null ? {} : { managingAgency }),
      ...(agencyBudget === null ? {} : { agencyBudget }),
      ...(commitmentsTotalMin === null ? {} : { commitmentsTotalMin }),
      ...(commitmentsTotalMax === null ? {} : { commitmentsTotalMax }),
      ...(districtId !== null ? {} : { isMapped: true }),
      limit: itemsPerPage,
      offset: cpOffset,
    },
    {
      baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
    },
  );

  const agenciesPromise = findAgencies({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });

  const boroughsPromise = findBoroughs({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });

  const [
    budgetRequestsResponse,
    capitalProjectsResponse,
    agenciesResponse,
    boroughsResponse,
  ] = await Promise.all([
    budgetRequestsPromise,
    capitalProjectsPromise,
    agenciesPromise,
    boroughsPromise,
  ]);

  return {
    agenciesResponse,
    boroughsResponse,
    budgetRequestsResponse,
    capitalProjectsResponse,
  };
}

export default function ResultsPanel() {
  const {
    budgetRequestsResponse: {
      communityBoardBudgetRequests,
      totalBudgetRequests,
    },
    capitalProjectsResponse: { capitalProjects, totalProjects },
    agenciesResponse: { agencies },
    boroughsResponse: { boroughs },
  } = useLoaderData<typeof loader>();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tabIndex, setTabIndex] = useState(() =>
    urlPaths.findIndex((path) => `/${path}` === pathname),
  );

  useEffect(() => {
    setTabIndex(urlPaths.findIndex((path) => `/${path}` === pathname));
  }, [pathname]);

  const handleTabsChange = (index: number) => {
    navigate({
      pathname: urlPaths[index],
      search: `?${searchParams.toString()}`,
    });
  };

  const districtTypeParam = searchParams.get("districtType");
  const boroughIdParam = searchParams.get("boroughId");
  const districtIdParam = searchParams.get("districtId");
  let exportDataGeography = "All";
  let exportDataFileName = "projects_in_geographies.zip";
  if (
    districtTypeParam === "cd" &&
    boroughIdParam !== null &&
    districtIdParam !== null
  ) {
    const borough = boroughs.find((borough) => borough.id === boroughIdParam);
    exportDataGeography =
      borough !== undefined
        ? `Community District ${borough.abbr}${districtIdParam}`
        : "";
    exportDataFileName =
      borough !== undefined
        ? `community_district_${borough.title.toLowerCase()}_cd${districtIdParam}.csv`
        : "";
  }

  if (districtTypeParam === "ccd" && districtIdParam !== null) {
    exportDataGeography = `City Council District ${districtIdParam}`;
    exportDataFileName = `city_council_district_${districtIdParam}.csv`;
  }

  return (
    <ContentPanelAccordion
      accordionHeading={`${totalProjects + totalBudgetRequests} Results`}
    >
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList
          overflow={"auto"}
          sx={{ scrollbarWidth: "none" }}
          borderBottomWidth="1px"
          borderColor="gray.200"
          marginY={2}
        >
          <Tab fontFamily={"body"} whiteSpace={"nowrap"}>
            Capital Projects
          </Tab>
          <Tab fontFamily={"body"} whiteSpace={"nowrap"}>
            Community Board Budget Requests
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <VStack align={"start"}>
              {capitalProjects.length === 0 ? (
                <NoResultsWarning />
              ) : (
                capitalProjects.map((capitalProject) => {
                  return (
                    <Card
                      key={`${capitalProject.managingCode}${capitalProject.id}`}
                      variant={"calm"}
                      direction={"row"}
                      width={"100%"}
                      justifyContent={"space-between"}
                      _hover={{ cursor: "pointer" }}
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
                        marginRight={"1.5rem"}
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Flex direction={"column"} marginRight={"0.5rem"}>
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
                communityBoardBudgetRequests.map((budgetRequest) => {
                  const PolicyAreaIcon =
                    budgetRequest.cbbrPolicyAreaId in policyAreaIcons
                      ? policyAreaIcons[budgetRequest.cbbrPolicyAreaId]
                      : Icon;
                  return (
                    <Card
                      key={budgetRequest.id}
                      variant={"calm"}
                      direction={"row"}
                      width={"100%"}
                      justifyContent={"space-between"}
                      _hover={{ cursor: "pointer" }}
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
                        <CardBody marginLeft={"1.25rem"} marginRight={"1.5rem"}>
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
        </TabPanels>
      </Tabs>
      <Flex
        paddingTop={4}
        alignItems="center"
        justifyContent="space-between"
        marginTop="auto"
        marginBottom={{ base: "1rem", md: "0rem" }}
        borderTopWidth="1px"
        borderColor="gray.300"
      >
        <Pagination
          total={tabIndex === 0 ? totalProjects : totalBudgetRequests}
          pageParamKey={tabIndex === 0 ? "cpPage" : "cbbrPage"}
        />
        {tabIndex === 0 && (
          <ExportDataModal
            geography={exportDataGeography}
            fileName={exportDataFileName}
          />
        )}
      </Flex>
    </ContentPanelAccordion>
  );
}
