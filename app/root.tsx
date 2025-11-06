import {
  StreetscapeProvider,
  Box,
  Heading,
  Grid,
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
import {
  initializeMatomoTagManager,
  initFullStoryAnalytics,
} from "./utils/analytics";
import { HeaderBar } from "./components/HeaderBar";
import { INITIAL_VIEW_STATE } from "./components/atlas.client";

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

export type RootContextType = {
  viewState: MapViewState;
  setViewState: (newViewState: MapViewState) => void;
};

export default function App() {
  useEffect(() => {
    initializeMatomoTagManager("SmoWWpiD");
    initFullStoryAnalytics();
  }, []);
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);
  const [, setSearchParams] = useSearchParams();

  const clearAllFilters = () => {
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
            >
              <HeaderBar clearSelections={clearAllFilters} />
              <Outlet
                context={{ viewState, setViewState } satisfies RootContextType}
              />
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
