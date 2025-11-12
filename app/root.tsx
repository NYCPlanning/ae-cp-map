import {
  StreetscapeProvider,
  Box,
  Heading,
  Flex,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
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
  useRouteError,
  useSearchParams,
  LoaderFunctionArgs,
  LinksFunction,
} from "react-router";
import { Atlas, INITIAL_VIEW_STATE } from "./components/atlas.client";
import { ClientOnly } from "remix-utils/client-only";

import {
  findBoroughs,
  findCityCouncilDistricts,
  findCommunityDistrictsByBoroughId,
  findAgencyBudgets,
  findCapitalProjectManagingAgencies,
} from "./gen";
import { FilterMenu } from "./components/FilterMenu";
import { SearchByAttributeMenu } from "./components/SearchByAttributeMenu";
import { useEffect, useState } from "react";
import {
  initializeMatomoTagManager,
  initFullStoryAnalytics,
} from "./utils/analytics";
import { env } from "./utils/env";
import { BoroughId, DistrictType } from "./utils/types";
import { FlyToInterpolator, MapViewState } from "@deck.gl/core";
import { HeaderBar } from "./components/HeaderBar";
import { HowToUseThisTool } from "./components/AdminDropdownContent/HowToUseThisTool";
import {
  MapLayersPanel,
  LayerVisibilityToggles,
} from "./components/AdminMapLayersPanel";
import About from "./routes/about";
import { useUpdateSearchParams } from "./utils/utils";
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

const { zoningApiUrl } = env;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const districtType = url.searchParams.get("districtType") as DistrictType;
  const boroughId = url.searchParams.get("boroughId") as BoroughId;

  const { managingAgencies } = await findCapitalProjectManagingAgencies({
    baseURL: `${zoningApiUrl}/api`,
  });

  const { agencyBudgets } = await findAgencyBudgets({
    baseURL: `${zoningApiUrl}/api`,
  });

  if (districtType === "cd") {
    const { boroughs } = await findBoroughs({
      baseURL: `${zoningApiUrl}/api`,
    });

    if (boroughId === null) {
      return {
        boroughs,
        communityDistricts: null,
        cityCouncilDistricts: null,
        managingAgencies,
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
        managingAgencies,
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
      managingAgencies,
      agencyBudgets,
    };
  }

  return {
    boroughs: null,
    communityDistricts: null,
    cityCouncilDistricts: null,
    managingAgencies,
    agencyBudgets,
  };
};

function Document({
  children,
  title = "Capital Projects",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en" style={{ scrollbarWidth: "none" }}>
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [, updateSearchParams] = useUpdateSearchParams();
  const showCapitalProjects = searchParams.get("capitalProjects") !== "off";
  const showCbbr = searchParams.get("cbbr") !== "off";

  const {
    boroughs,
    communityDistricts,
    cityCouncilDistricts,
    managingAgencies,
    agencyBudgets,
  } = useLoaderData<typeof loader>();

  const clearAllFilters = () => {
    setSearchParams({});
    setViewState({
      ...INITIAL_VIEW_STATE,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const clearCapitalProjectFilters = () => {
    updateSearchParams({
      managingAgency: null,
      agencyBudget: null,
      commitmentsTotalMin: null,
      commitmentsTotalMax: null,
    });
  };

  const location = useLocation();

  return (
    <Document>
      <StreetscapeProvider>
        <ClientOnly>
          {() =>
            location.pathname === "/about" ? (
              <About />
            ) : (
              <>
                <Atlas
                  viewState={viewState}
                  setViewState={(MapViewState) => setViewState(MapViewState)}
                  showCapitalProjects={showCapitalProjects}
                  showCbbr={showCbbr}
                />{" "}
                <Grid
                  templateColumns={{
                    base: "0 [col-start] 1fr repeat(6, 1fr) 1fr [col-end] 0",
                    md: "1.5dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 1.5dvw",
                    lg: "1.18dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 1.18dvw",
                    xl: "0.86dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 0.86dvw",
                    "2xl":
                      "0.8dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 0.82dvw",
                  }}
                  gap={{
                    base: "0 3dvw",
                    md: "0 1.6dvw",
                    lg: "0 1.22dvw",
                    xl: "0 0.94dw",
                    "2xl": "0 0.78dw",
                  }}
                  templateRows={{
                    base: "7dvh 2dvh [row-start] 1fr [row-end] 2dvh 7dvh",
                    md: "7dvh 2dvh [row-start] 1fr [row-end] 2dvh",
                  }}
                  height="100vh"
                  sx={{
                    scrollbarWidth: "none",
                  }}
                >
                  <HeaderBar clearSelections={clearAllFilters} />
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
                    height={"100%"}
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
                      <Accordion
                        allowMultiple
                        defaultIndex={[0]}
                        width={"100%"}
                      >
                        <MapLayersPanel>
                          <LayerVisibilityToggles />
                          <SearchByAttributeMenu
                            agencies={managingAgencies}
                            projectTypes={agencyBudgets}
                            onClear={clearCapitalProjectFilters}
                          />
                          <AccordionItem
                            borderTop={"none"}
                            paddingBottom={"12px"}
                          >
                            <Legend />
                          </AccordionItem>
                        </MapLayersPanel>
                        <FilterMenu
                          boroughs={boroughs}
                          communityDistricts={communityDistricts}
                          cityCouncilDistricts={cityCouncilDistricts}
                        />
                        <HowToUseThisTool />
                      </Accordion>
                    </Flex>
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
                      <Outlet />
                    </Flex>
                  </GridItem>
                </Grid>
              </>
            )
          }
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
