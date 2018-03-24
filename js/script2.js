// layer colors
var colors = {};
	colors['red'] = '#f00';
	colors['redorange'] = '#f50';
	colors['orange'] = '#ff6b00';
	colors['yelloworange'] = '#ff9500';
	colors['yellow'] = '#fc0';

// layers
var layers = {};

var mercuryLayers = [ '5,darkblue', '5,lightblue', '1,yellow', '2,orange' ];
layers['Mercury'] = mercuryLayers;

var venusLayers = [ '5,darkblue', '5,lightblue', '1,yellow', '2,orange' ];
layers['Venus'] = venusLayers;

var earthLayers = [ '2,red', '3,redorange', '5,orange', '3,yelloworange', '2,yellow' ];
layers['Earth'] = earthLayers;

var marsLayers = [ '5,darkblue', '5,lightblue', '1,yellow', '2,orange' ];
layers['Mars'] = marsLayers;

// set up render
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var canvas = document.querySelector('#myCanvas');
var renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );

document.querySelector('section').appendChild(renderer.domElement);

// create objects

// group of everything
var group = new THREE.Group();

// groups for individual layers (need to be group bc geom + texture)
var layer1 = new THREE.Group(); // 1 is outside, higher # is deeper within
var layer2 = new THREE.Group();

var loader = new THREE.TextureLoader();
var imgURL = 'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57735/land_ocean_ice_cloud_2048.jpg'
loader.load(imgURL, function(texture){
	sphere1 = new THREE.SphereGeometry(2, 35, 35); // radius, segments, rings
	sphere2 = new THREE.SphereGeometry(1.5, 25, 25); // radius, segments, rings

	material1 = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
	material1.needsUpdate = true; // not sure if necessary
	material2 = new THREE.MeshBasicMaterial({color: 0x00ff00});

	mesh1 = new THREE.Mesh(sphere1, material1);
	mesh2 = new THREE.Mesh(sphere2, material2);

	layer1.add(mesh1);
	layer2.add(mesh2);
});

group.add(layer1, layer2);
scene.add(group);

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);

	group.rotation.x += 0.001;
	group.rotation.y += 0.0025;

	renderer.render(scene, camera);
}
animate();

// interaction
var button = document.querySelector('#myButton');
button.addEventListener('click', changeOpacity);

function changeOpacity() {
	layer1.children[0].material.transparent = true;
	layer1.children[0].material.opacity = .15;
}