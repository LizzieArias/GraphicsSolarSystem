import * as THREE from 'three';
// import {OribitControl} from 'three/examples/jsm/controls/OrbitControls.js';
import theTextures from './src/img/NightSky.png';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.scene();

const camera = new THREE.PerspectiveCamera([

  45, 
  window.innerWidth/window.innerHeight,
  0.1,
  1000
]);

// Background - image
// const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextureLoader.load([
//   theTextures, 
//   theTextures,
//   theTextures, 
//   theTextures,
//   theTextures, 
//   theTextures,
// ]);

function animate() {
  renderer.render(scene,camera); 
}

renderer.setAnimationLoop(animate);

