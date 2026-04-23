import {
  StreetscapeProvider,
  Box,
  Heading,
  Grid,
  createListCollection,
  useCombobox,
} from "@nycplanning/streetscape";
import type {
  ComboboxInputValueChangeDetails,
  ListCollection,
  ComboboxCollectionItemProps,
  ComboboxSelectionDetails,
  UseComboboxReturn,
} from "@nycplanning/streetscape";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  LinksFunction,
  useSearchParams,
} from "react-router";
import { FlyToInterpolator, MapViewState } from "@deck.gl/core";
import { ClientOnly } from "remix-utils/client-only";
import { useEffect, useState } from "react";
import { initializeMatomoTagManager } from "./utils/analytics";
import { HeaderBar } from "./components/HeaderBar";
import { INITIAL_VIEW_STATE } from "./components/atlas.client";
import { useUpdateSearchParams } from "./utils/utils";
import type { AddressFeature } from "~/address-search";
import { findAddresses } from "~/address-search";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ADDRESS_SEARCH_RADIUS } from "~/components/HeaderBar/AddressSearch";
import { env } from "~/utils/env";

const queryClient = new QueryClient(); // eslint-disable-line

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.svg",
      type: "image/x-icon",
    },
  ];
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

export function Main() {
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);
  const [, setSearchParams] = useSearchParams();
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const search = searchParams.get("search");
  const radius = searchParams.get("radius");
  const pin = searchParams.get("pin");
  const [addressSearchQuery, setAddressSearchQuery] = useState<string | null>(
    search,
  );
  const [addressSearchSliderValue, setAddressSearchSliderValue] = useState<
    number | undefined
  >(
    radius !== null &&
      ADDRESS_SEARCH_RADIUS.MIN <= parseInt(radius) &&
      parseInt(radius) <= ADDRESS_SEARCH_RADIUS.MAX
      ? parseInt(radius)
      : undefined,
  );

  const queryFunction = () => {
    return addressSearchQuery !== null && addressSearchQuery.length > 2
      ? findAddresses(addressSearchQuery)
      : null;
  };
  const {
    data: addressSearchResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["find-addresses", addressSearchQuery],
    queryFn: queryFunction,
  });

  const items: ComboboxCollectionItemProps[] =
    addressSearchResults !== null && addressSearchResults !== undefined
      ? addressSearchResults.features.map((feature: AddressFeature) => {
          return {
            label: `${feature.properties.name}, ${feature.properties.borough}`,
            value: feature.properties.id,
            coordinates: feature.geometry.coordinates,
          };
        })
      : [];

  const collection = createListCollection({
    items,
    itemToString: (item) => item.title,
    itemToValue: (item) => item.id,
  });

  const handleInputChange = (details: ComboboxInputValueChangeDetails) => {
    if (details.reason === "input-change") {
      if (search !== null || radius !== null || pin !== null) {
        updateSearchParams({
          search: undefined,
          radius: undefined,
          pin: undefined,
        });
      }
      setAddressSearchQuery(details.inputValue);
    } else if (details.reason === "clear-trigger") {
      updateSearchParams({
        search: undefined,
        radius: undefined,
        pin: undefined,
      });
      setAddressSearchQuery(null);
    }
  };

  const handleSelection = (details: ComboboxSelectionDetails) => {
    const selection = items.find((item) => item.value === details.itemValue);

    if (selection !== undefined) {
      setAddressSearchQuery(selection.label);
      if (addressSearchSliderValue !== undefined) {
        updateSearchParams({
          search: selection.label,
          pin: selection.coordinates,
          radius: addressSearchSliderValue,
          boundaryType: undefined,
          boundaryId: undefined,
          boroughId: undefined,
        });
      } else {
        updateSearchParams({
          search: selection.label,
          pin: selection.coordinates,
          boundaryType: undefined,
          boundaryId: undefined,
          boroughId: undefined,
        });
      }

      setViewState({
        longitude: selection.coordinates[0],
        latitude: selection.coordinates[1],
        zoom: 14,
        transitionDuration: 125,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  };

  const combobox = useCombobox<UseComboboxReturn>({
    collection: collection as ListCollection,
    onInputValueChange: handleInputChange,
    onSelect: handleSelection,
    inputBehavior: "autohighlight",
    inputValue: addressSearchQuery !== null ? addressSearchQuery : undefined,
    defaultValue: addressSearchQuery !== null ? [addressSearchQuery] : [],
  });

  const clearAllFilters = () => {
    setSearchParams({});
    setViewState({
      ...INITIAL_VIEW_STATE,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const clearRadiusFilter = () => {
    setAddressSearchSliderValue(undefined);
    updateSearchParams({ radius: undefined });
  };

  return (
    <>
      <HeaderBar
        clearSelections={clearAllFilters}
        combobox={combobox}
        addressSearchQuery={addressSearchQuery}
        addressSearchResults={collection}
        addressSearchError={error}
        isLoading={isLoading}
        addressSearchSliderValue={addressSearchSliderValue}
        setAddressSearchSliderValue={setAddressSearchSliderValue}
        clearRadiusFilter={clearRadiusFilter}
      />
      <Outlet
        context={
          {
            viewState,
            setViewState,
            clearCombobox: () => {
              combobox.clearValue();
              combobox.setInputValue("");
              setAddressSearchQuery("");
            },
            addressSearchSliderValue,
            clearRadiusFilter,
          } satisfies RootContextType
        }
      />
    </>
  );
}

export type RootContextType = {
  viewState: MapViewState;
  setViewState: (newViewState: MapViewState) => void;
  clearCombobox: () => void;
  addressSearchSliderValue: number | undefined;
  clearRadiusFilter: () => void;
};

export default function App() {
  useEffect(() => {
    initializeMatomoTagManager("SmoWWpiD");
  }, []);

  return (
    <Document>
      <StreetscapeProvider>
        <ClientOnly>
          {() => (
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
              templateRows={
                env.facDbPhase1 == "ON"
                  ? {
                      base: "7dvh 2dvh [row-start] min-content 2dvh 1fr [row-end] 2dvh 7dvh",
                      md: "7dvh 2dvh [row-start] min-content 2dvh 1fr [row-end] 2dvh",
                    }
                  : {
                      base: "7dvh 2dvh [row-start] 1fr [row-end] 2dvh 7dvh",
                      md: "7dvh 2dvh [row-start] 1fr [row-end] 2dvh",
                    }
              }
              height="100vh"
            >
              <QueryClientProvider client={queryClient}>
                <Main />
              </QueryClientProvider>
            </Grid>
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
