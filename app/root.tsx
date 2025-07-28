import {
  StreetscapeProvider,
  Box,
  Heading,
  VStack,
  Flex,
  Button,
  Grid,
  GridItem,
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
  LoaderFunctionArgs,
  LinksFunction,
} from "react-router";
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
import {
  BoroughDropdown,
  DistrictTypeDropdown,
  CommunityDistrictDropdown,
  CityCouncilDistrictDropdown,
  AgencyDropdown,
  ProjectTypeDropdown,
} from "./components/AdminDropdown";
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
import { showRedesign, zoningApiUrl } from "./utils/envFlags";
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
import { HeaderBar } from "./components/HeaderBar";
import { HowToUseThisToolCopy } from "./components/AdminDropdownContent/HowToUseThisToolCopy";
import { Legend } from "./components/AdminDropdownContent/Legend";

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
    baseURL: `${zoningApiUrl}/api`,
  });

  const { agencyBudgets } = await findAgencyBudgets({
    baseURL: `${zoningApiUrl}/api`,
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
      baseURL: `${zoningApiUrl}/api`,
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
          baseURL: `${zoningApiUrl}/api`,
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
      baseURL: `${zoningApiUrl}/api`,
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
              {showRedesign ? (
                <Grid
                  templateColumns={{
                    base: "0 [col-start] 1fr repeat(6, 1fr) 1fr [col-end] 0",
                    md: "3.1dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 3.1dvw",
                    lg: "2.4dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 2.4dvw",
                    xl: "1.8dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 1.8dvw",
                    "2xl":
                      "1.6dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 1.6dvh",
                  }}
                  gap={{
                    base: "0 3dvw",
                    lg: "24px 12px",
                  }}
                  templateRows={{
                    base: "7dvh 2dvh [row-start] 1fr [row-end] 2dvh 7dvh",
                    md: "72px [row-start] 1fr [row-end] 0",
                    lg: "72px [row-start] 1fr [row-end] 0",
                  }}
                  className="thisistheparentGrid"
                  height="100vh"
                >
                  <HeaderBar />
                  <Overlay>
                    <GridItem
                      className={"one"}
                      border={"1px solid red"}
                      gridColumn={{
                        base: "col-start / span 7",
                        md: "col-start / span 4",
                        lg: "col-start / span 3",
                      }}
                      gridRow={{
                        base: "row-start / row-end",
                        md: "row-start / row-end",
                        lg: "row-start / span 1",
                      }}
                      height={{
                        base: "fit-content",
                        md: "fit-content",
                      }}
                      overflowY={{ lg: "scroll" }}
                      // maxH={{ base: "82dvh" }}
                      zIndex={"1"}
                    >
                      <Flex
                        direction={"column"}
                        width={{ base: "100%", lg: "auto" }}
                        alignItems={"center"}
                        flexShrink={{ lg: 0 }}
                        maxHeight={{
                          base: "82vh",
                          lg: "full",
                        }}
                        backgroundColor={"white"}
                        borderRadius={10}
                        overflowY={"scroll"}
                        className={"flexOne"}
                      >
                        <Legend />
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
                                communityDistricts={
                                  loaderData.communityDistricts
                                }
                                setAdminParams={updateSearchParams}
                              />
                            ) : (
                              <CityCouncilDistrictDropdown
                                selectValue={districtId}
                                cityCouncilDistricts={
                                  loaderData.cityCouncilDistricts
                                }
                                setAdminParams={updateSearchParams}
                              />
                            )}
                          </VStack>
                        </FilterMenu>
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

                        <HowToUseThisToolCopy />
                      </Flex>
                    </GridItem>
                    <GridItem
                      className={"two"}
                      border={{ base: "1px solid blue", lg: "1px solid red" }}
                      gridColumn={{
                        base: "1 / -1",
                        md: "9 / span 5",
                        lg: "11 / col-end",
                      }}
                      gridRow={{
                        base: "3 / -1",
                        md: "row-start / span 3",
                        lg: "row-start / row-end",
                      }}
                      overflowY={{ lg: "scroll" }}
                      alignSelf={{ base: "end", md: "start" }}
                      zIndex={"2"}
                    >
                      <Flex
                        direction={{ base: "column-reverse", lg: "column" }}
                        justify={{ base: "flex-start", lg: "flex-start" }}
                        align={"flex-end"}
                        width={"full"}
                        gap={3}
                        pointerEvents={"none"}
                        sx={{
                          "> *": {
                            pointerEvents: "auto",
                          },
                        }}
                        overflowY={"hidden"}
                        className={"flexTwo"}
                      >
                        <Outlet />
                      </Flex>
                    </GridItem>
                  </Overlay>
                </Grid>
              ) : (
                // show below if flag is off
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
                            cityCouncilDistricts={
                              loaderData.cityCouncilDistricts
                            }
                            setAdminParams={updateSearchParams}
                          />
                        )}
                      </VStack>
                    </FilterMenu>
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
              )}
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
