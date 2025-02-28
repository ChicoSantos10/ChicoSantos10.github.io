import * as THREE from 'three';

export class Scene {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.objects = []
        this.onUpdate = null
        this.onClick = null
        this.onMouseMove = null
    }

    onLoad() {

    }

    add(obj) {
        this.objects.push( obj );
        this.scene.add( obj );
    }

    render(renderer) {
        this.objects.forEach(object => {
            object.update?.();
        })

        this.onUpdate?.()

        renderer.render(this.scene, this.camera)
    }
}