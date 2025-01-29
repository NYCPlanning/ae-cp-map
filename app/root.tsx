import {
  StreetscapeProvider,
  Box,
  Heading,
  VStack,
  Flex,
  Button,
} from "@nycplanning/streetscape";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useNavigate,
  useRouteError,
  useSearchParams,
} from "@remix-run/react";
import { Atlas, INITIAL_VIEW_STATE } from "./components/atlas.client";
import { ClientOnly } from "remix-utils/client-only";
import { Overlay } from "./components/Overlay";
import {
  FindBoroughsQueryResponse,
  FindCityCouncilDistrictsQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
  findBoroughs,
  findCityCouncilDistricts,
  findCommunityDistrictsByBoroughId,
  findAgencies,
  FindAgenciesQueryResponse,
  findAgencyBudgets,
  FindAgencyBudgetsQueryResponse,
} from "./gen";
import { FilterMenu } from "./components/FilterMenu";
import { SearchByAttributeMenu } from "./components/SearchByAttributeMenu";
import { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import {
  BoroughDropdown,
  DistrictTypeDropdown,
  CommunityDistrictDropdown,
  CityCouncilDistrictDropdown,
  AgencyDropdown,
  ProjectTypeDropdown,
} from "./components/AdminDropdown";
import { WelcomePanel } from "./components/WelcomePanel";
import { useEffect, useState } from "react";
import {
  analytics,
  initializeMatomoTagManager,
  initFullStoryAnalytics,
} from "./utils/analytics";
import {
  setNewSearchParams,
  handleCommitmentTotalsInputs,
  checkCommitmentTotalInputsAreValid,
  getMultiplier,
} from "./utils/utils";
import {
  BoroughId,
  DistrictId,
  DistrictType,
  ManagingAgencyAcronym,
  SearchParamChanges,
  AttributeParams,
  AgencyBudgetType,
  ProjectAmountMenuParams,
  CommitmentsTotalMin,
  CommitmentsTotalMax,
  CommitmentsTotalMinInputValue,
  CommitmentsTotalMaxInputValue,
  CommitmentsTotalMinSelectValue,
  CommitmentsTotalMaxSelectValue,
} from "./utils/types";
import { ClearFilterBtn } from "./components/ClearFilter";
import { FlyToInterpolator, MapViewState } from "@deck.gl/core";
import { ProjectAmountMenu } from "./components/ProjectAmountMenu";
import { ProjectAmountMenuInput } from "./components/ProjectAmountMenu/ProjectAmountMenuInput";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.svg",
      type: "image/x-icon",
    },
  ];
};

const adminParamKeys = ["districtType", "boroughId", "districtId"];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const districtType = url.searchParams.get("districtType") as DistrictType;
  const boroughId = url.searchParams.get("boroughId") as BoroughId;

  const { agencies } = await findAgencies({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });

  const { agencyBudgets } = await findAgencyBudgets({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });

  if (districtType === null) {
    return {
      boroughs: null,
      communityDistricts: null,
      cityCouncilDistricts: null,
      agencies,
      agencyBudgets,
    };
  }

  if (districtType === "cd") {
    const { boroughs } = await findBoroughs({
      baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
    });

    if (boroughId === null) {
      return {
        boroughs,
        communityDistricts: null,
        cityCouncilDistricts: null,
        agencies,
        agencyBudgets,
      };
    } else {
      const { communityDistricts } = await findCommunityDistrictsByBoroughId(
        boroughId,
        {
          baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
        },
      );

      return {
        boroughs,
        communityDistricts,
        cityCouncilDistricts: null,
        agencies,
        agencyBudgets,
      };
    }
  }

  if (districtType === "ccd") {
    const { cityCouncilDistricts } = await findCityCouncilDistricts({
      baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
    });
    return {
      boroughs: null,
      communityDistricts: null,
      cityCouncilDistricts,
      agencies,
      agencyBudgets,
    };
  }
};

