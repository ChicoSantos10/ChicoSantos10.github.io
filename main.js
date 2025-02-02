import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js';
import { Text } from 'troika-three-text'
import {testshader} from '/shaders/testshader.js'
import {MainMenuOption} from "./classes/mainMenu";
import {createEarth} from "./classes/earth";
import Starfield from "./classes/starfield";
import {color} from "three/tsl";

// TODO: Make sure that only display when webgl is available
if ( !WebGL.isWebGL2Available() ) {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.prepend( renderer.domElement );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.05 );
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 2)
sunLight.position.x = -0.5;
sunLight.position.y = 0.35;
scene.add( sunLight );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const stars = new Starfield()
scene.add(stars.points)

const earth = createEarth(1.5);
earth.position.y = -0.5
earth.position.x = 1.5
scene.add(earth)

earth.add(stars)

sunLight.target = earth

// Create:
const title = new Text()
scene.add(title)

// Set properties to configure:
title.text = 'Francisco Santos'
title.font = 'fonts/BonaNovaSC-Regular.ttf'
title.fontSize = 1

title.position.z = 1
title.position.y = 2
title.anchorX = "center"
title.anchorY = "middle"

title.color = 0xFF4DCC
title.outlineColor = 0x631A86
title.outlineWidth = 0.01
title.outlineBlur = 0.1

title.strokeWidth = 0.01
title.strokeColor = 0xF8F991

const shader = testshader;
title.material = new THREE.ShaderMaterial({
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
});

// Update the rendering:
title.sync()

const menuOptionsName = ['About', 'Career', 'Education', 'Socials', ]
const menuOptions = []
for (let i = 0; i < menuOptionsName.length; i++) {
    const option = new MainMenuOption(menuOptionsName[i], i, scene)
    menuOptions.push(option)
    scene.add(option)
    option.sync()
}

camera.position.z = 5;

function animate() {
    earth.rotation.y += 0.005;
    stars.points.rotation.y += 0.001;
    stars.update()
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

let hoveredObject = undefined
const onMouseMove = async (event) => {

    event.preventDefault();

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0) {

        const object = intersects[0].object;

        if (object !== hoveredObject) {
            object.onHoverStart?.()
            if(hoveredObject)
                hoveredObject.onHoverEnd?.()
        }

        hoveredObject = object
    }
    else if(hoveredObject) {
        hoveredObject.onHoverEnd?.()
        hoveredObject = undefined
    }

}
renderer.domElement.addEventListener('mousemove', onMouseMove, false);
