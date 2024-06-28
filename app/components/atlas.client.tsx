import { DeckGL } from "@deck.gl/react";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState } from "react";
import {
  useCapitalProjectsLayer,
  useCommunityDistrictsLayer,
  useCityCouncilDistrictsLayer,
} from "./layers";

export type ViewState = {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
};

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

  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW_STATE);

  return (
    <DeckGL
      viewState={viewState}
      onViewStateChange={(updatedViewState: any) => {
        setViewState({
          longitude: Math.min(
            -73.6311,
            Math.max(-74.3308, updatedViewState.viewState.longitude),
          ),
          latitude: Math.min(
            41.103,
            Math.max(40.2989, updatedViewState.viewState.latitude),
          ),
          bearing: updatedViewState.viewState.bearing,
          pitch: updatedViewState.viewState.pitch,
          zoom: Math.min(
            MAX_ZOOM,
            Math.max(MIN_ZOOM, updatedViewState.viewState.zoom),
          ),
        });
      }}
      controller={true}
      style={{ height: "100vh", width: "100vw" }}
      layers={[
        capitalProjectsLayer,
        communityDistrictsLayer,
        cityCouncilDistrictsLayer,
      ]}
    >
      <Map
        mapStyle={"https://tiles.planninglabs.nyc/styles/positron/style.json"}
      ></Map>
    </DeckGL>
  );
}
