import {
  StreetscapeProvider,
  Box,
  Heading,
  Show,
  HStack,
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
import {
  BoroId,
  DistrictId,
  DistrictType,
  FilterMenu,
} from "./components/FilterMenu";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  BoroughDropDown,
  DistrictTypeDropDown,
  CommunityDistrictDropDown,
  CityCouncilDistrictDropDown,
} from "./components/ui/AdminDropDown";
import { URLSearchParamsInit } from "react-router-dom";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const districtType = url.searchParams.get("districtType") as DistrictType;
  const boroId = url.searchParams.get("boroId") as BoroId;

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

    if (boroId === null) {
      return {
        boroughs,
        communityDistricts: null,
        cityCouncilDistricts: null,
      };
    } else {
      const { communityDistricts } = await findCommunityDistrictsByBoroughId(
        boroId,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroId = searchParams.get("boroId") as BoroId;
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

  const AdminDropdowns = () => (
    <>
      <DistrictTypeDropDown
        selectValue={districtType}
        updateSearchParams={updateSearchParams}
      />
      <HStack spacing={2} width={"full"}>
        {districtType !== "ccd" ? (
          <>
            <BoroughDropDown
              selectValue={boroId}
              updateSearchParams={updateSearchParams}
              boroughs={loaderData.boroughs}
            />
            <CommunityDistrictDropDown
              boroId={boroId}
              selectValue={districtId}
              communityDistricts={loaderData.communityDistricts}
              updateSearchParams={updateSearchParams}
            />
          </>
        ) : (
          <CityCouncilDistrictDropDown
            selectValue={districtId}
            cityCouncilDistricts={loaderData.cityCouncilDistricts}
            updateSearchParams={updateSearchParams}
          />
        )}
      </HStack>
    </>
  );

  return (
    <Document>
      <StreetscapeProvider>
        <ClientOnly>
          {() => (
            <>
              <Atlas />{" "}
              <Overlay>
                <Show above="lg">
                  <FilterMenu>
                    <AdminDropdowns />
                  </FilterMenu>
                </Show>
                <Outlet
                  context={{
                    children: AdminDropdowns(),
                  }}
                />
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
