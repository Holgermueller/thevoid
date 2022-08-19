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

const geometry = new THREE.TorusGeometry(9.956, 4, 30, 200);
const material = new THREE.MeshLambertMaterial({
  color: 0xeef0f2,
  opacity: 1,
  depthTest: true,
  depthWrite: true,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(5, 5, 5);
//const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight);

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 12, 12);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStars);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();

const countDownDate = new Date("Aug 9, 2023").getTime();

const x = setInterval(function () {
  let now = new Date().getTime();

  let difference = countDownDate - now;

  let days = Math.floor(difference / (1000 * 60 * 60 * 24));

  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("theCountdown").innerHTML =
    days +
    " days: " +
    hours +
    " hours: " +
    minutes +
    " minutes: " +
    seconds +
    " seconds";

  if (difference < 0) {
    clearInterval(x);
    document.getElementById("theCountdown").innerHTML = "TIME'S UP!!";
  }
}, 1000);
