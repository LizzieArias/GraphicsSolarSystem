import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui';

// Loader for the textures
const loader = new THREE.TextureLoader();

// All texture for all textures
const sunTexture = loader.load("./src/img/sun.jpeg");
const mercuryTexture = loader.load("./src/img/mercury.jpg");
const earthTexture = loader.load("./src/img/earth.jpg");
const venusTexture = loader.load("./src/img/venus.jpg");
const marsTexture = loader.load("./src/img/mars.jpg");
const jupiterTexture = loader.load("./src/img/jupiter.jpg");
const saturnTexture = loader.load("./src/img/saturn.jpg");
const uranusTexture = loader.load("./src/img/uranus.jpg");
const neptuneTexture = loader.load("./src/img/neptune.jpg");
const plutoTexture = loader.load("./src/img/pluto.jpg");
const saturnRingTexture = loader.load("./src/img/saturn_ring.png");
const uranusRingTexture = loader.load("./src/img/uranus_ring.png");

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene 
const scene = new THREE.Scene();

// star/Particle System
const starGeo = new THREE.BufferGeometry();
const stars = 3000;
const vertices = new Float32Array(stars * 3);

for(let i = 0; i < stars * 100; i++){
  vertices[i] = (Math.random() - 0.5) * 800;
}

starGeo.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(vertices, 3)
);

const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('./src/img/star.png');

const particlesMaterial = new THREE.PointsMaterial({
  map: particleTexture,
  size: 0.5,
  sizeAttenuation: true,
});

const starsGenerator = new THREE.Points(starGeo, particlesMaterial);
scene.add(starsGenerator);

// Galaxy(milkyWay part 1) Particle Effect
const galaxyGeo = new THREE.BufferGeometry();
const galaxy = 5000;
const vert = new Float32Array(galaxy * 3);
const radius = 125;

for(let i = 0; i < galaxy * 100; i += 3){
  const angle = Math.random() * Math.PI * 2;
  const distance = radius + (Math.random() - 0.5) * 200;
  const x = Math.cos(angle) * distance;
  const z = Math.sin(angle) * distance;

  vert[i] = x;
  vert[i + 1] = 0;
  vert[i + 2] = z;
}

galaxyGeo.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(vert, 3)
);

const galaxyLoader = new THREE.TextureLoader();
const galaxyTexture = galaxyLoader.load('./src/img/galaxy.png');

const galaxyMaterial = new THREE.PointsMaterial({
  map: galaxyTexture,
  size: 0.5,
  sizeAttenuation: true,
});

const galaxyGenerator = new THREE.Points(galaxyGeo, galaxyMaterial);
scene.add(galaxyGenerator);

// Galaxy(milky way part 2) Particle Effect
const milkWayGeo = new THREE.BufferGeometry();
const milkyWay = 3000;
const vert2 = new Float32Array(milkyWay * 3);

for(let i = 0; i < milkyWay * 100; i += 3){
  const angle = Math.random() * Math.PI * 2;
  const distance = radius + (Math.random() - 0.5) * 200;
  const x = Math.cos(angle) * distance;
  const z = Math.sin(angle) * distance;

  vert2[i] = x;
  vert2[i + 1] = 0;
  vert2[i + 2] = z;
}

milkWayGeo.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(vert2, 3)
);

const milkyWayLoader = new THREE.TextureLoader();
const milkyWayTexture = milkyWayLoader.load('./src/img/galaxy2.png');

const milkyWayMaterial = new THREE.PointsMaterial({
  map: milkyWayTexture,
  size: 1,
  sizeAttenuation: true,
});

const milkyWayGenerator = new THREE.Points(milkWayGeo, milkyWayMaterial);
scene.add(milkyWayGenerator);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-50, 90, 150);

// Perspective Control
const orbit = new OrbitControls(camera, renderer.domElement);

// Sun
const sun = new THREE.SphereGeometry(15, 50, 50);
// Add material using map: textureName
const sunMaterial = new THREE.MeshBasicMaterial({ 
  map: sunTexture,
});
const theSun = new THREE.Mesh(sun, sunMaterial);
scene.add(theSun);

// Sunlight (POINT LIGHT)
const sunLight = new THREE.PointLight(0xffffff, 3, 300);
scene.add(sunLight);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);

