import { FillStyleExtension } from "@deck.gl/extensions";

export class PolygonFillStyleExtension extends FillStyleExtension {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  getShaders(extension: this): any {
    const shaders = super.getShaders(extension);

    if (shaders) {
      const fillStyle = shaders.modules.find((m: any) => m.name === "fill");

      fillStyle.inject["fs:DECKGL_FILTER_COLOR"] = `
        vec2 screen_coords = gl_FragCoord.xy;
        float angle = 3.92699; // 225 degrees in radians (45 + 180 because FillStyleExtension flips it upside down)

        float cos_angle = cos(angle);
        float sin_angle = sin(angle);

        vec2 rotated_coords;
        rotated_coords.x = screen_coords.x * cos_angle - screen_coords.y * sin_angle;
        rotated_coords.y = screen_coords.x * sin_angle + screen_coords.y * cos_angle;

        float line_density = 0.12; // Adjust this value to change line spacing
        float pattern = fract(rotated_coords.x * line_density);

        // The length check prevents it from overwriting points
        if (pattern > 0.5 && length(geometry.uv) < 0.8) {
          color = vec4(0.8510, 0.4196, 0.1529, 1.0);
        }
      `;
    }

    return shaders;
  }
}
