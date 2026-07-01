import {
  Layer,
  LayerExtension,
  UpdateParameters,
  FlyToInterpolator,
  WebMercatorViewport,
} from "@deck.gl/core";
import { bbox } from "@turf/bbox";
import { Geometry } from "geojson";

export type FlyToGeoJsonExtensionProps = {
  minZoomOnSelection?: number;
};
export class FlyToGeoJsonExtension extends LayerExtension<FlyToGeoJsonExtensionProps> {
  static defaultProps = { minZoomOnSelection: undefined };

  updateState(
    this: Layer<FlyToGeoJsonExtensionProps>,
    {
      props,
      oldProps,
      changeFlags,
    }: UpdateParameters<Layer<FlyToGeoJsonExtensionProps>>,
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
      const { longitude, latitude, zoom } = viewport.fitBounds(
        [
          [minX, minY],
          [maxX, maxY],
        ],
        {
          padding:
            window.innerWidth < 992
              ? { top: 100, bottom: 400, left: 16, right: 16 }
              : { top: 64, bottom: 64, left: 368, right: 368 },
        },
      );
      const newViewState = {
        longitude,
        latitude,
        zoom:
          this.props.minZoomOnSelection === undefined
            ? zoom // if we dont pass in a min zoom, use bounding box calc
            : Math.max(viewport.zoom, this.props.minZoomOnSelection), // if we do, use the max of the current zoom and the passed variable
        transitionDuration: 750,
        transitionInterpolator: new FlyToInterpolator(),
      };
      deckInstance.props.onViewStateChange({
        viewState: newViewState,
        viewId: viewport.id,
        interactionState: {
          isZooming: true,
          isPanning: true,
          inTransition: true,
        },
      });
    }
  }
}
