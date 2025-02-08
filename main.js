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

const cover = document.querySelector(".cover")
const aboutMeButton = document.querySelector("#about-me-button")
const aboutMeSection = document.querySelector(".about-me")

aboutMeButton.addEventListener('click', toggleAboutMe)
cover.addEventListener('click', toggleAboutMe)

function toggleAboutMe() {
    cover.classList.toggle("hidden")
    aboutMeSection.classList.toggle("active");
}

const grids = document.querySelectorAll('.grid.snaps-inline')
grids.forEach((grid) => {
    const buttonRight = grid.querySelector('.scroll-button.right')
    const buttonLeft = grid.querySelector('.scroll-button.left')

    grid.querySelectorAll('.scroll-button').forEach( function ( e ) {
    e.onclick = function () {
        let direction
        if (e.classList.contains('right'))
            direction = 'right'
        else if (e.classList.contains('left'))
            direction = 'left'

        if (direction !== undefined)
            scroll(grid, direction)
    }
    })
    grid.onscroll = function (e) {
        grid.scrolling = true
        clearTimeout(grid.scrollTimer)
        grid.scrollTimer = setTimeout(function () {
            grid.scrolling = false
            buttonRight.classList.remove('moving')
            buttonLeft.classList.remove('moving')
        }, 100)

        if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth) {
            buttonRight.classList.add('hidden')
        } else if (grid.scrollLeft <= 0) {
            buttonLeft.classList.add('hidden')
        } else {
            buttonRight.classList.remove('hidden')
            buttonLeft.classList.remove('hidden')
        }

        buttonRight.classList.add('moving')
        buttonLeft.classList.add('moving')
    }
    function scroll(container, direction) {
        if (container.scrolling)
            return
        container.scrollLeft = container.scrollLeft + (direction === 'right' ? container.clientWidth : -container.clientWidth);
    }
})

const timelineButton = document.querySelector("#timeline-button")
document.querySelectorAll('.fullscreen-cover').forEach( function ( e ) {
    if(e.id === 'timeline-menu') {
        timelineButton.onclick = function () {
            e.classList.remove('hidden')
        }
        e.querySelector('.return').onclick = function () {
            e.classList.add('hidden')
        }
    }
})