import * as BABYLON from 'babylonjs'

const BASE_WIDTH = window.innerWidth / 2.0;
const BASE_HEIGHT = window.innerHeight / 2.0;



const BASE_SIZE = 20
const HERO_SIZE = 1

export default function base() {

    const canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");

    canvas.width = BASE_WIDTH;
    canvas.height = BASE_HEIGHT;

    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);


    //туман
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.05;


    const cameraPosition = new BABYLON.Vector3(BASE_SIZE / 2, BASE_SIZE / 4, 0)
    const camera = new BABYLON.ArcRotateCamera("camera", 3 * Math.PI / 2, 11 * Math.PI / 16, 20, cameraPosition, scene);
    camera.attachControl(canvas, false)

    //иногда ниобходимо чтобы при виде сверху не пропадали элементы
    camera.minZ = 0.1;



    const light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(5, 0, 20), scene);
    light.position = new BABYLON.Vector3(BASE_SIZE + 1, BASE_SIZE + 1, -BASE_SIZE)

    const floor = BABYLON.Mesh.CreateBox("floor", BASE_SIZE, scene);
    floor.scaling.z = 0.025;
    floor.position = new BABYLON.Vector3(BASE_SIZE / 2, BASE_SIZE / 2, 0);


    const floorMaterial = new BABYLON.StandardMaterial("floorMaterial", scene);
    floor.material = floorMaterial;

    addHeroes(BASE_SIZE / 2, HERO_SIZE / 2, -0.70, BABYLON.Color3.Red(), scene)

    addHeroes(BASE_SIZE / 2, BASE_SIZE - HERO_SIZE / 2, -0.70, BABYLON.Color3.Blue(), scene)


    // floor.diffuseColor = new BABYLON.Color3(0.45 + randomColorOffset, 0.45 + randomColorOffset, 0.45 + randomColorOffset);

    engine.runRenderLoop(() => {
        scene.render();
    })
}


function addHeroes(x, y, z, colour, scene) {
    var heroOne = BABYLON.Mesh.CreateBox("heroOne", HERO_SIZE, scene);
    heroOne.position = new BABYLON.Vector3(x, y, z);

    var heroOneMaterial = new BABYLON.StandardMaterial("heroMaterial", scene);
    heroOneMaterial.diffuseColor = colour;

    heroOne.material = heroOneMaterial;
}

function addWalls(scene) {

}

function moveHeroes(scene) {

}

function moveWalls(scene) {

}