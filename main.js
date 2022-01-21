import * as THREE from "three";

import vertexShader from "./shaders/vertex.js";
import fragmentShader from "./shaders/fragment.js";

const canvas = document.querySelector("canvas");

const scene = new THREE.Scene();
const time = new THREE.Clock();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .0, 1000);
camera.position.z = .1;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,

})
renderer.setSize(window.innerWidth, window.innerHeight);

const uniforms = {
  u_time: { value: .0 },
  u_resolution: { value: {x: window.innerWidth, y: window.innerHeight} }
};

const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
})

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

renderer.render(scene, camera);

function animate() {
  plane.material.uniforms.u_time.value += time.getDelta();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  animate();
})

animate();