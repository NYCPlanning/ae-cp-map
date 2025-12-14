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
  DataT | (DataT & ClusterProperties),
  { objects?: DataT[] }
>;

const policyAreaIconsMap: Record<number, string> = {
  1: "health",
  2: "education",
  3: "safety",
  4: "infrastructure",
  5: "housing",
  6: "transportation",
  7: "parks",
  8: "other",
};

function getIconName(d: any): string {
  if (!d.properties.point_count) {
    return `marker-${policyAreaIconsMap[d.properties.policyAreaId]}`;
  }
  const size = d.properties.point_count;
  if (size === 0) {
    return `marker-1`;
  }
  if (size < 10) {
    return `marker-${size}`;
  }
  if (size < 150) {
    return `marker-${Math.floor(size / 10)}0`;
  }
  return "marker-150";
}

function getIconSize(size: number): number {
  return Math.min(150, size) / 100 + 1;
}

export class IconClusterLayer<
  DataT extends { [key: string]: any } = any,
  ExtraProps extends {} = {},
> extends CompositeLayer<Required<IconLayerProps<DataT>> & ExtraProps> {
  state!: {
    data: (PointFeature<DataT> | ClusterFeature<DataT>)[];
    index: Supercluster<DataT, DataT>;
    z: number;
  };

  shouldUpdateState({ changeFlags }: UpdateParameters<this>) {
    return changeFlags.somethingChanged;
  }

  onClick(info: PickingInfo, pickingEvent): boolean {
    if (this.props.onClick) {
      return this.props.onClick(info, pickingEvent) || false;
    }
    return false;
  }

  updateState({ props, oldProps, changeFlags }: UpdateParameters<this>) {
    const z = Math.floor(this.context.viewport.zoom);
    // const z = Math.round(this.context.viewport.zoom*10)/10;

    const rebuildIndex =
      changeFlags.dataChanged ||
      props.sizeScale !== oldProps.sizeScale ||
      z !== this.state.z;
    const minZoom = 10;
    const maxZoom = 15;
    // const zoomScale = z / 10;
    const zoomScale = (z - minZoom) / (maxZoom - minZoom);
    // console.log({ z });
    const minRadius = 192;
    const maxRadius = 2056;
    const radius = (maxRadius - minRadius) * zoomScale + minRadius;
    console.log({ data: props.data });
    // console.log({ radius, z });
    // const scale = this.parent?.internalState?.viewport?.scale;
    // const extent = scale ? scale / 2 : 512;
    // Max zoom: 15
    // radius at zoom 10: 192
    // radius at zoom 15: 2056
    if (rebuildIndex) {
      const index = new Supercluster<DataT, DataT>({
        maxZoom: 15,
        radius,
        extent: 512,
        // reduce: (accumulated, props) => {
        //   // console.log({ accumulated, props });
        //   accumulated["sum"] += props.sum;
        // },
      });
      index.load(
        // @ts-ignore Supercluster expects proper GeoJSON feature
        (props.data as DataT[])
          .map((d) => {
            // console.log({ properties: d.__source.object.properties });
            return {
              geometry: { coordinates: (props.getPosition as Function)(d) },
              // properties: { ...d, ...d.__source.object.properties },
              properties: d.__source.object.properties,
            };
          })
          .filter(
            (d) =>
              d.properties.layerName !== "community-board-budget-request-fill",
          ),
      );
      this.setState({ index });
    }
    // console.log({ foo: z, bar: this.state.z });
    if (rebuildIndex || z !== this.state.z) {
      const _data = this.state.index.getClusters([-100, 0, 100, 100], z);

      const data = _data.map((d) => {
        return {
          id: d.id,
          type: d.type,
          geometry: d.geometry,
          properties: {
            ...d.properties,
            expansionZoom: this.state.index.getClusterExpansionZoom(
              d.properties.cluster_id,
            ),
          },
        };
      });
      // console.log({ data });
      this.setState({
        data,
        z,
      });
    }
  }

  // updateState({ props, oldProps, changeFlags }: UpdateParameters<this>) {
  //   const rebuildIndex =
  //     changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;
  //   if (rebuildIndex) {
  //     const index = new Supercluster<DataT, DataT>({
  //       maxZoom: 16,
  //       radius: props.sizeScale * Math.sqrt(2),
  //       // radius: 750,
  //     });
  //     const data = (props.data as DataT[]).map((d) => {
  //       // if (d.geometry.type !== "Point") {
  //       //   console.log({ d });
  //       // }
  //       // console.log({ d });
  //       // console.log({ geom: props.getPosition(d) });
  //       return {
  //         geometry: { coordinates: (props.getPosition as Function)(d) },
  //         properties: d,
  //       };
  //     });
  //     index.load(
  //       // @ts-ignore Supercluster expects proper GeoJSON feature
  //       data,
  //     );
  //     this.setState({ index });
  //   }

  //   const z = Math.floor(this.context.viewport.zoom);
  //   if (rebuildIndex || z !== this.state.z) {
  //     this.setState({
  //       data: this.state.index.getClusters([-180, -85, 180, 85], z),
  //       z,
  //     });
  //   }
  // }

  getPickingInfo({
    info,
    mode,
  }: {
    info: PickingInfo<PointFeature<DataT> | ClusterFeature<DataT>>;
    mode: string;
  }): IconClusterLayerPickingInfo<DataT> {
    // console.log({ picked: info });
    const pickedObject = info.object;
    // console.log({ properties: pickedObject?.properties });
    if (pickedObject) {
      let objects: DataT[] | undefined;
      if (pickedObject.properties.cluster && mode !== "hover") {
        objects = this.state.index
          .getLeaves(pickedObject.properties.cluster_id, 25)
          .map((f) => f.properties);
      }

      // console.count("ONE");
      return { ...info, object: pickedObject, objects };
    }
    // console.count("TWO");
    return { ...info, object: undefined };
  }

  renderLayers() {
    const { data } = this.state;
    const { iconAtlas, iconMapping, sizeScale } = this.props;
    // console.log("RENDER LAYERS", { data })

    return new IconLayer<PointFeature<DataT> | ClusterFeature<DataT>>(
      {
        data,
        iconAtlas,
        iconMapping,
        sizeScale,
        getPosition: (d) => d.geometry.coordinates as [number, number],
        getIcon: function (d) {
          return getIconName(d);
          return getIconName(
            d.properties.cluster ? d.properties.point_count : 1,
          );
        },
        getSize: (d) => {
          // console.log(d.properties.cluster, d.properties.point_count);
          // console.log({
          //   cluster: d.properties.cluster,
          //   count: d.properties.point_count,
          // });
          return getIconSize(
            d.properties.cluster ? d.properties.point_count : 1,
          );
        },
      },
      this.getSubLayerProps({
        id: "icon",
      }),
    );
  }
}
