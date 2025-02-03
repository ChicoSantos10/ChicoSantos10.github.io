import * as THREE from "three";

export const raycaster = new THREE.Raycaster()
const scenes = []

export function LoadScene(scene, index = undefined) {
    if(scenes.includes(scene))
        return

    if(index === undefined || index < 0)
        scenes.push(scene)
    else {
        scenes.splice(index, 0, scene)
    }
}

export function UnloadScene(scene) {
    scenes.remove(scene)
}

export function RenderScenes(renderer) {
    for (let scene of scenes) {
        scene.render(renderer)
    }
}

export const OnMouseMove = async (event) => {

    event.preventDefault();

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    for (const scene of scenes) {
        if(scene.onMouseMove(mouse))
            break
    }
}

export function ResizeScenes() {
    for (const scene of scenes) {
        scene.camera.aspect = window.innerWidth / window.innerHeight;
        scene.camera.updateProjectionMatrix();
    }
}