import {
  StreetscapeProvider,
  Box,
  Heading,
  Show,
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
  cityCouncilDistrictSchema,
  findBoroughs,
  findCommunityDistrictsByBoroughId,
} from "./gen";
import {
  Boro,
  District,
  DistrictType,
  FilterMenu,
} from "./components/FilterMenu";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async (data: LoaderFunctionArgs) => {
  const { request } = data;
  console.log("data", data);
  const url = new URL(request.url);
  const districtType = url.searchParams.get("districtType") as DistrictType;
  const boro = url.searchParams.get("boro") as Boro;
  const district = url.searchParams.get("district") as District;

  if (districtType === null) {
    return {
      boroughs: [],
      communityDistricts: [],
      cityCouncilDistricts: [],
    };
  }

  if (districtType === "cd") {
    const { boroughs } = await findBoroughs({
      baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
    });

    if (boro === null)
      return {
        boroughs,
        communityDistricts: [],
        cityCouncilDistricts: [],
      };

    if (district === null) {
    }
    const { communityDistricts } = await findCommunityDistrictsByBoroughId(
      boro,
      {
        baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
      },
    );

    return {
      boroughs,
      communityDistricts,
      cityCouncilDistricts: [],
    };
  }

  if (districtType === "ccd") {
    return {
      boroughs: [],
      communityDistricts: [],
      cityCouncilDistricts: [],
    };
  }
  // if (boro === null) return boroughs;
  // return { ...boroughs, ...communityDistricts };
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
  const boro = searchParams.get("boro") as Boro;
  const district = searchParams.get("district") as District;
  const loaderData = useLoaderData<
    FindBoroughsQueryResponse &
      FindCommunityDistrictsByBoroughIdQueryResponse &
      FindCityCouncilDistrictsQueryResponse
  >();

  const districts =
    districtType === "ccd"
      ? loaderData.cityCouncilDistricts
      : loaderData.communityDistricts;

  const updateDistrictType = (nextDistrictType: DistrictType) => {
    if (nextDistrictType === null) {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams(
        {
          districtType: nextDistrictType,
        },
        { replace: true },
      );
    }
  };

  const updateBoro = (nextBoro: Boro) => {
    if (nextBoro === null && districtType !== null) {
      setSearchParams(
        {
          districtType,
        },
        { replace: true, state: { boroughs: loaderData.boroughs } },
      );
    } else if (nextBoro !== null && districtType !== null) {
      setSearchParams(
        {
          districtType,
          boro: nextBoro,
        },
        { replace: true, state: { boroughs: loaderData.boroughs } },
      );
    }
  };

  const updateDistrict = (nextDistrict: District) => {
    if (districtType === "ccd") {
      if (nextDistrict === null) {
        setSearchParams(
          {
            districtType,
          },
          { replace: true },
        );
      }
    }

    if (districtType === "cd") {
      if (nextDistrict !== null) {
        setSearchParams(
          {
            districtType,
            district: nextDistrict,
          },
          { replace: true },
        );
      }
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
                <Show above="lg">
                  <FilterMenu
                    districtType={districtType}
                    updateDistrictType={updateDistrictType}
                    boro={boro}
                    updateBoro={updateBoro}
                    district={district}
                    updateDistrict={updateDistrict}
                    boroughs={loaderData.boroughs}
                    districts={districts}
                  />
                </Show>
                <Outlet />
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
