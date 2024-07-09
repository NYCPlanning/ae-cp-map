import { DeckGL } from "@deck.gl/react";
import { useParams } from "@remix-run/react";
import { Map } from "react-map-gl/maplibre";
import { ZoomWidget, CompassWidget } from "@deck.gl/widgets";
import { useMediaQuery } from "@nycplanning/streetscape";
import "maplibre-gl/dist/maplibre-gl.css";
import "@deck.gl/widgets/stylesheet.css";
import { useState, useEffect } from "react";
import {
  useCapitalProjectsLayer,
  useCommunityDistrictsLayer,
  useCityCouncilDistrictsLayer,
} from "./layers";
import type { MapView, MapViewState, WebMercatorViewport } from "@deck.gl/core";
import { FlyToInterpolator } from "@deck.gl/core";
import { bbox } from "@turf/bbox";

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
  const { managingCode, capitalProjectId } = useParams();
  // console.log({ managingCode, capitalProjectId });
  const capitalProjectsLayer = useCapitalProjectsLayer();
  const communityDistrictsLayer = useCommunityDistrictsLayer();
  const cityCouncilDistrictsLayer = useCityCouncilDistrictsLayer();

  const isMobile = useMediaQuery("(max-width: 767px)")[0];
  const widgetPlacement = isMobile ? "top-right" : "bottom-right";
  const widgetStyles = isMobile
    ? {}
    : { position: "relative", bottom: "4.5rem" };

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
  // capitalProjectsLayer.get
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [renderedFeatures, setRenderedFeatures] = useState([]);

  const onAfterRender = () => {
    if (!hasLoaded && capitalProjectsLayer.isLoaded) {
      setHasLoaded(true);

      setRenderedFeatures(capitalProjectsLayer.getRenderedFeatures());
    }
  };
  useEffect(() => {
    if (hasLoaded && capitalProjectsLayer.isLoaded) {
      renderedFeatures.forEach((feature) => {
        if (
          feature.properties.managingCodeCapitalProjectId ===
          `${managingCode}${capitalProjectId}`
        ) {
          console.log("MATCH FOUND");
          const viewport = capitalProjectsLayer.context
            .viewport as WebMercatorViewport;
          const [minX, minY, maxX, maxY] = bbox(feature);
          const { longitude, latitude, zoom } = viewport.fitBounds([
            [minX, minY],
            [maxX, maxY],
          ]);
          setViewState({
            longitude,
            latitude,
            zoom: zoom - 1,
            transitionDuration: 750,
            transitionInterpolator: new FlyToInterpolator(),
          });
        }
      });
    }
  }, [managingCode, capitalProjectId]);

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
      onAfterRender={onAfterRender}
    >
      <Map
        mapStyle={"https://tiles.planninglabs.nyc/styles/positron/style.json"}
      ></Map>
      <img
        style={
          isMobile
            ? {
                position: "absolute",
                top: "0.5rem",
                left: "0.5rem",
                height: "2rem",
              }
            : {
                position: "absolute",
                bottom: "2.5rem",
                right: "1rem",
                height: "2rem",
              }
        }
        alt="NYC Planning"
        src="https://raw.githubusercontent.com/NYCPlanning/dcp-logo/master/dcp_logo_772.png"
      />
    </DeckGL>
  );
}
