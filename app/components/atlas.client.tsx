import { DeckGL } from "@deck.gl/react";
import { Map } from "react-map-gl/maplibre";
import { ZoomWidget, CompassWidget } from "@deck.gl/widgets";
import { useMediaQuery } from "@nycplanning/streetscape";
import "maplibre-gl/dist/maplibre-gl.css";
import "@deck.gl/widgets/stylesheet.css";
import {
  useCapitalProjectsLayer,
  useCommunityDistrictsLayer,
  useCityCouncilDistrictsLayer,
  useCommunityDistrictLayer,
  useCityCouncilDistrictLayer,
  useCapitalProjectBudgetedGeoJsonLayer,
} from "./layers";
import type { MapView, MapViewState } from "@deck.gl/core";
import { showRedesign } from "~/utils/envFlags";

export const MAX_ZOOM = 20;
export const MIN_ZOOM = 10;

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
}

export function Atlas({
  viewState,
  setViewState,
  showCapitalProjects,
}: AtlasProps) {
  const capitalProjectsLayer = useCapitalProjectsLayer({
    visible: showCapitalProjects,
  });
  const capitalProjectBudgetedGeoJsonLayer =
    useCapitalProjectBudgetedGeoJsonLayer();
  const communityDistrictsLayer = useCommunityDistrictsLayer();
  const communityDistrictLayer = useCommunityDistrictLayer();
  const cityCouncilDistrictsLayer = useCityCouncilDistrictsLayer();

  const cityCouncilDistrictLayer = useCityCouncilDistrictLayer();

  // const isMobile = useMediaQuery("(max-width: 767px)")[0];
  // const widgetPlacement = isMobile ? "top-right" : "bottom-right";
  // const widgetStyles = isMobile
  //   ? {
  //       position: showRedesign ? "relative" : "",
  //       top: showRedesign ? "2rem" : "",
  //       left: showRedesign ? "5rem" : "",
  //     }
  //   : {
  //       position: "relative",
  //       bottom: "4.5rem",
  //     };

  // const ZoomControls = new ZoomWidget({
  //   id: "zoom",
  //   placement: widgetPlacement,
  //   style: widgetStyles,
  // });
  // const CompassControls = new CompassWidget({
  //   id: "compass",
  //   placement: widgetPlacement,
  //   style: widgetStyles,
  // });

  return (
    <DeckGL<MapView>
      viewState={viewState}
      onViewStateChange={({ viewState: newViewState }) => {
        setViewState({
          ...newViewState,
          longitude:
            newViewState.zoom < MIN_ZOOM
              ? viewState.longitude
              : Math.min(-73.6311, Math.max(-74.3308, newViewState.longitude)),
          latitude:
            newViewState.zoom < MIN_ZOOM
              ? viewState.latitude
              : Math.min(41.103, Math.max(40.2989, newViewState.latitude)),
          bearing: newViewState.bearing,
          pitch: 0,
          zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newViewState.zoom)),
        });
      }}
      controller={true}
      style={{ height: "100vh", width: "100vw" }}
      layers={[
        capitalProjectsLayer,
        capitalProjectBudgetedGeoJsonLayer,
        communityDistrictsLayer,
        communityDistrictLayer,
        cityCouncilDistrictsLayer,
        cityCouncilDistrictLayer,
      ]}
      getCursor={({ isDragging, isHovering }) => {
        if (isDragging) {
          return "grabbing";
        }
        return isHovering ? "pointer" : "grab";
      }}
      // widgets={isMobile ? [] : [ZoomControls, CompassControls]}
    >
      <Map
        mapStyle={"https://tiles.planninglabs.nyc/styles/positron/style.json"}
        // attributionControl={isMobile ? false : true}
      ></Map>
    </DeckGL>
  );
}
