import {
  findAgencies,
  findCapitalProjects,
  findCommunityBoardBudgetRequests,
} from "~/gen";
import {
  data,
  Link,
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import {
  AccordionPanel,
  Card,
  CardBody,
  ChevronRightIcon,
  Icon,
} from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@nycplanning/streetscape";
import { Pagination } from "../Pagination";
import {
  EducationIcon,
  HealthIcon,
  HousingIcon,
  InfrastructureIcon,
  ParksIcon,
  PeopleIcon,
  SafetyIcon,
  TransportationIcon,
} from "~/icons";
import { useEffect, useState } from "react";
import { formatFiscalYearRange } from "~/utils/utils";
import { analytics } from "~/utils/analytics";
import { ResultsPanelNoResultsWarning } from "./NoResultsWarning";

export const urlPaths = ["capital-projects", "community-board-budget-requests"];

export const policyAreaIcons = [
  <Icon key={0} boxSize={10} />,
  <InfrastructureIcon key={1} boxSize={10} />,
  <HealthIcon key={2} boxSize={10} />,
  <HousingIcon key={3} boxSize={10} />,
  <PeopleIcon key={4} boxSize={10} />,
  <ParksIcon key={5} boxSize={10} />,
  <SafetyIcon key={6} boxSize={10} />,
  <TransportationIcon key={7} boxSize={10} />,
  <EducationIcon key={8} boxSize={10} />,
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const itemsPerPage = 7;
  const cbbrPageParam = url.searchParams.get("cbbrPage");
  const cbbrPage = cbbrPageParam === null ? 1 : parseInt(cbbrPageParam);
  if (isNaN(cbbrPage)) {
    throw data("Bad Request", { status: 400 });
  }
  const cbbrOffset = (cbbrPage - 1) * itemsPerPage;
  const budgetRequestPromise = findCommunityBoardBudgetRequests(
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
  const capitalProjectPromise = findCapitalProjects(
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
      isMapped: true,
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

  const [budgetRequestResponse, capitalProjectResponse, agenciesResponse] =
    await Promise.all([
      budgetRequestPromise,
      capitalProjectPromise,
      agenciesPromise,
    ]);

  return {
    agenciesResponse,
    budgetRequestResponse,
    capitalProjectResponse,
  };
}

export default function ResultsPanelLayout() {
  const {
    budgetRequestResponse: {
      communityBoardBudgetRequests,
      totalBudgetRequests,
    },
    capitalProjectResponse: { capitalProjects, totalProjects },
    agenciesResponse: { agencies },
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

  return (
    <Accordion width={"100%"} maxHeight={"100%"} defaultIndex={[0]} allowToggle>
      <AccordionItem borderTop={"none"}>
        <AccordionButton aria-label="Toggle results panel" p={0}>
          <Heading
            flex="1"
            textAlign="left"
            fontSize="medium"
            fontWeight="bold"
            lineHeight="32px"
          >
            {tabIndex === 0 ? totalProjects : totalBudgetRequests} Results
          </Heading>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          padding={"0px"}
          overflowY={"hidden"}
          overflow={"scroll"}
        >
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab>Capital Projects</Tab>
              <Tab>Community Board Budget Requests</Tab>
            </TabList>
            <Flex justifyContent={"space-between"} marginTop={"0.5rem"}>
              <Outlet />
            </Flex>
            <TabPanels>
              <TabPanel>
                <VStack align={"start"}>
                  {capitalProjects.length === 0 ? (
                    <ResultsPanelNoResultsWarning />
                  ) : (
                    capitalProjects.map((capitalProject) => {
                      return (
                        <Card
                          key={`${capitalProject.managingCode}${capitalProject.id}`}
                          direction={"row"}
                          padding={"0.75rem"}
                          width={"100%"}
                          backgroundColor={"gray.50"}
                          borderRadius={"0.5rem"}
                          justifyContent={"space-between"}
                        >
                          <Flex direction={"row"} width={"100%"}>
                            <CardBody
                              marginLeft={"1.25rem"}
                              marginRight={"1.5rem"}
                              width={"100%"}
                            >
                              <Flex
                                direction={"row"}
                                justifyContent={"space-between"}
                              >
                                <Heading fontSize={"sm"} fontWeight={"bold"}>
                                  {capitalProject.description}
                                </Heading>
                                <Text fontSize={"xs"}>
                                  {formatFiscalYearRange(
                                    new Date(capitalProject.minDate),
                                    new Date(capitalProject.maxDate),
                                  )}
                                </Text>
                              </Flex>
                              <Text fontSize={"xs"}>
                                {
                                  agencies.find(
                                    (agency) =>
                                      agency.initials ===
                                      capitalProject.managingAgency,
                                  )?.name
                                }
                              </Text>
                            </CardBody>
                          </Flex>
                          <Link
                            to={{
                              search: `?${searchParams.toString()}`,
                              pathname: `capital-projects/${capitalProject.managingCode}/${capitalProject.id}`,
                            }}
                            onClick={() =>
                              analytics({
                                category: "Capital Project",
                                action: "Click",
                                name: `capital-projects/${capitalProject.managingCode}/${capitalProject.id}`,
                              })
                            }
                          >
                            <ChevronRightIcon boxSize={6} marginY={"auto"} />
                          </Link>
                        </Card>
                      );
                    })
                  )}
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack align={"start"}>
                  {communityBoardBudgetRequests.length === 0 ? (
                    <ResultsPanelNoResultsWarning />
                  ) : (
                    communityBoardBudgetRequests.map((budgetRequest) => {
                      return (
                        <Card
                          key={budgetRequest.id}
                          direction={"row"}
                          padding={"0.75rem"}
                          width={"100%"}
                          backgroundColor={"gray.50"}
                          borderRadius={"0.5rem"}
                          justifyContent={"space-between"}
                        >
                          <Flex direction={"row"}>
                            {policyAreaIcons[budgetRequest.cbbrPolicyAreaId]}
                            <CardBody
                              marginLeft={"1.25rem"}
                              marginRight={"1.5rem"}
                            >
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
            justifyContent={"space-between"}
            marginTop={"auto"}
            marginBottom={{ base: "1rem", md: "0rem" }}
          >
            <Pagination
              total={tabIndex === 0 ? totalProjects : totalBudgetRequests}
              pageParamKey={tabIndex === 0 ? "cpPage" : "cbbrPage"}
            />
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
