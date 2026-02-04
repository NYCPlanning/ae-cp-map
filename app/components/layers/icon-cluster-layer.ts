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
  PropertiesT extends Record<string, unknown> & { id: string },
> extends CompositeLayer<Required<IconLayerProps<PropertiesT>>> {
  state!: {
    data: (PointFeature<PropertiesT> | ClusterFeature<PropertiesT>)[];
    index: Supercluster<PropertiesT, PropertiesT>;
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
    // Calculated value for radius scales linearly from 192 at zoom 10 to 2056 at zoom 15
    if (rebuildIndex) {
      const index = new Supercluster<PropertiesT, PropertiesT>({
        maxZoom: 15,
        radius: radius,
        extent: 512,
        reduce: () => {
          return;
        },
      });
      index.load(
        (props.data as PropertiesT[]).map((d) => {
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: (
                props.getPosition as unknown as (d: PropertiesT) => number[]
              )(d),
            },
            properties: {
              ...(d.__source as { object: { properties: PropertiesT } }).object
                .properties,
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
              ? (d.properties as ClusterProperties).cluster_id.toString()
              : d.properties.id,
          type: d.type ? d.type : "Feature",
          geometry: d.geometry,
          properties: {
            ...d.properties,
            id:
              d.properties.cluster === true
                ? (d.properties as ClusterProperties).cluster_id.toString()
                : d.properties.id,
            expansionZoom: this.state.index.getClusterExpansionZoom(
              (d.properties as ClusterProperties).cluster_id,
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
    info: PickingInfo<PointFeature<PropertiesT> | ClusterFeature<PropertiesT>>;
    mode: string;
  }): IconClusterLayerPickingInfo<PointFeature<PropertiesT>> {
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
    return new IconLayer<
      PointFeature<PropertiesT> | ClusterFeature<PropertiesT>
    >(
      this.getSubLayerProps({
        id: "icons",
        data,
        pickable: true,
        getPosition: (d: PointFeature<PropertiesT>) =>
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
