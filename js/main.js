// js/main.js
// Main entry point: generate data, compute layout, and initialize the XR renderer and interactions.
import { generateTree } from './data.js';
import { computeRadialLayout } from './layout.js';
import { XRGraphRenderer } from './xrRenderer.js';
import { initXRInteractions } from './interactions.js';

function main() {
  // Generate sample data with 100 nodes.
  const rawData = generateTree(100);
  // Compute the radial layout (using a radius of 300 pixels).
  const root = computeRadialLayout(rawData, 300);

  // Initialize the XR renderer unconditionally.
  const xrRenderer = new XRGraphRenderer(root);
  initXRInteractions(xrRenderer);
}

main();
