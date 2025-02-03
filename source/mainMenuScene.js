import * as THREE from "three";
import Starfield from "./starfield";
import {createEarth} from "./earth";
import {Text} from "troika-three-text";
import {testshader} from "../shaders/testshader";
import {MainMenuOption} from "./mainMenu";
import {Scene} from "./scene";
import {raycaster} from "./sceneManager";

export const mainMenuScene = new Scene()

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.05 );
mainMenuScene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 2)
sunLight.position.x = -0.5;
sunLight.position.y = 0.35;
mainMenuScene.add( sunLight );

const stars = new Starfield()
mainMenuScene.objects.push(stars)
mainMenuScene.scene.add(stars.points)

const earth = createEarth(1.5);
earth.position.y = -0.5
earth.position.x = 1.5
mainMenuScene.scene.add(earth)

earth.add(stars.points)

sunLight.target = earth

// Create:
const title = new Text()
mainMenuScene.scene.add(title)

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
    const option = new MainMenuOption(menuOptionsName[i], i, mainMenuScene)
    menuOptions.push(option)
    mainMenuScene.add(option)
    option.sync()
}

mainMenuScene.camera.position.z = 5;

mainMenuScene.onUpdate = () => {
    earth.rotation.y += 0.005
    stars.points.rotation.y -= 0.003;
}

let hoveredObject = undefined
mainMenuScene.onMouseMove = (mouse) => {

    raycaster.setFromCamera(mouse, mainMenuScene.camera);

    const intersects = raycaster.intersectObject(mainMenuScene.scene, true);

    if (intersects.length > 0) {

        const object = intersects[0].object;

        if (object !== hoveredObject) {
            object.onHoverStart?.()
            if(hoveredObject)
                hoveredObject.onHoverEnd?.()
        }

        hoveredObject = object

        return true
    }
    else if(hoveredObject) {
        hoveredObject.onHoverEnd?.()
        hoveredObject = undefined
    }

    return false
}