function Document({
  children,
  title = "Capital Projects",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        {/* Silence /favicon.ico error by pointing to null image. Remove link to null image after creating valid favicon. */}
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="data:image/x-icon;base64,"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    initializeMatomoTagManager("SmoWWpiD");
    initFullStoryAnalytics();
  }, []);
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;
  const managingAgency = searchParams.get(
    "managingAgency",
  ) as ManagingAgencyAcronym;
  const agencyBudget = searchParams.get("agencyBudget") as AgencyBudgetType;
  const commitmentsTotalMin = searchParams.get(
    "commitmentsTotalMin",
  ) as CommitmentsTotalMin;
  const commitmentsTotalMax = searchParams.get(
    "commitmentsTotalMax",
  ) as CommitmentsTotalMax;
  const {
    commitmentsTotalMinInputValue,
    commitmentsTotalMinSelectValue,
    commitmentsTotalMaxInputValue,
    commitmentsTotalMaxSelectValue,
  } = handleCommitmentTotalsInputs(commitmentsTotalMin, commitmentsTotalMax);

  const commitmentTotalInputsAreValid = checkCommitmentTotalInputsAreValid({
    commitmentsTotalMinInputValue,
    commitmentsTotalMinSelectValue,
    commitmentsTotalMaxInputValue,
    commitmentsTotalMaxSelectValue,
  });

  const [attributeParams, setAttributeParams] = useState<AttributeParams>({
    managingAgency,
    agencyBudget,
    commitmentsTotalMin,
    commitmentsTotalMax,
  });

  const [projectAmountMenuParams, setProjectAmountMenuParams] =
    useState<ProjectAmountMenuParams>({
      commitmentsTotalMinInputValue,
      commitmentsTotalMinSelectValue,
      commitmentsTotalMaxInputValue,
      commitmentsTotalMaxSelectValue,
      commitmentTotalInputsAreValid,
    });

  const loaderData = useLoaderData<
    (FindBoroughsQueryResponse | { boroughs: null }) &
      (
        | FindCommunityDistrictsByBoroughIdQueryResponse
        | { communityDistricts: null }
      ) &
      (FindCityCouncilDistrictsQueryResponse | { cityCouncilDistricts: null }) &
      (FindAgenciesQueryResponse | { agencies: null }) &
      (FindAgencyBudgetsQueryResponse | { agencyBudgets: null })
  >();

  const updateSearchParams = (nextSearchParams: SearchParamChanges) => {
    const mergedParams = setNewSearchParams(searchParams, nextSearchParams);
    setSearchParams(mergedParams);
  };

  const search = () => {
    let newPath = "";
    if (districtType === "cd" && boroughId !== null && districtId !== null) {
      newPath = `boroughs/${boroughId}/community-districts/${districtId}/capital-projects`;
    } else if (districtType === "ccd" && districtId !== null) {
      newPath = `city-council-districts/${districtId}/capital-projects`;
    } else if (
      (districtType === null &&
        (attributeParams.managingAgency !== null ||
          attributeParams.agencyBudget !== null)) ||
      projectAmountMenuParams.commitmentsTotalMinInputValue !== null ||
      projectAmountMenuParams.commitmentsTotalMaxInputValue !== null
    ) {
      newPath = "capital-projects";
    }

    if (
      pathname !== `/${newPath}` ||
      attributeParams.managingAgency !== managingAgency ||
      attributeParams.agencyBudget !== agencyBudget ||
      projectAmountMenuParams.commitmentsTotalMinInputValue !==
        commitmentsTotalMinInputValue ||
      projectAmountMenuParams.commitmentsTotalMaxInputValue !==
        commitmentsTotalMaxInputValue ||
      projectAmountMenuParams.commitmentsTotalMinSelectValue !==
        commitmentsTotalMinSelectValue ||
      projectAmountMenuParams.commitmentsTotalMaxSelectValue !==
        commitmentsTotalMaxSelectValue
    ) {
      const nextAdminParams = new URLSearchParams();
      searchParams.forEach((value, key) => {
        if (adminParamKeys.includes(key)) {
          nextAdminParams.set(key, value);
        }
      });
      if (attributeParams.managingAgency !== null) {
        nextAdminParams.set("managingAgency", attributeParams.managingAgency);
      }
      if (attributeParams.agencyBudget !== null) {
        nextAdminParams.set("agencyBudget", attributeParams.agencyBudget);
      }
      if (
        projectAmountMenuParams.commitmentsTotalMinInputValue !== "" &&
        parseFloat(projectAmountMenuParams.commitmentsTotalMinInputValue)
      ) {
        nextAdminParams.set(
          "commitmentsTotalMin",
          (
            parseFloat(projectAmountMenuParams.commitmentsTotalMinInputValue) *
            getMultiplier(
              projectAmountMenuParams.commitmentsTotalMinSelectValue,
            )
          ).toString(),
        );
      }
      if (
        projectAmountMenuParams.commitmentsTotalMaxInputValue !== "" &&
        parseFloat(projectAmountMenuParams.commitmentsTotalMaxInputValue)
      ) {
        nextAdminParams.set(
          "commitmentsTotalMax",
          (
            parseFloat(projectAmountMenuParams.commitmentsTotalMaxInputValue) *
            getMultiplier(
              projectAmountMenuParams.commitmentsTotalMaxSelectValue,
            )
          ).toString(),
        );
      }

      analytics({
        category: "Search Button",
        action: "Click",
        name: `${newPath}?${nextAdminParams.toString()}`,
      });

      navigate({
        pathname: newPath,
        search: `?${nextAdminParams.toString()}`,
      });
    }
  };

  const clearSelections = () => {
    setAttributeParams({
      managingAgency: null,
      agencyBudget: null,
      commitmentsTotalMin: null,
      commitmentsTotalMax: null,
    });

    setProjectAmountMenuParams({
      commitmentsTotalMinInputValue: "",
      commitmentsTotalMaxInputValue: "",
      commitmentsTotalMinSelectValue: "K",
      commitmentsTotalMaxSelectValue: "K",
      commitmentTotalInputsAreValid: true,
    });

    setViewState({
      ...INITIAL_VIEW_STATE,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  return (
    <Document>
      <StreetscapeProvider>
        <ClientOnly>
          {() => (
            <>
              <Atlas
                viewState={viewState}
                setViewState={(MapViewState) => setViewState(MapViewState)}
              />{" "}
              <Overlay>
                <Flex
                  direction={"column"}
                  width={{ base: "100%", lg: "auto" }}
                  alignItems={"center"}
                  flexShrink={{ lg: 0 }}
                  maxHeight={{ lg: "100%" }}
                  overflowX={{ lg: "hidden" }}
                  overflowY={{ lg: "auto" }}
                  backgroundColor={"white"}
                  borderRadius={10}
                >
                  <FilterMenu defaultIndex={0}>
                    <VStack>
                      <DistrictTypeDropdown
                        selectValue={districtType}
                        setAdminParams={updateSearchParams}
                      />
                      <BoroughDropdown
                        selectValue={boroughId}
                        boroughs={loaderData.boroughs}
                        setAdminParams={updateSearchParams}
                      />

                      {districtType !== "ccd" ? (
                        <CommunityDistrictDropdown
                          boroughId={boroughId}
                          selectValue={districtId}
                          communityDistricts={loaderData.communityDistricts}
                          setAdminParams={updateSearchParams}
                        />
                      ) : (
                        <CityCouncilDistrictDropdown
                          selectValue={districtId}
                          cityCouncilDistricts={loaderData.cityCouncilDistricts}
                          setAdminParams={updateSearchParams}
                        />
                      )}
                    </VStack>
                  </FilterMenu>
                  {import.meta.env.VITE_FEATURE_FLAG_ATTRIBUTE_FILTERS ===
                  "ON" ? (
                    <SearchByAttributeMenu defaultIndex={0}>
                      <VStack>
                        <AgencyDropdown
                          selectValue={attributeParams.managingAgency}
                          agencies={loaderData.agencies}
                          onSelectValueChange={(value) => {
                            setAttributeParams({
                              ...attributeParams,
                              managingAgency: value,
                            });
                          }}
                        />
                        <ProjectTypeDropdown
                          selectValue={attributeParams.agencyBudget}
                          projectTypes={loaderData.agencyBudgets}
                          onSelectValueChange={(value) => {
                            setAttributeParams({
                              ...attributeParams,
                              agencyBudget: value,
                            });
                          }}
                        />

                        <ProjectAmountMenu
                          showClearButton={
                            projectAmountMenuParams.commitmentsTotalMinInputValue !==
                              "" ||
                            projectAmountMenuParams.commitmentsTotalMaxInputValue !==
                              "" ||
                            projectAmountMenuParams.commitmentsTotalMinSelectValue !==
                              "K" ||
                            projectAmountMenuParams.commitmentsTotalMaxSelectValue !==
                              "K"
                          }
                          onProjectAmountMenuClear={() => {
                            setProjectAmountMenuParams({
                              commitmentsTotalMinInputValue: "",
                              commitmentsTotalMaxInputValue: "",
                              commitmentsTotalMinSelectValue: "K",
                              commitmentsTotalMaxSelectValue: "K",
                              commitmentTotalInputsAreValid: true,
                            });
                          }}
                          commitmentTotalInputsAreValid={
                            projectAmountMenuParams.commitmentTotalInputsAreValid
                          }
                        >
                          <ProjectAmountMenuInput
                            label={"Minimum"}
                            commitmentTotalInputsAreValid={
                              projectAmountMenuParams.commitmentTotalInputsAreValid
                            }
                            inputValue={
                              projectAmountMenuParams.commitmentsTotalMinInputValue
                            }
                            selectValue={
                              projectAmountMenuParams.commitmentsTotalMinSelectValue
                            }
                            onInputValueChange={(value) => {
                              const commitmentTotalInputsAreValid =
                                checkCommitmentTotalInputsAreValid({
                                  commitmentsTotalMinInputValue:
                                    value as CommitmentsTotalMinInputValue,
                                  commitmentsTotalMaxInputValue:
                                    projectAmountMenuParams.commitmentsTotalMaxInputValue as CommitmentsTotalMaxInputValue,
                                  commitmentsTotalMinSelectValue:
                                    projectAmountMenuParams.commitmentsTotalMinSelectValue as CommitmentsTotalMinSelectValue,
                                  commitmentsTotalMaxSelectValue:
                                    projectAmountMenuParams.commitmentsTotalMaxSelectValue as CommitmentsTotalMaxSelectValue,
                                });
                              setProjectAmountMenuParams({
                                ...projectAmountMenuParams,
                                commitmentsTotalMinInputValue: value
                                  ? value
                                  : "",
                                commitmentTotalInputsAreValid,
                              });
                            }}
                            onSelectValueChange={(value) => {
                              const commitmentTotalInputsAreValid =
                                checkCommitmentTotalInputsAreValid({
                                  commitmentsTotalMinInputValue:
                                    projectAmountMenuParams.commitmentsTotalMinInputValue as CommitmentsTotalMinInputValue,
                                  commitmentsTotalMaxInputValue:
                                    projectAmountMenuParams.commitmentsTotalMaxInputValue as CommitmentsTotalMaxInputValue,
                                  commitmentsTotalMinSelectValue:
                                    value as CommitmentsTotalMinSelectValue,
                                  commitmentsTotalMaxSelectValue:
                                    projectAmountMenuParams.commitmentsTotalMaxSelectValue as CommitmentsTotalMaxSelectValue,
                                });
                              setProjectAmountMenuParams({
                                ...projectAmountMenuParams,
                                commitmentsTotalMinSelectValue: value,
                                commitmentTotalInputsAreValid,
                              });
                            }}
                          />

                          <Flex
                            grow={1}
                            justifyContent={"center"}
                            alignItems={"end"}
                            mb={"1rem"}
                          >
                            <hr
                              style={{
                                width: "75%",
                                color: "var(--dcp-colors-gray-500)",
                              }}
                            />
                          </Flex>

                          <ProjectAmountMenuInput
                            label={"Maximum"}
                            commitmentTotalInputsAreValid={
                              projectAmountMenuParams.commitmentTotalInputsAreValid
                            }
                            inputValue={
                              projectAmountMenuParams.commitmentsTotalMaxInputValue
                            }
                            selectValue={
                              projectAmountMenuParams.commitmentsTotalMaxSelectValue
                            }
                            onInputValueChange={(value) => {
                              const commitmentTotalInputsAreValid =
                                checkCommitmentTotalInputsAreValid({
                                  commitmentsTotalMinInputValue:
                                    projectAmountMenuParams.commitmentsTotalMinInputValue as CommitmentsTotalMinInputValue,
                                  commitmentsTotalMaxInputValue:
                                    value as CommitmentsTotalMaxInputValue,
                                  commitmentsTotalMinSelectValue:
                                    projectAmountMenuParams.commitmentsTotalMinSelectValue as CommitmentsTotalMinSelectValue,
                                  commitmentsTotalMaxSelectValue:
                                    projectAmountMenuParams.commitmentsTotalMaxSelectValue as CommitmentsTotalMaxSelectValue,
                                });
                              setProjectAmountMenuParams({
                                ...projectAmountMenuParams,
                                commitmentsTotalMaxInputValue: value
                                  ? value
                                  : "",
                                commitmentTotalInputsAreValid,
                              });
                            }}
                            onSelectValueChange={(value) => {
                              const commitmentTotalInputsAreValid =
                                checkCommitmentTotalInputsAreValid({
                                  commitmentsTotalMinInputValue:
                                    projectAmountMenuParams.commitmentsTotalMinInputValue as CommitmentsTotalMinInputValue,
                                  commitmentsTotalMaxInputValue:
                                    projectAmountMenuParams.commitmentsTotalMaxInputValue as CommitmentsTotalMaxInputValue,
                                  commitmentsTotalMinSelectValue:
                                    projectAmountMenuParams.commitmentsTotalMinSelectValue as CommitmentsTotalMinSelectValue,
                                  commitmentsTotalMaxSelectValue:
                                    value as CommitmentsTotalMaxSelectValue,
                                });
                              setProjectAmountMenuParams({
                                ...projectAmountMenuParams,
                                commitmentsTotalMaxSelectValue: value,
                                commitmentTotalInputsAreValid,
                              });
                            }}
                          />
                        </ProjectAmountMenu>
                      </VStack>
                    </SearchByAttributeMenu>
                  ) : null}
                  <Flex width="full" px={4}>
                    <Button
                      width="full"
                      onClick={() => search()}
                      mt={0}
                      isDisabled={
                        (!attributeParams.managingAgency &&
                          !attributeParams.agencyBudget &&
                          projectAmountMenuParams.commitmentsTotalMinInputValue ===
                            "" &&
                          projectAmountMenuParams.commitmentsTotalMaxInputValue ===
                            "" &&
                          !districtId) ||
                        (districtType && !districtId) ||
                        !projectAmountMenuParams.commitmentTotalInputsAreValid
                          ? true
                          : false
                      }
                    >
                      Search
                    </Button>
                  </Flex>
                  <ClearFilterBtn onClear={clearSelections} />

                  <WelcomePanel />
                </Flex>

                <Flex
                  direction={{ base: "column-reverse", lg: "column" }}
                  justify={{ base: "flex-start", lg: "space-between" }}
                  align={"flex-end"}
                  height={"full"}
                  width={"full"}
                  gap={3}
                  pointerEvents={"none"}
                  sx={{
                    "> *": {
                      pointerEvents: "auto",
                    },
                  }}
                >
                  <Outlet />
                  <Box>
                    <img
                      style={{ height: "1.5rem" }}
                      alt="NYC Planning"
                      src="https://raw.githubusercontent.com/NYCPlanning/dcp-logo/master/dcp_logo_772.png"
                    />
                  </Box>
                </Flex>
              </Overlay>
            </>
          )}
        </ClientOnly>
      </StreetscapeProvider>
    </Document>
  );
}

// How StreetscapeProvider should be used on ErrorBoundary
export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <StreetscapeProvider>
          <Box>
            <Heading as="h1" bg="purple.600">
              [CatchBoundary]: {error.status} {error.statusText}
            </Heading>
          </Box>
        </StreetscapeProvider>
      </Document>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "unknown error";
  return (
    <Document title="Error!">
      <StreetscapeProvider>
        <Box>
          <Heading as="h1" bg="blue.500">
            [ErrorBoundary]: There was an error: {errorMessage}
          </Heading>
        </Box>
      </StreetscapeProvider>
    </Document>
  );
}
