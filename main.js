import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry(9.956, 3, 300, 20, 2, 3);
const material = new THREE.MeshLambertMaterial({
  color: 0x049ef4,
  opacity: 1,
  depthTest: true,
  depthWrite: true,
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const pointlight = new THREE.PointLight(0x000000);
pointlight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0x000000);
scene.add(pointlight, ambientLight);

function animate() {
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
