// layer colors
var colors = {};
	colors['red'] = '#f00';
	colors['redorange'] = '#f50';
	colors['orange'] = '#ff6b00';
	colors['yelloworange'] = '#ff9500';
	colors['yellow'] = '#fc0';

// layers
var mercuryLayers = [ '5,darkblue', '5,lightblue', '1,yellow', '2,orange' ];
var venusLayers = [ '5,darkblue', '5,lightblue', '1,yellow', '2,orange' ];
//var earthLayers = [ '2,red', '3,redorange', '5,orange', '3,yelloworange', '2,yellow' ];
var earthLayers = [ '2,red', '2,yellow' ];
var marsLayers = [ '5,darkblue', '5,lightblue', '1,yellow', '2,orange' ];

// set up render
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x334ca5 );
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var canvas = document.querySelector('#myCanvas');
var renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );

document.querySelector('section').appendChild(renderer.domElement);

// group of everything
var group = new THREE.Group();

// keep the same loader and img
var loader = new THREE.TextureLoader();
var imageURLs = ['img/mercury.png', 'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57735/land_ocean_ice_cloud_2048.jpg']

// build layers
for (var i = 0; i < earthLayers.length; i++) {
	loader.load(imageURLs[i], function(texture){
		layer = new THREE.Group();
		sphere = new THREE.SphereGeometry(2.5, 50, 50);
		material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
		mesh = new THREE.Mesh(sphere, material);
		mesh.material.transparent = true;
		if (i == 0) {
			mesh.scale.set(1,1,1);
		}
		if (i == 1) {
			mesh.scale.set(1,0.8,0.8);
		}
		//XYscale = 1.0 - Number('.' + String(i));
		//mesh.scale.set(1,XYscale,XYscale);
		layer.add(mesh);
		group.add(mesh); // note: children added on top of list (new child is index 0)
	});
}
scene.add(group);

camera.position.z = 5;

const pointLight = new THREE.PointLight(0xFFFFFF);

pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 400;

scene.add(pointLight);

function animate() {
	requestAnimationFrame(animate);

	group.rotation.x += 0.0001;
	group.rotation.y += 0.0025;

	renderer.render(scene, camera);
}
animate();

// interaction
var button = document.querySelector('#myButton');
button.addEventListener('click', changeOpacity);

function changeOpacity() {
	group.children[1].material.transparent = true;
	group.children[1].material.opacity = .15;
}