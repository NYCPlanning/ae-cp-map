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
import { Atlas } from "./components/atlas.client";
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
} from "./components/AdminDropdown";
import { WelcomePanel } from "./components/WelcomePanel";
import { useEffect } from "react";
import {
  analytics,
  initializeMatomoTagManager,
  initFullStoryAnalytics,
} from "./utils/analytics";
import { setNewSearchParams } from "./utils/utils";
import {
  BoroughId,
  DistrictId,
  DistrictType,
  ManagingAgencyAcronym,
  ProjectTypeCode,
  SearchParamChanges,
} from "./utils/types";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.svg",
      type: "image/x-icon",
    },
  ];
};

const searchParamKeys = [
  "districtType",
  "boroughId",
  "districtId",
  "managingAgency",
  "projectType",
  "min",
  "max",
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const districtType = url.searchParams.get("districtType") as DistrictType;
  const boroughId = url.searchParams.get("boroughId") as BoroughId;
  const managingAgency = url.searchParams.get(
    "managingAgency",
  ) as ManagingAgencyAcronym;
  const projectType = url.searchParams.get("projectType") as ProjectTypeCode;

  const { agencies } = await findAgencies({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });

  if (districtType === null) {
    return {
      boroughs: null,
      communityDistricts: null,
      cityCouncilDistricts: null,
      agencies,
      // projectTypes,
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
        // projectTypes,
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
        // projectTypes,
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
      // projectTypes,
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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;
  const managingAgency = searchParams.get(
    "managingAgency",
  ) as ManagingAgencyAcronym;
  const projectType = searchParams.get("projectType") as ProjectTypeCode;

  const loaderData = useLoaderData<
    (FindBoroughsQueryResponse | { boroughs: null }) &
      (
        | FindCommunityDistrictsByBoroughIdQueryResponse
        | { communityDistricts: null }
      ) &
      (FindCityCouncilDistrictsQueryResponse | { cityCouncilDistricts: null }) &
      (FindAgenciesQueryResponse | { agencies: null })
  >();

  const updateSearchParams = (nextSearchParams: SearchParamChanges) => {
    const mergedParams = setNewSearchParams(searchParams, nextSearchParams);
    setSearchParams(mergedParams);
  };

  const newPath = () => {
    if (!districtId && !managingAgency) {
      return "";
    }
    return "capital-projects";
  };

  const performSearch = (currentPath: string) => (nextPath: string) => {
    // Avoid adding the same path to the history stack multiple times
    if (currentPath !== `/${nextPath}`) {
      const nextSearchParams = new URLSearchParams();
      searchParams.forEach((value, key) => {
        if (searchParamKeys.includes(key)) {
          nextSearchParams.set(key, value);
        }
      });

      analytics({
        category: "Perform Search Button",
        action: "Click",
        name: "nextPath",
      });

      navigate({
        pathname: nextPath,
        search: `?${nextSearchParams.toString()}`,
      });
    }
  };

  const performNewSearch = performSearch(pathname);

  return (
    <Document>
      <StreetscapeProvider>
        <ClientOnly>
          {() => (
            <>
              <Atlas />{" "}
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
                  borderRadius={3}
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
                  <SearchByAttributeMenu defaultIndex={0}>
                    <VStack>
                      <AgencyDropdown
                        selectValue={managingAgency}
                        agencies={loaderData.agencies}
                        setAttributeParams={updateSearchParams}
                      />
                    </VStack>
                  </SearchByAttributeMenu>
                  <Flex width="full" px={4}>
                    <Button
                      width="full"
                      onClick={() => performNewSearch(newPath())}
                      mt={0}
                      isDisabled={!districtId && !managingAgency ? true : false}
                    >
                      Search
                    </Button>
                  </Flex>

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
