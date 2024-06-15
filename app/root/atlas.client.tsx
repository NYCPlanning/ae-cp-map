import { DeckGL } from "@deck.gl/react";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCapitalProjectsLayer } from "../layers/CapitalProjects.client";
import { useCommunityDistrictsLayer } from "../layers/CommunityDistricts.client";
import { useCityCouncilDistrictsLayer } from "../layers/CityCouncilDistricts.client";

const INITIAL_VIEW_STATE = {
  longitude: -74.0008,
  latitude: 40.7018,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

export function Atlas() {
  const capitalProjectsLayer = useCapitalProjectsLayer();
  const cityCouncilDistrictsLayer = useCityCouncilDistrictsLayer();
  const communityDistrictsLayer = useCommunityDistrictsLayer();
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      style={{ height: "100%", width: "100%" }}
      // layers={[capitalProjectsLayer, communityDistrictsLayer, cityCouncilDistrictsLayer]}
      layers={[cityCouncilDistrictsLayer]}
    >
      <Map
        mapStyle={
          "http://tiles.nycplanningdigital.com/styles/positron/style.json"
        }
      ></Map>
    </DeckGL>
  );
}
