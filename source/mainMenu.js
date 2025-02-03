import { Text } from 'troika-three-text'
import {BoxGeometry, Mesh} from "three";
import { Line2 } from 'three/addons/lines/Line2.js';
import * as THREE from "three";
import {LineGeometry, LineMaterial, LineSegmentsGeometry} from "three/addons";

export class MainMenuOption extends Text {
    constructor(name, index) {
        super();
        this.text = name
        this.font = 'fonts/BonaNovaSC-Regular.ttf'
        this.fontSize = 0.2
        this.name = 'highlight'

        this.position.z = 1
        this.position.x = -5
        this.position.y = -index*0.5
        this.anchorX = "left"
        this.anchorY = "middle"

        this.color = 0xFF4DCC
        this.outlineColor = 0x631A86
        this.outlineWidth = 0.01
        this.outlineBlur = 0.1

        this.strokeWidth = 0.01
        this.strokeColor = 0xF8F991

        this.underline = {

        }

        this.sync()
    }

    onHoverStart() {
        this.textIndent = 0.2
        this.sync()

        const points = [];
        const height = -0.1
        const width = this.text.length * 0.1
        const start = 0.2

        points.push( new THREE.Vector3( start, height, 0 ) );
        points.push( new THREE.Vector3(  start + width, height, 0 ) );

        const geometry = new LineGeometry().setFromPoints(points)
        const material = new LineMaterial( { color: 0xFF4DCC } );
        material.linewidth = 2
        this.underline = new Line2( geometry, material );
        this.underline.position.x = 0
        this.underline.position.y = height
        this.add(this.underline)
    }
    onHoverEnd() {
        this.textIndent = 0
        this.sync()
        this.underline.geometry.dispose()
        this.underline.material.dispose()
        this.remove(this.underline)
    }
}