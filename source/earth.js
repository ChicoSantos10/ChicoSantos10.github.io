import * as THREE from 'three'
import { loadingManager } from './loadingManager.js'

export function createEarth(radius = 1) {
    const textureLoader = new THREE.TextureLoader(loadingManager)
    const earthTexture = textureLoader.load("../images/earth_texture.jpg")

    const detail = 60
    const earthGeo = new THREE.IcosahedronGeometry(radius, detail)
    const material = new THREE.MeshPhysicalMaterial({color: 0xffffff, map: earthTexture})
    return new THREE.Mesh(earthGeo, material)
}