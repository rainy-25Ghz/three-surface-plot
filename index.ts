// Import stylesheets
import './style.css';

import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';

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
camera.position.set(200, 200, 200);

const scene = new THREE.Scene();
const geometry = new ParametricGeometry(
  (u, v, target) => {
    console.log(u, v, target);
    //sin(sqrt(a*x^2  + b*y^2))
    target = new THREE.Vector3(u, v, Math.sin(Math.sqrt(u * u + v * v)));
  },
  25,
  25
);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const surface = new THREE.Mesh(geometry, material);
scene.add(surface);


const animate=()=>{
  renderer.render(scene,camera);
}
