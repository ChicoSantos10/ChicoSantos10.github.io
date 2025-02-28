import * as THREE from "three";

export default class Starfield {
    constructor(numStars = 500)
    {
        const textureLoader = new THREE.TextureLoader();
        const starTexture = textureLoader.load("textures/star_texture.png");

        this.vertices = [];
        this.colors = [];
        this.positions = [];

        let col;
        for (let i = 0; i < numStars; i += 1) {
            let p = this.randomSpherePoint();
            const { pos, hue } = p;
            this.positions.push(p);
            col = new THREE.Color().setHSL(hue, Math.random() / 2, Math.random());
            this.vertices.push(pos.x, pos.y, pos.z);
            this.colors.push(col.r, col.g, col.b);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(this.vertices, 3));
        geo.setAttribute("color", new THREE.Float32BufferAttribute(this.colors, 3));
        const mat = new THREE.PointsMaterial({
            vertexColors: true,
            map: starTexture,
            transparent: true,
            opacity: 0.85
        });
        this.points = new THREE.Points(geo, mat);
    }

    randomSpherePoint() {
        const radius = Math.random() * 100 + 10;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        let x = radius * Math.sin(phi) * Math.cos(theta);
        let y = radius * Math.sin(phi) * Math.sin(theta);
        let z = radius * Math.cos(phi);

        return {
            pos: new THREE.Vector3(x, y, z),
            hue: Math.random(),
            minDist: radius,
        };
    }

    update() {
        this.points.material.size = 0.3 + Math.random() * 0.08
    }
}