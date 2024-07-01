import { DeckGL } from "@deck.gl/react";
import { Map } from "react-map-gl/maplibre";
import { ZoomWidget, CompassWidget } from "@deck.gl/widgets";
import { useMediaQuery } from "@nycplanning/streetscape";
import "maplibre-gl/dist/maplibre-gl.css";
import "@deck.gl/widgets/stylesheet.css";
import { useState } from "react";
import {
  useCapitalProjectsLayer,
  useCommunityDistrictsLayer,
  useCityCouncilDistrictsLayer,
} from "./layers";
import type { MapView, MapViewState } from "@deck.gl/core";

const INITIAL_VIEW_STATE = {
  longitude: -74.0008,
  latitude: 40.7018,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

const MAX_ZOOM = 20;
const MIN_ZOOM = 10;

export function Atlas() {
  const capitalProjectsLayer = useCapitalProjectsLayer();
  const communityDistrictsLayer = useCommunityDistrictsLayer();
  const cityCouncilDistrictsLayer = useCityCouncilDistrictsLayer();

  const isMobile = useMediaQuery("(max-width: 767px)")[0];
  const widgetPlacement = isMobile ? "top-right" : "bottom-right";
  const widgetStyles = isMobile ? {} : { position: "relative", bottom: "2rem" };

  const ZoomControls = new ZoomWidget({
    id: "zoom",
    placement: widgetPlacement,
    style: widgetStyles,
  });
  const CompassControls = new CompassWidget({
    id: "compass",
    placement: widgetPlacement,
    style: widgetStyles,
  });

  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);

  return (
    <DeckGL<MapView>
      viewState={viewState}
      onViewStateChange={({ viewState: newViewState }) => {
        setViewState({
          longitude: Math.min(
            -73.6311,
            Math.max(-74.3308, newViewState.longitude),
          ),
          latitude: Math.min(41.103, Math.max(40.2989, newViewState.latitude)),
          bearing: newViewState.bearing,
          pitch: 0,
          zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newViewState.zoom)),
        });
      }}
      controller={true}
      style={{ height: "100vh", width: "100vw" }}
      layers={[
        capitalProjectsLayer,
        communityDistrictsLayer,
        cityCouncilDistrictsLayer,
      ]}
      getCursor={({ isDragging, isHovering }) => {
        if (isDragging) {
          return "grabbing";
        }
        return isHovering ? "pointer" : "grab";
      }}
      widgets={[ZoomControls, CompassControls]}
    >
      <Map
        mapStyle={"https://tiles.planninglabs.nyc/styles/positron/style.json"}
      ></Map>
    </DeckGL>
  );
}
