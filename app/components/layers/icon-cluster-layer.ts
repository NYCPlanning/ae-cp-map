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

function getIconName(size: number): string {
  if (size === 0) {
    return "";
  }
  if (size < 10) {
    return `marker-${size}`;
  }
  if (size < 100) {
    return `marker-${Math.floor(size / 10)}0`;
  }
  return "marker-100";
}

function getIconSize(size: number): number {
  return Math.min(100, size) / 100 + 1;
  // return size / 100 + 1;
  // return Math.min(500, size) / 100 + 1;
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

  updateState({ props, oldProps, changeFlags }: UpdateParameters<this>) {
    // const rebuildIndex =
    //   changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;
    const rebuildIndex = true;

    console.log({ sizeScale: props.sizeScale });
    // console.log({ rebuildIndex });
    const z = Math.floor(this.context.viewport.zoom);
    // console.log({ z });

    if (rebuildIndex) {
      const index = new Supercluster<DataT, DataT>({
        maxZoom: 16,
        radius: 1500,
      });
      index.load(
        // @ts-ignore Supercluster expects proper GeoJSON feature
        (props.data as DataT[]).map((d) => ({
          geometry: { coordinates: (props.getPosition as Function)(d) },
          properties: d,
        })),
      );
      this.setState({ index });
    }
    // console.log({ foo: z, bar: this.state.z });
    if (rebuildIndex || z !== this.state.z) {
      this.setState({
        data: this.state.index.getClusters([-180, -85, 180, 85], z),
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
    // const pickedObject = info.object?.properties;
    // if (pickedObject) {
    //   let objects: DataT[] | undefined;
    //   if (pickedObject.cluster && mode !== "hover") {
    //     objects = this.state.index
    //       .getLeaves(pickedObject.cluster_id, 25)
    //       .map((f) => f.properties);
    //   }
    //   // console.count("ONE");
    //   return { ...info, object: pickedObject, objects };
    // }
    // // console.count("TWO");
    // return { ...info, object: undefined };
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
        getIcon: (d) =>
          getIconName(d.properties.cluster ? d.properties.point_count : 1),
        getSize: (d) => {
          console.log(d.properties.cluster, d.properties.point_count);
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
