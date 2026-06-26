import { DeckGL } from "@deck.gl/react";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "@deck.gl/widgets/stylesheet.css";
import {
  useCapitalProjectsLayer,
  useCommunityDistrictsLayer,
  useCommunityDistrictsOutlinesLayer,
  useCityCouncilDistrictsLayer,
  useCityCouncilDistrictsOutlinesLayer,
  useSelectedCommunityDistrictsLayer,
  useCommunityBoardBudgetRequestsLayer,
  useSelectedCityCouncilDistrictsLayer,
  useCapitalProjectBudgetedGeoJsonLayer,
  useCommunityBoardBudgetRequestsGeoJsonLayer,
  useBoundaryMVTMask,
  useBoroughsLayer,
  useBoroughsOutlinesLayer,
  useSelectedBoroughsLayer,
  useMapPinLayer,
  useFacilitiesLayer,
} from "./layers";
import type { MapView, MapViewState, PickingInfo } from "@deck.gl/core";
import { FlyToInterpolator } from "@deck.gl/core";
import { env } from "~/utils/env";

export const MAX_ZOOM = 20;
export const MIN_ZOOM = 10;
const { basemapUrl, facDbPhase2 } = env;

export const INITIAL_VIEW_STATE = {
  longitude: -74.0008,
  latitude: 40.7018,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

interface AtlasProps {
  viewState: MapViewState;
  setViewState: (newViewState: MapViewState) => void;
  showCapitalProjects: boolean;
  showCbbr: boolean;
  showFacilities: boolean;
  hoveredOverItem: string | null;
  setHoveredOverItem: (newHoveredOverItem: string | null) => void;
  clearCombobox: () => void;
  addressSearchSliderValue: number | undefined;
}

export function Atlas({
  viewState,
  setViewState,
  showCapitalProjects,
  showCbbr,
  showFacilities,
  hoveredOverItem,
  setHoveredOverItem,
  clearCombobox,
  addressSearchSliderValue,
}: AtlasProps) {
  const capitalProjectsLayer = useCapitalProjectsLayer({
    visible: showCapitalProjects,
    hoveredCapitalProject: hoveredOverItem,
    setHoveredOverProject: setHoveredOverItem,
  });
  const capitalProjectBudgetedGeoJsonLayer =
    useCapitalProjectBudgetedGeoJsonLayer();

  const onClusterClick = (
    zoom: number,
    latitude: number,
    longitude: number,
  ): void => {
    setViewState({
      longitude,
      latitude,
      zoom: zoom,
      transitionDuration: 250,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };
  const communityBoardBudgetRequestsLayer =
    useCommunityBoardBudgetRequestsLayer({
      visible: showCbbr,
      hoveredCbbr: hoveredOverItem,
      setHoveredOverCbbr: setHoveredOverItem,
      onClusterClick,
    });
  const communityBoardBudgetRequestGeoJsonLayer =
    useCommunityBoardBudgetRequestsGeoJsonLayer();

  const facilitiesLayer = useFacilitiesLayer({
    viewState,
    setViewState,
    visible: showFacilities,
  });
  const communityDistrictsLayer = useCommunityDistrictsLayer({ clearCombobox });
  const communityDistrictLayer = useSelectedCommunityDistrictsLayer();
  const communityDistrictsOutlinesLayer = useCommunityDistrictsOutlinesLayer();

  const cityCouncilDistrictsLayer = useCityCouncilDistrictsLayer({
    clearCombobox,
  });
  const cityCouncilDistrictLayer = useSelectedCityCouncilDistrictsLayer();
  const cityCouncilDistrictsOutlinesLayer =
    useCityCouncilDistrictsOutlinesLayer();

  const boroughsLayer = useBoroughsLayer({ clearCombobox });
  const boroughsOutlinesLayer = useBoroughsOutlinesLayer();
  const boroughLayer = useSelectedBoroughsLayer();

  const boundaryMvtMask = useBoundaryMVTMask({ addressSearchSliderValue });

  const mapPinLayer = useMapPinLayer({ addressSearchSliderValue });

  const LAYER_LIST =
    facDbPhase2 == "ON"
      ? [
          boundaryMvtMask,
          communityDistrictsOutlinesLayer,
          cityCouncilDistrictsOutlinesLayer,
          communityDistrictsLayer,
          communityDistrictLayer,
          cityCouncilDistrictsLayer,
          cityCouncilDistrictLayer,
          boroughsLayer,
          boroughsOutlinesLayer,
          boroughLayer,
          capitalProjectsLayer,
          capitalProjectBudgetedGeoJsonLayer,
          facilitiesLayer,
          communityBoardBudgetRequestsLayer,
          communityBoardBudgetRequestGeoJsonLayer,
          mapPinLayer,
        ]
      : [
          boundaryMvtMask,
          communityDistrictsOutlinesLayer,
          cityCouncilDistrictsOutlinesLayer,
          communityDistrictsLayer,
          communityDistrictLayer,
          cityCouncilDistrictsLayer,
          cityCouncilDistrictLayer,
          boroughsLayer,
          boroughsOutlinesLayer,
          boroughLayer,
          capitalProjectsLayer,
          capitalProjectBudgetedGeoJsonLayer,
          communityBoardBudgetRequestsLayer,
          communityBoardBudgetRequestGeoJsonLayer,
        ];

  return (
    <DeckGL<MapView>
      viewState={viewState}
      onViewStateChange={({ viewState: newViewState, interactionState }) => {
        // If the view state is in transition, or if the isZooming flag is false, set the new
        // view state normally. Otherwise, set transitionDuration to 0 to fix trackpad scrolling bug
        if (
          (interactionState.inTransition &&
            newViewState.transitionDuration &&
            newViewState.transitionDuration !== "auto") ||
          !interactionState.isZooming
        ) {
          setViewState({
            ...newViewState,
            longitude:
              newViewState.zoom < MIN_ZOOM
                ? viewState.longitude
                : Math.min(
                    -73.6311,
                    Math.max(-74.3308, newViewState.longitude),
                  ),
            latitude:
              newViewState.zoom < MIN_ZOOM
                ? viewState.latitude
                : Math.min(41.103, Math.max(40.2989, newViewState.latitude)),
            bearing: newViewState.bearing,
            pitch: 0,
            zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newViewState.zoom)),
          });
        } else {
          setViewState({
            ...newViewState,
            longitude:
              newViewState.zoom < MIN_ZOOM
                ? viewState.longitude
                : Math.min(
                    -73.6311,
                    Math.max(-74.3308, newViewState.longitude),
                  ),
            latitude:
              newViewState.zoom < MIN_ZOOM
                ? viewState.latitude
                : Math.min(41.103, Math.max(40.2989, newViewState.latitude)),
            bearing: newViewState.bearing,
            pitch: 0,
            zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newViewState.zoom)),
            transitionDuration: 0,
          });
        }
      }}
      controller={true}
      style={{
        position: "relative",
      }}
      layers={LAYER_LIST}
      getCursor={({ isDragging, isHovering }) => {
        if (isDragging) {
          return "grabbing";
        }
        return isHovering ? "pointer" : "grab";
      }}
      getTooltip={(data: PickingInfo) => {
        if (!data.object) return null;

        if (data.object.properties?.layerName === "facility") {
          return {
            html: `
              <div style="
                transform: translate(-50%, 8px);
                background-color: #FFFFFF;
                color: #4A5568;
                padding: 8px;
                max-width: 320px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                text-align: center;
                border-radius: 4px;
                box-shadow: 0 8px 4px 0 rgba(0, 0, 0, 0.08);
                white-space: wrap;
              ">
                ${data.object.properties.name}
              </div>
            `,
            style: {
              background: "transparent",
              padding: "0px",
              border: "none",
              boxShadow: "none",
            },
          };
        }
        return null;
      }}
    >
      <Map mapStyle={`${basemapUrl}/styles/positron/style.json`}></Map>
    </DeckGL>
  );
}
