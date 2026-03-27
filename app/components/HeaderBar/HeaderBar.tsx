import { Heading, Box, Grid, GridItem } from "@nycplanning/streetscape";
import type {
  UseComboboxReturn,
  ListCollection,
} from "@nycplanning/streetscape";
import { Link, useSearchParams, useMatches } from "react-router";
import { AddressSearch } from "./AddressSearch";
import { env } from "~/utils/env";

export function HeaderBar({
  clearSelections,
  combobox,
  addressSearchQuery,
  addressSearchResults,
  isLoading,
}: {
  clearSelections?: () => void | undefined;
  combobox: UseComboboxReturn;
  addressSearchQuery: string | null;
  addressSearchResults: ListCollection;
  isLoading: boolean;
}) {
  const [searchParams] = useSearchParams();
  const matches = useMatches();
  const isMapPage = matches
    .map((match) => match.id)
    .includes("layouts/MapPage");

  return (
    <Grid
      gridTemplateColumns={"subgrid"}
      alignItems={"center"}
      gridTemplateRows={{
        base: env.facDbPhase2 === "ON" ? "1fr 1fr" : "1fr",
        lg: "1fr",
      }}
      zIndex={"1000"}
      backgroundColor={"white"}
      gridColumnStart={"1"}
      gridColumnEnd={"-1"}
      gridRowStart={"1"}
      gridRowEnd={{
        base: env.facDbPhase2 === "ON" ? "4" : "2",
        lg: "2",
      }}
      boxShadow={"0 2px 8px 0 rgba(0, 0, 0, 0.16)"}
      position={"sticky"}
      top={0}
      className="header-wrapper"
    >
      <GridItem
        gridColumn={{
          base: "2 / span 3",
          xl: "2 / span 3",
          "2xl": "2 / span 2",
        }}
        className="header-title"
      >
        <Link
          to={{
            pathname: "/",
            search:
              clearSelections === undefined ? searchParams.toString() : "",
          }}
          onClick={
            clearSelections !== undefined ? clearSelections : () => void 0
          }
        >
          <Box display="flex" alignItems="center">
            <img
              style={{ width: "2rem", height: "1rem" }}
              alt="NYC Planning"
              src="https://raw.githubusercontent.com/NYCPlanning/dcp-logo/master/dcp_logo_772.png"
            />
            <Heading
              visibility={{
                base: "hidden",
                md: "revert",
                lg: "revert",
              }}
              display={{
                base: "none",
                lg: "revert",
              }}
              ml={3}
              mr={4}
              as="h1"
              fontSize="sm"
              fontWeight="bold"
            >
              Capital Projects Portal
            </Heading>
          </Box>
        </Link>
      </GridItem>
      {env.facDbPhase2 === "ON" ? (
        <GridItem
          gridColumn={{
            base: "2 / span 5",
            md: "2 / span 5",
            lg: "5 / span 4",
            "2xl": "4 / span 3",
          }}
          gridRow={{
            base: "2",
            lg: "1",
          }}
          className="address-search"
        >
          {isMapPage && (
            <AddressSearch
              combobox={combobox}
              addressSearchQuery={addressSearchQuery}
              addressSearchResults={addressSearchResults}
              isLoading={isLoading}
            />
          )}
        </GridItem>
      ) : (
        ""
      )}
      <GridItem
        gridColumn={{
          base: "-4 / -1",
          lg: "-3 / -1",
        }}
        display="flex"
        alignItems="center"
        justifyContent={{
          base: "center",
          lg: "center",
        }}
        px={4}
        color={"gray.700"}
        className="about-button"
      >
        <Link to={{ pathname: "/about", search: searchParams.toString() }}>
          About
        </Link>
      </GridItem>
    </Grid>
  );
}
