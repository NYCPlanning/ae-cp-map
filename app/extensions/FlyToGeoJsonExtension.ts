import {
  Layer,
  LayerExtension,
  UpdateParameters,
  FlyToInterpolator,
  WebMercatorViewport,
} from "@deck.gl/core";
import { bbox } from "@turf/bbox";
import { Geometry } from "geojson";

export class FlyToGeoJsonExtension extends LayerExtension {
  updateState(
    this: Layer,
    { props, oldProps, changeFlags }: UpdateParameters<Layer>,
  ): void {
    const { deck: deckInstance } = this.context;
    if (deckInstance === undefined) {
      throw new Error("Deck instance undefined in FlyToGeoJsonExtension");
    }
    if (
      !Array.isArray(props.data) &&
      ((Array.isArray(oldProps.data) && oldProps.data.length === 0) ||
        changeFlags.dataChanged)
    ) {
      const viewport = this.context.viewport as WebMercatorViewport;
      const [minX, minY, maxX, maxY] = bbox(props.data as Geometry);
      const { longitude, latitude, zoom } = viewport.fitBounds([
        [minX, minY],
        [maxX, maxY],
      ]);
      const newViewState = {
        longitude,
        latitude,
        zoom: zoom - 0.25,
        transitionDuration: 750,
        transitionInterpolator: new FlyToInterpolator(),
      };
      deckInstance.props.onViewStateChange({
        viewState: newViewState,
        viewId: viewport.id,
        interactionState: {},
      });
    }
  }
}
