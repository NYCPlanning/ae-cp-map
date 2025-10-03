import {
  StreetscapeProvider,
  Box,
  Heading,
  Flex,
  Grid,
  GridItem,
  Accordion,
} from "@nycplanning/streetscape";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  useSearchParams,
  LoaderFunctionArgs,
  LinksFunction,
} from "react-router";
import { Atlas, INITIAL_VIEW_STATE } from "./components/atlas.client";
import { ClientOnly } from "remix-utils/client-only";

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
import { useEffect, useState } from "react";
import {
  initializeMatomoTagManager,
  initFullStoryAnalytics,
} from "./utils/analytics";
import { zoningApiUrl } from "./utils/envFlags";
import { BoroughId, DistrictType } from "./utils/types";
import { FlyToInterpolator, MapViewState } from "@deck.gl/core";
import { HeaderBar } from "./components/HeaderBar";
import { HowToUseThisToolCopy } from "./components/AdminDropdownContent/HowToUseThisToolCopy";
import {
  MapLayersPanel,
  LayerVisibilityToggles,
} from "./components/AdminMapLayersPanel";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.svg",
      type: "image/x-icon",
    },
  ];
};

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
  const [, setSearchParams] = useSearchParams();
  const [showCapitalProjects, setShowCapitalProjects] = useState(true);

  const {
    boroughs,
    communityDistricts,
    cityCouncilDistricts,
    agencies,
    agencyBudgets,
  } = useLoaderData<
    (FindBoroughsQueryResponse | { boroughs: null }) &
      (
        | FindCommunityDistrictsByBoroughIdQueryResponse
        | { communityDistricts: null }
      ) &
      (FindCityCouncilDistrictsQueryResponse | { cityCouncilDistricts: null }) &
      (FindAgenciesQueryResponse | { agencies: null }) &
      (FindAgencyBudgetsQueryResponse | { agencyBudgets: null })
  >();

  const clearSelections = () => {
    setSearchParams({});
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
                showCapitalProjects={showCapitalProjects}
              />{" "}
              <Grid
                templateColumns={{
                  base: "0 [col-start] 1fr repeat(6, 1fr) 1fr [col-end] 0",
                  md: "3.1dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 3.1dvw",
                  lg: "2.4dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 2.4dvw",
                  xl: "1.8dvw [col-start] 1fr repeat(10, 1fr) 1fr [col-end] 1.8dvw",
                }}
                gap={{
                  base: "0 3dvw",
                  md: "12px 1.6dvw",
                  lg: "24px 12px",
                }}
                templateRows={{
                  base: "7dvh 2dvh [row-start] 1fr [row-end] 2dvh 7dvh",
                  md: "72px [row-start] 1fr [row-end] 0",
                  lg: "72px [row-start] 1fr [row-end] 0",
                }}
                height="100vh"
              >
                <HeaderBar />
                <GridItem
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
                    md: "100%",
                  }}
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
                  >
                    <Accordion
                      allowMultiple
                      defaultIndex={[0, 1]}
                      width={"100%"}
                    >
                      <MapLayersPanel>
                        <LayerVisibilityToggles
                          capitalProjectsOn={showCapitalProjects}
                          onCapitalProjectsToggle={setShowCapitalProjects}
                        />
                      </MapLayersPanel>
                      <FilterMenu
                        boroughs={boroughs}
                        communityDistricts={communityDistricts}
                        cityCouncilDistricts={cityCouncilDistricts}
                      />
                      <SearchByAttributeMenu
                        agencies={agencies}
                        projectTypes={agencyBudgets}
                        onClear={clearSelections}
                      />
                      <HowToUseThisToolCopy />
                    </Accordion>
                  </Flex>
                </GridItem>
                <GridItem
                  gridColumn={{
                    base: "1 / -1",
                    md: "9 / span 5",
                    xl: "10 / col-end",
                  }}
                  gridRow={{
                    base: "3 / -1",
                    md: "row-start / span 3",
                    lg: "row-start / row-end",
                  }}
                  overflowY={{ lg: "scroll" }}
                  alignSelf={{ base: "end", md: "start" }}
                  height={{ md: "100%" }}
                  zIndex={"2"}
                  sx={{
                    scrollbarWidth: "none",
                  }}
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
                  >
                    <Outlet />
                  </Flex>
                </GridItem>
              </Grid>
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
