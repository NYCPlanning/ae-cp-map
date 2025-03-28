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
import { useEffect, useState } from "react";
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
  SearchParamChanges,
  AttributeParams,
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

const adminParamKeys = ["districtType", "boroughId", "districtId"];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const districtType = url.searchParams.get("districtType") as DistrictType;
  const boroughId = url.searchParams.get("boroughId") as BoroughId;

  const { agencies } = await findAgencies({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });

  if (districtType === null) {
    return {
      boroughs: null,
      communityDistricts: null,
      cityCouncilDistricts: null,
      agencies,
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
  const [attributeParams, setAttributeParams] = useState<AttributeParams>({
    managingAgency,
  });

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

  const search = () => {
    let newPath = "";
    if (districtType === "cd" && boroughId !== null && districtId !== null) {
      newPath = `boroughs/${boroughId}/community-districts/${districtId}/capital-projects`;
    } else if (districtType === "ccd" && districtId !== null) {
      newPath = `city-council-districts/${districtId}/capital-projects`;
    } else if (
      districtType === null &&
      attributeParams.managingAgency !== null
    ) {
      newPath = "capital-projects";
    }

    if (
      pathname !== `/${newPath}` ||
      attributeParams.managingAgency !== managingAgency
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
                      </VStack>
                    </SearchByAttributeMenu>
                  ) : null}
                  <Flex width="full" px={4}>
                    <Button
                      width="full"
                      onClick={() => search()}
                      mt={0}
                      isDisabled={
                        (!attributeParams.managingAgency && !districtId) ||
                        (districtType && !districtId)
                          ? true
                          : false
                      }
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
