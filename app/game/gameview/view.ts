import * as BABYLON from 'babylonjs'

const BASE_WIDTH = window.innerWidth / 2.0;
const BASE_HEIGHT = window.innerHeight / 2.0;


const BASE_SIZE = 10
// const NUMBER_BASE_SIZE_IN_FLOOR = 17;

export default function base() {

    const canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");

    canvas.width = BASE_WIDTH;
    canvas.height = BASE_HEIGHT;

    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);


    // //туман
    // scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    // scene.fogDensity = 0.05;


    const cameraPosition = new BABYLON.Vector3(BASE_SIZE * 8, 0, BASE_SIZE * 8)
    const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 200, cameraPosition, scene);
    camera.attachControl(canvas, false)

    //иногда ниобходимо чтобы при виде сверху не пропадали элементы
    camera.minZ = 0.1;



    const light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, -BASE_SIZE * 8, 0), scene);
    light.position = new BABYLON.Vector3(BASE_SIZE * 8, -BASE_SIZE * 8, BASE_SIZE * 8)


    const x = BABYLON.MeshBuilder.CreateBox("x", { width: BASE_SIZE * 10, height: 0.1, depth: 0.1 }, scene);
    const xMaterial = new BABYLON.StandardMaterial("xMaterial", scene);
    xMaterial.diffuseColor = BABYLON.Color3.Red();
    x.material = xMaterial;
    x.position = new BABYLON.Vector3(BASE_SIZE * 5, 0, 0);


    const y = BABYLON.MeshBuilder.CreateBox("y", { width: 0.1, height: BASE_SIZE * 10, depth: 0.1 }, scene);
    const yMaterial = new BABYLON.StandardMaterial("yMaterial", scene);
    yMaterial.diffuseColor = BABYLON.Color3.Blue();
    y.material = yMaterial;
    y.position = new BABYLON.Vector3(0, BASE_SIZE * 5, 0);


    const z = BABYLON.MeshBuilder.CreateBox("z", { width: 0.1, height: 0.1, depth: BASE_SIZE * 10 }, scene);
    const zMaterial = new BABYLON.StandardMaterial("zMaterial", scene);
    zMaterial.diffuseColor = BABYLON.Color3.Green();
    z.material = zMaterial;
    z.position = new BABYLON.Vector3(0, 0, BASE_SIZE * 5);







    const floor = BABYLON.MeshBuilder.CreateBox("floor", { width: BASE_SIZE * 17, height: BASE_SIZE / 4, depth: BASE_SIZE * 17 }, scene);
    floor.position = new BABYLON.Vector3(BASE_SIZE * 8, 0, BASE_SIZE * 8);


    const floorMaterial = new BABYLON.StandardMaterial("floorMaterial", scene);
    floor.material = floorMaterial;

    // BASE_SIZE / 8 + BASE_SIZE / 2 - ширина поля+ширина квадрата пополам
    addHeroes(8 * BASE_SIZE, BASE_SIZE / 8 + BASE_SIZE / 2, 0, BABYLON.Color3.Red(), scene)

    addHeroes(8 * BASE_SIZE, BASE_SIZE / 8 + BASE_SIZE / 2, 16 * BASE_SIZE, BABYLON.Color3.Blue(), scene)



    engine.runRenderLoop(() => {
        scene.render();
    })
}


function addHeroes(x, y, z, colour, scene) {
    var heroOne = BABYLON.Mesh.CreateBox("heroOne", BASE_SIZE, scene);
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