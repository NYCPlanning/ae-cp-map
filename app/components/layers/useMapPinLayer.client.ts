import { IconLayer } from "@deck.gl/layers";
import { useSearchParams } from "react-router";

export function useMapPinLayer() {
  const [searchParams] = useSearchParams();
  const pin = searchParams.get("pin");
  const coordinates =
    pin === null ? undefined : pin.split(",").map((d) => parseFloat(d));

  return new IconLayer({
    id: "IconLayer",
    data: [
      {
        coordinates,
      },
    ],
    visible: coordinates !== undefined,
    getColor: [217, 107, 39],
    getIcon: () => "map-pin",
    getPosition: (d) => d.coordinates,
    getSize: 34,
    iconAtlas: "/map-pin.png",
    iconMapping: "/mapping.json",
  });
}
