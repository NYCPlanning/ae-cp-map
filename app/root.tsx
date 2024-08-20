import {
  StreetscapeProvider,
  Box,
  Heading,
  VStack,
  Flex,
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
} from "./gen";
import { FilterMenu } from "./components/FilterMenu";
import { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import {
  BoroughDropdown,
  DistrictTypeDropdown,
  CommunityDistrictDropdown,
  CityCouncilDistrictDropdown,
} from "./components/AdminDropdown";
import { URLSearchParamsInit } from "react-router-dom";
import {
  GoToCityCouncilDistrictBtn,
  GoToDistrictBtn,
} from "./components/GoToDistrictBtn";
import { GoToCommunityDistrictBtn } from "./components/GoToDistrictBtn/GoToCommunityDistrictBtn";
import { WelcomePanel } from "./components/WelcomePanel";

export type BoroughId = null | string;
export type DistrictType = null | "cd" | "ccd";
export type DistrictId = null | string;

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

  if (districtType === null) {
    return {
      boroughs: null,
      communityDistricts: null,
      cityCouncilDistricts: null,
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
    };
  }
};

function Document({
  children,
  title = "App title",
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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;

  const loaderData = useLoaderData<
    (FindBoroughsQueryResponse | { boroughs: null }) &
      (
        | FindCommunityDistrictsByBoroughIdQueryResponse
        | { communityDistricts: null }
      ) &
      (FindCityCouncilDistrictsQueryResponse | { cityCouncilDistricts: null })
  >();

  const updateSearchParams = (
    nextSearchParams:
      | URLSearchParamsInit
      | ((prev: URLSearchParams) => URLSearchParamsInit)
      | undefined,
  ) => setSearchParams(nextSearchParams, { replace: true });

  const goToDistrict = (currentPath: string) => (nextPath: string) => {
    // Avoid adding the same path to the history stack multiple times
    if (currentPath !== `/${nextPath}`)
      navigate({
        pathname: nextPath,
        search: `?${searchParams.toString()}`,
      });
  };

  const goToNextDistrict = goToDistrict(pathname);

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
                >
                  <FilterMenu defaultIndex={0}>
                    <VStack>
                      <DistrictTypeDropdown
                        selectValue={districtType}
                        updateSearchParams={updateSearchParams}
                      />
                      <BoroughDropdown
                        selectValue={boroughId}
                        updateSearchParams={updateSearchParams}
                        boroughs={loaderData.boroughs}
                      />

                      {districtType !== "ccd" ? (
                        <CommunityDistrictDropdown
                          boroughId={boroughId}
                          selectValue={districtId}
                          communityDistricts={loaderData.communityDistricts}
                          updateSearchParams={updateSearchParams}
                        />
                      ) : (
                        <CityCouncilDistrictDropdown
                          selectValue={districtId}
                          cityCouncilDistricts={loaderData.cityCouncilDistricts}
                          updateSearchParams={updateSearchParams}
                        />
                      )}
                    </VStack>
                    {districtType === null && (
                      <GoToDistrictBtn
                        goToDistrict={goToNextDistrict}
                        path={null}
                      />
                    )}
                    {districtType === "ccd" && (
                      <GoToCityCouncilDistrictBtn
                        goToDistrict={goToNextDistrict}
                        districtId={districtId}
                      />
                    )}
                    {districtType === "cd" && (
                      <GoToCommunityDistrictBtn
                        goToDistrict={goToNextDistrict}
                        boroughId={boroughId}
                        districtId={districtId}
                      />
                    )}
                  </FilterMenu>
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
