// js/layout.js
// Uses D3.js to compute a radial hierarchical layout for the given tree data.
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function computeRadialLayout(data, radius = 300) {
  const root = d3.hierarchy(data);
  // Create a cluster layout with angle range [0, 360] and radial distance up to the given radius.
  const cluster = d3.cluster().size([360, radius]);
  cluster(root);

  // Convert polar coordinates (angle, radius) to Cartesian (x, y)
  root.descendants().forEach(d => {
    const angle = (d.x - 90) * (Math.PI / 180); // rotate -90° so 0° is at the top
    const x = d.y * Math.cos(angle);
    const y = d.y * Math.sin(angle);
    d.x = x;
    d.y = y;
  });

  return root;
}
