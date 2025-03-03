// js/interactions.js
// Sets up additional interactions, including basic VR controller events.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";

export function initInteractions(xrRenderer, svgRenderer) {
  console.log("Common interactions initialized.");
  // Additional shared interaction logic can be added here.
}

export function initXRInteractions(xrRenderer) {
  if (!xrRenderer) return;
  // Setup VR controller interaction (using the first available controller)
  const controller = xrRenderer.renderer.xr.getController(0);
  controller.addEventListener('selectstart', () => {
    console.log("VR controller selectstart");
    // Here you can implement raycasting for node selection in VR.
  });
  xrRenderer.scene.add(controller);
}
