// js/xrRenderer.js
// Uses Three.js to render the graph in a WebXR environment.
import * as THREE from "three";
import { VRButton } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/webxr/VRButton.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js";

export class XRGraphRenderer {
  constructor(root) {
    this.root = root;
    this.nodeObjects = [];
    this.linkObjects = [];
    this.init();
  }

  init() {
    // Create scene and camera.
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
    // Move the viewer further away on the z axis.
    this.camera.position.set(0, 0, 1200);

    // Create renderer and enable XR.
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.xr.enabled = true;
    document.body.appendChild(this.renderer.domElement);
    document.body.appendChild(VRButton.createButton(this.renderer));

    // Add OrbitControls for desktop fallback (works in XR mode as well).
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Group to hold all graph objects.
    this.graphGroup = new THREE.Group();
    this.scene.add(this.graphGroup);

    // Build the graph (nodes and links).
    this.createGraph();

    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  createGraph() {
    // Create node objects as small spheres.
    const nodeGeometry = new THREE.SphereGeometry(5, 16, 16);
    this.root.descendants().forEach(d => {
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
      const sphere = new THREE.Mesh(nodeGeometry, nodeMaterial);
      sphere.position.set(d.x, d.y, 0);
      sphere.userData = { data: d.data, hierarchy: d };
      this.graphGroup.add(sphere);
      this.nodeObjects.push(sphere);
    });

    // Create links between nodes as lines.
    const linkMaterial = new THREE.LineBasicMaterial({ color: 0x888888 });
    this.root.links().forEach(link => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        link.source.x, link.source.y, 0,
        link.target.x, link.target.y, 0
      ]);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const line = new THREE.Line(geometry, linkMaterial);
      this.graphGroup.add(line);
      this.linkObjects.push(line);
    });
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
