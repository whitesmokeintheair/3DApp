const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/2 /window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const gridHelper = new THREE.GridHelper(360, 20);

let figurePosition = new THREE.Vector3(12, 12, 12);
let currentFigure;
const sceneHTML = document.getElementById('scene');
sceneHTML.appendChild(renderer.domElement);

render = () => { 
  renderer.render(scene, camera); 
};

const renderScene = () =>{
  scene.background = new THREE.Color( 0x1a1b1f )

  renderer.setSize( window.innerWidth/2, window.innerHeight);
  
  gridHelper.colorGrid = 0xE8E8E8;
  scene.add( gridHelper );
  
  camera.position.set( 150, 50, 15 );
  camera.lookAt( figurePosition );
  
  render();
}

const renderSphere = (radius) =>{
  clearScene();
  const widthSegments = 32;
  const heightSegments = 32;
  let geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  let material = new THREE.MeshNormalMaterial();
  let sphere = new THREE.Mesh(geometry, material);
  currentFigure = sphere;
  figurePosition = new THREE.Vector3(12, gridHelper.position.y + radius, 12);
  sphere.position.copy(figurePosition);
  scene.add(sphere);
  render();
}

const renderCube = (width, height, depth) =>{
  clearScene();
  let geometry = new THREE.BoxGeometry(width, height, depth);
  let material = new THREE.MeshNormalMaterial();
  let cube = new THREE.Mesh(geometry, material);
  currentFigure = cube;
  figurePosition = new THREE.Vector3(12, gridHelper.position.y + height/2, 12);
  cube.position.copy(figurePosition);
  scene.add(cube);
  render();
}

const renderPyramid = (radius, height, angleQuantity) =>{
  clearScene();
  let geometry = new THREE.ConeGeometry(radius, height, angleQuantity);
  let material = new THREE.MeshNormalMaterial();
  let pyramid = new THREE.Mesh(geometry, material);
  currentFigure = pyramid;
  figurePosition = new THREE.Vector3(12, gridHelper.position.y + height/2, 12);
  scene.add(pyramid);
  pyramid.position.copy(figurePosition);
  render();
}

const clearScene = () =>{
  scene.remove(currentFigure);
}