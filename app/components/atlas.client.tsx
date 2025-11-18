import { DeckGL } from "@deck.gl/react";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "@deck.gl/widgets/stylesheet.css";
import {
  useCapitalProjectsLayer,
  useCommunityDistrictsLayer,
  useCityCouncilDistrictsLayer,
  useCommunityDistrictLayer,
  useCommunityBoardBudgetRequestsLayer,
  useCityCouncilDistrictLayer,
  useCapitalProjectBudgetedGeoJsonLayer,
} from "./layers";
import {
  Layer,
  LayerExtension,
  UpdateParameters,
  FlyToInterpolator,
  WebMercatorViewport,
} from "@deck.gl/core";
import type { MapView, MapViewState } from "@deck.gl/core";
import { env } from "~/utils/env";

export const MAX_ZOOM = 200;
export const MIN_ZOOM = 10;
const { basemapUrl } = env;

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
}

export function Atlas({
  viewState,
  setViewState,
  showCapitalProjects,
  showCbbr,
}: AtlasProps) {
  const capitalProjectsLayer = useCapitalProjectsLayer({
    visible: showCapitalProjects,
  });
  const capitalProjectBudgetedGeoJsonLayer =
    useCapitalProjectBudgetedGeoJsonLayer();

  const zoomToCluster = (
    zoom: number,
    latitude: number,
    longitude: number,
  ): void => {
    setViewState({
      longitude,
      latitude,
      zoom: zoom,
      transitionDuration: 750,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };
  const communityBoardBudgetRequestsLayer =
    useCommunityBoardBudgetRequestsLayer({ visible: showCbbr, zoomToCluster });
  const communityDistrictsLayer = useCommunityDistrictsLayer();
  const communityDistrictLayer = useCommunityDistrictLayer();

  const cityCouncilDistrictsLayer = useCityCouncilDistrictsLayer();

  const cityCouncilDistrictLayer = useCityCouncilDistrictLayer();

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
      layers={[
        capitalProjectsLayer,
        capitalProjectBudgetedGeoJsonLayer,
        communityDistrictsLayer,
        communityDistrictLayer,
        communityBoardBudgetRequestsLayer,
        cityCouncilDistrictsLayer,
        cityCouncilDistrictLayer,
      ]}
      getCursor={({ isDragging, isHovering }) => {
        if (isDragging) {
          return "grabbing";
        }
        return isHovering ? "pointer" : "grab";
      }}
    >
      <Map mapStyle={`${basemapUrl}/styles/positron/style.json`}></Map>
    </DeckGL>
  );
}
