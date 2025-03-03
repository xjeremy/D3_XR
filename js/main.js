// js/main.js
// Main entry point: generate data, compute layout, and initialize renderers and interactions.
import { generateTree } from './data.js';
import { computeRadialLayout } from './layout.js';
import { XRGraphRenderer } from './xrRenderer.js';
import { SVGGraphRenderer } from './svgRenderer.js';
import { initInteractions, initXRInteractions } from './interactions.js';

function main() {
  // Generate sample data with 100 nodes.
  const rawData = generateTree(100);
  // Compute the radial layout (using a radius of 300 pixels).
  const root = computeRadialLayout(rawData, 300);

  let xrRenderer = null;
  // Check for WebXR support.
  if (navigator.xr) {
    xrRenderer = new XRGraphRenderer(root);
    initXRInteractions(xrRenderer);
  } else {
    console.log("WebXR not available, using SVG fallback.");
  }
  // Always initialize the SVG renderer.
  const svgRenderer = new SVGGraphRenderer(root);
  initInteractions(xrRenderer, svgRenderer);
}

main();
