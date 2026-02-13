import { CompositeLayer } from "@deck.gl/core";
import { IconLayer, IconLayerProps } from "@deck.gl/layers";
import Supercluster from "supercluster";

import type {
  PointFeature,
  ClusterFeature,
  ClusterProperties,
} from "supercluster";
import type { UpdateParameters, PickingInfo } from "@deck.gl/core";

export type IconClusterLayerPickingInfo<DataT> = PickingInfo<
  DataT | (DataT & ClusterProperties)
>;

export class IconClusterLayer<
  DataT extends { [key: string]: any } = any,
  ExtraProps extends object = object,
> extends CompositeLayer<Required<IconLayerProps<DataT>> & ExtraProps> {
  state!: {
    data: (PointFeature<DataT> | ClusterFeature<DataT>)[];
    index: Supercluster<DataT, DataT>;
    z: number;
  };

  shouldUpdateState({ changeFlags }: UpdateParameters<this>) {
    return changeFlags.somethingChanged;
  }

  updateState({ props, oldProps, changeFlags }: UpdateParameters<this>) {
    const z = Math.floor(this.context.viewport.zoom);

    const rebuildIndex =
      changeFlags.dataChanged ||
      props.sizeScale !== oldProps.sizeScale ||
      z !== this.state.z;
    const minZoom = 10;
    const maxZoom = 15;
    const zoomScale = (z - minZoom) / (maxZoom - minZoom);
    const minRadius = 192;
    const maxRadius = 2056;
    const radius = (maxRadius - minRadius) * zoomScale + minRadius;
    // Max zoom: 15
    // radius at zoom 10: 192
    // radius at zoom 15: 2056
    if (rebuildIndex) {
      const index = new Supercluster<DataT, DataT>({
        maxZoom: 15,
        radius: radius,
        extent: 512,
        reduce: () => {
          return;
        },
      });
      index.load(
        // @ts-ignore Supercluster expects proper GeoJSON feature
        (props.data as DataT[]).map((d) => {
          return {
            // eslint-disable-next-line getPosition type does not accept type of d
            geometry: { coordinates: (props.getPosition as Function)(d) },
            properties: {
              ...d.__source.object.properties,
            },
          };
        }),
      );
      this.setState({ index });
    }
    if (rebuildIndex || z !== this.state.z) {
      const _data = this.state.index.getClusters([-100, 0, 100, 100], z);

      const data = _data.map((d) => {
        const result = {
          id:
            d.properties.cluster === true
              ? d.properties.cluster_id.toString()
              : d.properties.id,
          type: d.type ? d.type : "Feature",
          geometry: d.geometry,
          properties: {
            ...d.properties,
            id:
              d.properties.cluster === true
                ? d.properties.cluster_id.toString()
                : d.properties.id,
            expansionZoom: this.state.index.getClusterExpansionZoom(
              d.properties.cluster_id,
            ),
          },
        };
        return result;
      });
      this.setState({
        data,
        z,
      });
    }
  }

  getPickingInfo({
    info,
  }: {
    info: PickingInfo<PointFeature<DataT> | ClusterFeature<DataT>>;
    mode: string;
  }): IconClusterLayerPickingInfo<PointFeature<DataT>> {
    const pickedObject = info.object;
    return pickedObject
      ? { ...info, object: pickedObject }
      : { ...info, object: undefined };
  }

  renderLayers() {
    const { data } = this.state;
    const {
      iconAtlas,
      iconMapping,
      sizeScale,
      getIcon,
      getSize,
      getColor,
      onHover,
      updateTriggers,
    } = this.props;
    return new IconLayer<PointFeature<DataT> | ClusterFeature<DataT>>(
      this.getSubLayerProps({
        id: "icons",
        data,
        pickable: true,
        getPosition: (d: PointFeature<DataT>) =>
          d.geometry.coordinates as [number, number],
        getIcon,
        getSize,
        onHover,
        updateTriggers,
        getColor,
        iconAtlas,
        iconMapping,
        sizeScale,
      }),
    );
  }
}
