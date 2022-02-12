// Import stylesheets
import './style.css';

import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//配置webgl渲染器
const aspectRatio = window.innerWidth / window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//设置相机为正交投影
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  0.1,
  1000
);
camera.lookAt(0, 0, 0);
const scene = new THREE.Scene();
//设置几何
const geometry = new ParametricGeometry(
  (u, v, target) => {
    // console.log(u, v, target);
    //sin(sqrt(a*x^2  + b*y^2))
    target.set(u, v, Math.sin(Math.sqrt(u * u + v * v)));
  },
  25,
  25
);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const surface = new THREE.Mesh(geometry, material);
scene.add(surface);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};
animate();
