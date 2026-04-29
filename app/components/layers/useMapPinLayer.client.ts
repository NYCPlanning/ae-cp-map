import { CompositeLayer } from "@deck.gl/core";
import { IconLayer, ScatterplotLayer, TextLayer } from "@deck.gl/layers";
import type {
  IconLayerProps,
  ScatterplotLayerProps,
  TextLayerProps,
} from "@deck.gl/layers";
import { useSearchParams } from "react-router";
import { formatDistance } from "~/utils/utils";

export type MapPinIconLayerProps = {
  coordinates: number[];
  radius: number | undefined;
  getRadiusCircleFillColor: ScatterplotLayerProps["getFillColor"];
  getRadiusCircleLineColor: ScatterplotLayerProps["getLineColor"];
  getSmallCircleFillColor: ScatterplotLayerProps["getFillColor"];
  getSmallCircleLineColor: ScatterplotLayerProps["getLineColor"];
  getTextSize: TextLayerProps["getSize"];
  getTextBackgroundColor: TextLayerProps["getBackgroundColor"];
  getTextColor: TextLayerProps["getColor"];
  fontFamily: string;
  fontWeight: number;
  getIconColor: IconLayerProps["getColor"];
  getIcon: IconLayerProps["getIcon"];
  getIconSize: IconLayerProps["getSize"];
  iconAtlas: string;
  iconMapping: string;
};

export function useMapPinLayer({
  addressSearchSliderValue,
}: {
  addressSearchSliderValue: number | undefined;
}) {
  const [searchParams] = useSearchParams();
  const pin = searchParams.get("pin");
  const coordinates =
    pin === null ? undefined : pin.split(",").map((d) => parseFloat(d));
  return new MapPinLayer({
    coordinates,
    radius: addressSearchSliderValue,
    getRadiusCircleFillColor: [79, 209, 197, 76],
    getRadiusCircleLineColor: [49, 151, 149, 255],
    getSmallCircleFillColor: [79, 209, 197, 255],
    getSmallCircleLineColor: [255, 255, 255, 255],
    getTextSize: 16,
    getTextBackgroundColor: [255, 255, 255, 217],
    getTextColor: [74, 85, 104, 255],
    fontFamily: "Arial",
    fontWeight: 700,
    getIconColor: [217, 107, 39],
    getIcon: () => "map-pin",
    getIconSize: 34,
    iconAtlas: "/map-pin.png",
    iconMapping: "/mapping.json",
  });
}

export class MapPinLayer extends CompositeLayer<
  Required<MapPinIconLayerProps>
> {
  renderLayers() {
    return [
      new ScatterplotLayer({
        id: "MapPinRadiusCircleScatterplotLayer",
        data: [
          {
            coordinates: this.props.coordinates,
          },
        ],
        visible:
          this.props.coordinates !== undefined &&
          this.props.radius !== undefined &&
          this.props.radius > 0,
        getFillColor: this.props.getRadiusCircleFillColor,
        getPosition: (d) => d.coordinates,
        getRadius: () => (this.props.radius ?? 0) / 3.28084,
        getLineColor: this.props.getRadiusCircleLineColor,
        getLineWidth: 1,
        lineWidthUnits: "pixels",
        stroked: true,
      }),
      new ScatterplotLayer({
        id: "MapPinSmallCircleScatterplotLayer",
        data: [
          {
            coordinates: this.props.coordinates,
          },
        ],
        visible: this.props.coordinates !== undefined,
        getFillColor: this.props.getSmallCircleFillColor,
        getPosition: (d) => d.coordinates,
        getRadius: () => 6,
        radiusUnits: "pixels",
        getLineColor: this.props.getSmallCircleLineColor,
        getLineWidth: 2,
        lineWidthUnits: "pixels",
        stroked: true,
      }),
      new TextLayer({
        id: "MapPinTextLayer",
        data: [
          {
            coordinates: this.props.coordinates,
          },
        ],
        visible:
          this.props.coordinates !== undefined &&
          this.props.radius !== undefined &&
          this.props.radius > 0,
        getPosition: (d) => d.coordinates,
        getText: () => formatDistance(this.props.radius ?? 0),
        getSize: this.props.getTextSize,
        getAlignmentBaseline: "top",
        getPixelOffset: [0, 20],
        background: true,
        getBackgroundColor: this.props.getTextBackgroundColor,
        backgroundPadding: [4, 4],
        fontFamily: this.props.fontFamily,
        fontWeight: this.props.fontWeight,
        getColor: this.props.getTextColor,
      }),
      new IconLayer({
        id: "MapPinIconLayer",
        data: [
          {
            coordinates: this.props.coordinates,
          },
        ],
        visible: this.props.coordinates !== undefined,
        getColor: this.props.getIconColor,
        getIcon: this.props.getIcon,
        getPosition: (d) => d.coordinates,
        getSize: this.props.getIconSize,
        iconAtlas: this.props.iconAtlas,
        iconMapping: this.props.iconMapping,
      }),
    ];
  }
}
