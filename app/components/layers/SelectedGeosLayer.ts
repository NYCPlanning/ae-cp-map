import { GeoJsonLayer } from "@deck.gl/layers";
import { CompositeLayer, LayersList } from "@deck.gl/core";

export type SelectedGeosLayerProps = {
  ids: null | string[];
  getDataUrlPath: (id: string) => void;
};

export class SelectedGeosLayer extends CompositeLayer<
  Required<SelectedGeosLayerProps>
> {
  renderLayers() {
    return this.props.ids === null || this.props.ids === undefined
      ? null
      : (this.props.ids.map(
          (id) =>
            new GeoJsonLayer({
              id: `Selected-Geo-${id}`,
              data: `${this.props.getDataUrlPath(id)}`,
              filled: true,
              getFillColor: [119, 128, 190, 128],
              stroked: true,
              lineWidthUnits: "pixels",
              getLineWidth: 3,
              getLineColor: [48, 66, 100],
            }),
        ) as LayersList);
  }
}
