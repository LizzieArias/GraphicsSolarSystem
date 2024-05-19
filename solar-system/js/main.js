import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import {OrbitControls, OribitControl} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Texture (Night sky with stars)
const textureLoader = new THREE.TextureLoader();

// All texture for all textures
const starTexture = textureLoader.load("./img/NightSky.png");


// Scene 
const scene = new THREE.Scene();

// CUBE BACKGROUND
const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubeTexture = cubeTextureLoader.load([
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture, 
]);
scene.background = cubeTexture;

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-50, 90, 150);

// Sunlight (POINT LIGHT)
const sunLight = new THREE.PointLight(0xffffff, 4, 300);
scene.add(sunLight);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);

// Perspective Control
const orbit = new OrbitControls(camera, renderer.domElement);

// Sun
const sun = new THREE.SphereGeometry(15, 50, 50);
// Add material using map: textureName, REPLACE WHAT IT IS CURRENTLY
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00});
const theSun = new THREE.Mesh(sun, sunMaterial);
scene.add(theSun);

// CREATE THE PATHS OR LIKE THE ORBITS
const orbitForPlanets = []; 
function lineForOrbits(radius, color, width) {
  const material = new THREE.LineBasicMaterial({
    color: color,
    linewidth: width,
  });
}
const geom = new THREE.BufferGeometry();
const lineOfOrbitsPoints = [];

// Make the points go in a circular motion
const numPoints = 100; // Estimated guess
for (let i = 0; i <= numPoints; i++) {
  const angle = (i / numPoints ) * Math.PI * 2;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  lineOfOrbitsPoints.push(x, 0, z);
}

geom.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(lineOfOrbitsPoints, 3)
);
const orbitLoop = new THREE.LineLoop(geom, material);
scene.add(orbitLoop);
orbitForPlanets.push(orbitLoop);



