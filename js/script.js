var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); // field of view (extent of scene on display at given moment, value in degrees); aspect ratio (almost always width/height); near and far clipping plane

var canvas = document.querySelector('#myCanvas');
var renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );

document.querySelector('section').appendChild( renderer.domElement );

// group to hold sphere and texture meshed together
const globe = new THREE.Group();
scene.add(globe);

var sphere, material, mesh;

var loader = new THREE.TextureLoader();
loader.load('https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57735/land_ocean_ice_cloud_2048.jpg', function(texture) {
    // create sphere
    sphere = new THREE.SphereGeometry(2, 32, 32); // radius, segments, rings

    // map texture to material
    material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
    material.needsUpdate = true;

    // create new mesh w/ sphere geom
    mesh = new THREE.Mesh(sphere, material);

    // add mesh to globe
    globe.add(mesh);
});


camera.position.z = 5;

// redraw every time the screen is refreshed (60 times/s)
// pauses when user navigates to diff tab
function animate() {
    requestAnimationFrame( animate );

    // rotation animation
    globe.rotation.x += 0.001;
    globe.rotation.y += 0.0025;
    
    renderer.render( scene, camera );
}
animate();

var toggleButton = document.getElementById('myButton');

toggleButton.addEventListener('click', changeBg);

var imageURL = 'https://images.unsplash.com/photo-1492553397175-5f7ec0158903?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f13108c72f87cf399a55260c6596694a&auto=format&fit=crop&w=1050'

function changeBg() {
    loader.load(imageURL, function(texture) {
        // map texture to material
        material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

        // create new mesh w/ sphere geom
        mesh = new THREE.Mesh(sphere, material);

        // add mesh to globe
        globe.add(mesh);
    });
}