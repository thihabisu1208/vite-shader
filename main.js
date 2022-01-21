import * as THREE from "three";

import vertexShader from "./shaders/vertex.js";
import fragmentShader from "./shaders/fragment.js";

const canvas = document.querySelector("canvas"),
  scene = new THREE.Scene(),
  time = new THREE.Clock(),
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .0, 1000),
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  }),
  uniforms = {
    u_time: { value: .0 },
    u_resolution: { value: {x: window.innerWidth, y: window.innerHeight} }
  };

const geometry = new THREE.PlaneGeometry(2, 2),
  material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  }),
  plane = new THREE.Mesh(geometry, material);

scene.add(plane);

camera.position.z = .1;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

function animate() {
  plane.material.uniforms.u_time.value += time.getDelta();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  plane.material.uniforms.u_resolution.value.x = window.innerWidth;
  plane.material.uniforms.u_resolution.value.y = window.innerHeight;
  
  camera.aspect = 1;
  camera.updateProjectionMatrix();
})

animate();