import { FillStyleExtension } from "@deck.gl/extensions";

export class PointFillStyleExtension extends FillStyleExtension {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  getShaders(extension: this): any {
    const shaders = super.getShaders(extension);

    if (shaders) {
      const fillStyle = shaders.modules.find((m: any) => m.name === "fill");

      fillStyle.inject["fs:DECKGL_FILTER_COLOR"] = `
        // unit_uv ranges from -1 to 1 across the point.
        // Length (dist) of 1.0 is the very edge of the circle.
        float dist = length(geometry.uv);

        vec2 screen_coords = gl_FragCoord.xy;
        float angle = 3.92699; // 225 degrees in radians (45 + 180 because FillStyleExtension flips it upside down)

        float cos_angle = cos(angle);
        float sin_angle = sin(angle);

        vec2 rotated_coords;
        rotated_coords.x = screen_coords.x * cos_angle - screen_coords.y * sin_angle;
        rotated_coords.y = screen_coords.x * sin_angle + screen_coords.y * cos_angle;

        float line_density = 0.12; // Adjust this value to change line spacing
        float pattern = fract(rotated_coords.x * line_density);

        // 0.8 is (1.0 - stroke_width / radius)
        if (pattern < 0.5 && dist < 0.8) {
          color = vec4(0.8510, 0.4196, 0.1529, 1.0);
        }
        
        if (dist >= 0.8) {
          color = vec4(1.0, 1.0, 1.0, 1.0);
        }
      `;
    }

    return shaders;
  }
}
