import { IconLayer } from "@deck.gl/layers";
import { useSearchParams } from "react-router";
import { FlyToGeoJsonExtension } from "../../extensions";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;

export function useMapPinLayer() {
  const [searchParams, setSearchParams] = useSearchParams();
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
    getColor: (d) => [217, 107, 39],
    getIcon: (d) => "map-pin",
    getPosition: (d) => d.coordinates,
    getSize: 40,
    iconAtlas: "/map-pin.png",
    iconMapping: "/mapping.json",
    pickable: true,
  });
}
