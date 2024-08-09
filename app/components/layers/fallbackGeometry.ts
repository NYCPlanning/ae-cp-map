import { Geometry } from "geojson";

/* A placeholder geometry when a layer is turned off 
and a network call would be unnecessary */
export const fallbackGeometry: Geometry = {
  coordinates: [-73.999862, 40.739418],
  type: "Point",
};
