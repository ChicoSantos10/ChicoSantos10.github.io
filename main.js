import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js';
import {LoadScene, OnMouseMove, RenderScenes, ResizeScenes} from "./source/sceneManager";
import {mainMenuScene} from "./source/mainMenuScene";

// TODO: Make sure that only display when webgl is available
if ( !WebGL.isWebGL2Available() ) {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.prepend( renderer.domElement );

LoadScene(mainMenuScene)

function render() {
    RenderScenes(renderer)
}
renderer.setAnimationLoop( render );

window.addEventListener('resize', function () {
    ResizeScenes()
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

renderer.domElement.addEventListener('mousemove', OnMouseMove, false);
