import { Flex, GridItem, Accordion, Box } from "@nycplanning/streetscape";
import {
  Outlet,
  useLoaderData,
  useOutletContext,
  LoaderFunctionArgs,
} from "react-router";
import {
  Atlas,
  INITIAL_VIEW_STATE,
  MAX_ZOOM,
  MIN_ZOOM,
} from "../components/atlas.client";
import {
  findBoroughs,
  findCityCouncilDistricts,
  findCommunityDistrictsByBoroughId,
  findAgencyBudgets,
  findCapitalProjectManagingAgencies,
} from "../gen";
import { FilterMenu } from "../components/FilterMenu";
import { SearchByAttributeMenu } from "../components/SearchByAttributeMenu";
import { env } from "../utils/env";
import { BoroughId, DistrictType } from "../utils/types";
import { HowToUseThisTool } from "../components/AdminDropdownContent/HowToUseThisTool";
import { MapLayersPanel } from "../components/AdminMapLayersPanel";
import {
  CapitalProjectLayerToggle,
  CommunityBoardBudgetRequestLayerToggle,
} from "~/components/MapLayerToggle";
import { CommunityBoardBudgetRequestLegend } from "../components/CommunityBoardBudgetRequestLegend";
import { useUpdateSearchParams } from "../utils/utils";
import type { RootContextType } from "../root";
import { MapViewControls } from "~/components/MapViewControls";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const districtType = url.searchParams.get("districtType") as DistrictType;
  const boroughId = url.searchParams.get("boroughId") as BoroughId;

  const { managingAgencies } = await findCapitalProjectManagingAgencies({
    baseURL: `${env.zoningApiUrl}/api`,
  });

  const { agencyBudgets } = await findAgencyBudgets({
    baseURL: `${env.zoningApiUrl}/api`,
  });

  if (districtType === "cd") {
    const { boroughs } = await findBoroughs({
      baseURL: `${env.zoningApiUrl}/api`,
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
          baseURL: `${env.zoningApiUrl}/api`,
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
      baseURL: `${env.zoningApiUrl}/api`,
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

export default function MapPage() {
  const { viewState, setViewState } = useOutletContext<RootContextType>();
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const showCapitalProjects = searchParams.get("capitalProjects") !== "off";
  const showCbbr = searchParams.get("cbbr") !== "off";

  const {
    boroughs,
    communityDistricts,
    cityCouncilDistricts,
    managingAgencies,
    agencyBudgets,
  } = useLoaderData<typeof loader>();

  const clearCapitalProjectFilters = () => {
    updateSearchParams({
      managingAgency: null,
      agencyBudget: null,
      commitmentsTotalMin: null,
      commitmentsTotalMax: null,
    });
  };

  return (
    <>
      <GridItem
        gridColumn={"1 / -1"}
        gridRow={{
          base: "2 / 5",
          md: "2 / -1",
        }}
      >
        <Atlas
          viewState={viewState}
          setViewState={(MapViewState) => setViewState(MapViewState)}
          showCapitalProjects={showCapitalProjects}
          showCbbr={showCbbr}
        />{" "}
      </GridItem>
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
        height={"fit-content"}
        maxHeight={"100%"}
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
            md: "89vh",
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
          <Accordion allowMultiple defaultIndex={[0]} width={"100%"}>
            <MapLayersPanel>
              <Box display={"flex"} flexDirection={"column"} gap={2}>
                <CapitalProjectLayerToggle />
                <SearchByAttributeMenu
                  agencies={managingAgencies}
                  projectTypes={agencyBudgets}
                  onClear={clearCapitalProjectFilters}
                />
                <CommunityBoardBudgetRequestLayerToggle />
                <CommunityBoardBudgetRequestLegend />
              </Box>
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
        gridColumnStart={{ base: 9, md: 6, lg: 6, xl: 5, "2xl": 4 }}
        gridRowStart={{ base: 3, md: 3, lg: 3 }}
        width={"fit-content"}
        height={"fit-content"}
      >
        <MapViewControls
          viewState={viewState}
          setViewState={setViewState}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
        />
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
    </>
  );
}
