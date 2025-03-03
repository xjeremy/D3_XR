// js/interactions.js
// Sets up XR interactions, including basic VR controller events.
import * as THREE from "three";

export function initXRInteractions(xrRenderer) {
  if (!xrRenderer) return;
  // Setup VR controller interaction (using the first available controller).
  const controller = xrRenderer.renderer.xr.getController(0);
  controller.addEventListener('selectstart', () => {
    console.log("VR controller selectstart");
    // Implement raycasting for node selection in VR.
  });
  xrRenderer.scene.add(controller);
}
