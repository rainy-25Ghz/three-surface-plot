// Import stylesheets
import './style.css';

import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three/src/math/Vector3';

//配置webgl渲染器
const aspectRatio = window.innerWidth / window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x0000000);
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

camera.position.z = -10;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

//绘制余弦曲面
const computeY = (x: number, z: number) => {
  return 20 - (x ** 2 + z ** 2) / 10;
};
const step_x = 0.5;
const step_z = 0.5;
const drawCell = (points: number[][]) => {
  const p0 = points[0]; //左下角
  const p1 = points[1]; //右下角
  const p2 = points[2]; //左上角
  const p3 = points[3]; //右上角
  const positions = [...p0, ...p1, ...p2, ...p3];
  const uvs = [...[0, 0], ...[1, 0], ...[0, 1], ...[1, 1]];
  const colors = points.map((val, index) => {});
  const geometry = new THREE.BufferGeometry();
  const positionNumComponents = 3;
  const uvNumComponents = 2;
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
      new Float32Array(positions),
      positionNumComponents
    )
  );
  geometry.setAttribute(
    'uv',
    new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
  );
  geometry.computeVertexNormals();
  geometry.setIndex([0, 1, 2, 2, 1, 3]);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  scene.add(mesh);
  const wireframe = new THREE.WireframeGeometry(geometry);

  const line = new THREE.LineSegments(wireframe);
  line.material.depthTest = false;
  line.material.opacity = 0.25;
  line.material.transparent = true;

  scene.add(line);
};

for (let i = -10; i < 10; i += step_x) {
  for (let j = -10; j < 10; j += step_z) {
    const p0 = [i, computeY(i, j), j];
    const p2 = [i + step_x, computeY(i + step_x, j), j];
    const p1 = [i, computeY(i, j + step_z), j + step_z];
    const p3 = [i + step_x, computeY(i + step_x, j + step_z), j + step_z];
    drawCell([p0, p1, p2, p3]);
  }
}

//设置几何
// const geometry = new ParametricGeometry(
//   (u, v, target) => {
//     // console.log(u, v, target);
//     //sin(sqrt(a*x^2  + b*y^2))
//     target.set(u, v, Math.sin(u * v));
//   },
//   25,
//   25
// );
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const surface = new THREE.Mesh(geometry, material);
const pts = [
  [-10, 0, -10],
  [-10, 0, 10],
  [10, 0, -10],
  [10, 0, 10],
];
drawCell(pts);
// scene.add(surface);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};
animate();
