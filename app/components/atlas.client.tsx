import { DeckGL } from "@deck.gl/react";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCapitalProjectsLayer, useCommunityDistrictsLayer } from "./layers";

const INITIAL_VIEW_STATE = {
  longitude: -74.0008,
  latitude: 40.7018,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

export function Atlas() {
  const capitalProjectsLayer = useCapitalProjectsLayer();
  const communityDistrictsLayer = useCommunityDistrictsLayer();
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      style={{ height: "100vh", width: "100vw" }}
      layers={[capitalProjectsLayer, communityDistrictsLayer]}
    >
      <Map
        mapStyle={"https://tiles.planninglabs.nyc/styles/positron/style.json"}
      ></Map>
    </DeckGL>
  );
}
