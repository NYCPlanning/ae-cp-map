import { findCommunityBoardBudgetRequests } from "~/gen";
import {
  data,
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
  const offset = (cbbrPage - 1) * itemsPerPage;
  const budgetRequestPromise = findCommunityBoardBudgetRequests(
    {
      limit: itemsPerPage,
      offset,
    },
    {
      baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
    },
  );

  const [budgetRequestResponse] = await Promise.all([budgetRequestPromise]);

  return budgetRequestResponse;
}

export default function CommunityBoardBudgetRequests() {
  const { communityBoardBudgetRequests, totalBudgetRequests } =
    useLoaderData<typeof loader>();

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
            {totalBudgetRequests} Results
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
              <TabPanel>Capital Projects</TabPanel>
              <TabPanel>
                <VStack align={"start"}>
                  {communityBoardBudgetRequests.map((budgetRequest) => {
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
                  })}
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
            <Pagination total={totalBudgetRequests} pageParamKey="cbbrPage" />
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