// CREATE THE PATHS/ORBITS of each planet
const orbitForPlanets = []; 
function lineForOrbits(radius, col, width) {
  const material = new THREE.LineBasicMaterial({
    color: col,
    linewidth: width,
  });

  const geom = new THREE.BufferGeometry();
  const lineOfOrbitsPoints = [];

  // Make the points go in a circular motion
  const numPoints = 100;
  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints ) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    lineOfOrbitsPoints.push(x, 0, y);
  }

  geom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(lineOfOrbitsPoints, 3)
  );

  const orbitLoop = new THREE.LineLoop(geom, material);
  scene.add(orbitLoop);
  orbitForPlanets.push(orbitLoop);
}

// Creation of planets
const generate = (size, planetTexture, x, ring) => {
  const planetGeom = new THREE.SphereGeometry(size, 50, 50);
  const planetMat = new THREE.MeshBasicMaterial({
    map: planetTexture,
  });
  const planet = new THREE.Mesh(planetGeom, planetMat);
  const planetObj = new THREE.Object3D();
  planet.position.set(x, 0, 0);
  if(ring){
    const ringGeometry = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: ring.ringmat,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    planetObj.add(ringMesh);
    ringMesh.position.set(x, 0, 0);
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(planetObj);
  planetObj.add(planet);
  lineForOrbits(x, 0xffffff, 3);
  return{
    planetObj: planetObj,
    planet: planet,
  };
};

const planets = [
  {
    ...generate(3.2, mercuryTexture, 28),
    rotaing_speed_around_sun: 0.004,
    self_rotation_speed: 0.004,
  },
  {
    ...generate(5.8, venusTexture, 44),
    rotaing_speed_around_sun: 0.015,
    self_rotation_speed: 0.002,
  },
  {
    ...generate(6, earthTexture, 62),
    rotaing_speed_around_sun: 0.01,
    self_rotation_speed: 0.02,
  },
  {
    ...generate(4, marsTexture, 78),
    rotaing_speed_around_sun: 0.008,
    self_rotation_speed: 0.018,
  },
  {
    ...generate(12, jupiterTexture, 100),
    rotaing_speed_around_sun: 0.002,
    self_rotation_speed: 0.04,
  },
  {
    ...generate(10, saturnTexture, 138, {
      innerRadius: 10,
      outerRadius: 20,
      ringmat: saturnRingTexture,
    }),
    rotaing_speed_around_sun: 0.0009,
    self_rotation_speed: 0.038,
  },
  {
    ...generate(7, uranusTexture, 176, {
      innerRadius: 7,
      outerRadius: 12,
      ringmat: uranusRingTexture,
    }),
    rotaing_speed_around_sun: 0.0004,
    self_rotation_speed: 0.03,
  },
  {
    ...generate(7, neptuneTexture, 200),
    rotaing_speed_around_sun: 0.0001,
    self_rotation_speed: 0.032,
  },
  {
    ...generate(2.8, plutoTexture, 216),
    rotaing_speed_around_sun: 0.0007,
    self_rotation_speed: 0.008,
  },
];

//GUI
const gui = new GUI();
const options = {
  "Real view": true,
  "Show path": true,
  speed: 0,
};
gui.add(options, "Real view").onChange((e) => {
  ambientLight.intensity = e ? 0 : 0.5;
});
gui.add(options, "Show path").onChange((e) => {
  orbitForPlanets.forEach((dpath) => {
    dpath.visible = e;
  });
});
const maxSpeed = new URL(window.location.href).searchParams.get("ms")*1;
gui.add(options, "speed", 0, maxSpeed?maxSpeed:20);

// Animate function
function animation(time) {
  theSun.rotateY(options.speed * 0.004);
  // For each planet....
  planets.forEach(
    ({ planetObj, planet, rotaing_speed_around_sun, self_rotation_speed }) => {
      planetObj.rotateY(options.speed * rotaing_speed_around_sun);
      planet.rotateY(options.speed * self_rotation_speed);
      galaxyGenerator.rotation.y += (options.speed * rotaing_speed_around_sun) * 0.04;
      milkyWayGenerator.rotation.y += (options.speed * rotaing_speed_around_sun) * 0.04;
    }
  );
  
  //orbit.update();
  starsGenerator.rotation.y += -0.0005;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animation);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});