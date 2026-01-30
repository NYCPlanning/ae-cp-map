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
  // console.log({ d });

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
  // constructor() {
  //   super();
  // }
  state!: {
    data: (PointFeature<DataT> | ClusterFeature<DataT>)[];
    index: Supercluster<DataT, DataT>;
    z: number;
  };

  shouldUpdateState({ changeFlags }: UpdateParameters<this>) {
    return changeFlags.somethingChanged;
  }

  // onClick(info: PickingInfo, pickingEvent): boolean {
  //   console.log("cluster layer onclick");
  //   console.log(super.onClick);
  //   // this.props.onClick && this.props.onClick(info, pickingEvent);
  //   if (this.props.onClick) {
  //     console.log("FOO");
  //     return this.props.onClick(info, pickingEvent) || false;
  //   }
  //   return false;
  // }

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
        reduce: (accumulated, props) => {
          accumulated["sum"] += props.sum;
        },
      });
      index.load(
        // @ts-ignore Supercluster expects proper GeoJSON feature
        (props.data as DataT[]).map((d) => {
          return {
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
        // console.log({ result });
        return result;
      });
      // console.log({ data });
      this.setState({
        data,
        z,
      });
    }
  }

  getPickingInfo({ info }) {
    if (info.object?.properties) {
      info.object = {
        ...info.object,
        data: info.object.properties,
      };
    }
    return info;
  }

  // getPickingInfo({
  //   info,
  //   mode,
  // }: {
  //   info: PickingInfo<PointFeature<DataT> | ClusterFeature<DataT>>;
  //   mode: string;
  // }): IconClusterLayerPickingInfo<DataT> {
  //   const pickedObject = info.object;
  //   if (pickedObject) {
  //     let objects: DataT[] | undefined;
  //     if (pickedObject.properties.cluster && mode !== "hover") {
  //       objects = this.state.index
  //         .getLeaves(pickedObject.properties.cluster_id, 25)
  //         .map((f) => f.properties);
  //     }
  //     // console.log("one", { ...info, object: pickedObject, objects });
  //     return { ...info, object: pickedObject, objects };
  //   }
  //   // console.log("two", { ...info, object: undefined });
  //   return { ...info, object: undefined };
  // }

  renderLayers() {
    const { data } = this.state;
    const {
      iconAtlas,
      iconMapping,
      sizeScale,
      getIcon,
      getSize,
      autoHighlight,
      highlightColor,
      getColor,
      updateTriggers,
      // onClick,
      // highlightedFeatureId,
      // uniqueIdProperty,
    } = this.props;
    return new IconLayer<PointFeature<DataT> | ClusterFeature<DataT>>(
      {
        id: `${this.id}-icons`,
        data,
        iconAtlas,
        iconMapping,
        sizeScale,
        getPosition: (d) => d.geometry.coordinates as [number, number],
        getIcon,
        getSize,
        autoHighlight,
        highlightColor,
        pickable: true,
        getColor,
        updateTriggers,
        // onClick,
        // highlightedFeatureId,
        // uniqueIdProperty,
      },
      this.getSubLayerProps({
        id: "icon",
      }),
    );
  }
}
