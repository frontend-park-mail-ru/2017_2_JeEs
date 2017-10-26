import * as BABYLON from 'babylonjs'
import Point from "../utils/point"


const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

const BASE_SIZE = 10;

export default class GameView {
    private _gameFieldSize: number;

    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.Camera;

    private _currentHero: BABYLON.Mesh;


    constructor(gameFieldSize: number) {
        this._gameFieldSize = gameFieldSize;

        const canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;

        this._engine = new BABYLON.Engine(canvas, true);
        this._scene = new BABYLON.Scene(this._engine);

        const gameFieldHalf = gameFieldSize / 2 - 0.5;
        const cameraPosition = new BABYLON.Vector3(BASE_SIZE * gameFieldHalf, 0, BASE_SIZE * gameFieldHalf);
        this._camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 200, cameraPosition, this._scene);
        this._camera.attachControl(canvas, false);

        //иногда ниобходимо чтобы при виде сверху не пропадали элементы
        this._camera.minZ = 0.1;


        const light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, -BASE_SIZE * gameFieldHalf, 0), this._scene);
        light.position = new BABYLON.Vector3(BASE_SIZE * gameFieldHalf, -BASE_SIZE * gameFieldHalf, BASE_SIZE * gameFieldHalf);

        this._addAsicsView();

        this._addFloor();

        const heroOne = this._addHero("hero", gameFieldHalf, 1 / 8 + 1 / 2, 0, BABYLON.Color3.Red());

        const heroTwo = this._addHero("hero", gameFieldHalf, 1 / 8 + 1 / 2, this._gameFieldSize - 1, BABYLON.Color3.Blue());

        this._currentHero = heroOne;


        // const ghostWall = addWalls({ x: 0, y: 2 }, { x: 0, y: 0 }, 1 / 8 + 1 / 2, scene)


        // window.addEventListener("mousemove", function (evt) {
        //     let pickResult = scene.pick(evt.clientX, evt.clientY);
        //     let x = pickResult.pickedPoint.x;
        //     let y = pickResult.pickedPoint.z;

        //     let needRotation = Math.floor((x - y + BASE_SIZE * 17) / BASE_SIZE) % 2 != Math.floor((x + y + BASE_SIZE * 17) / BASE_SIZE) % 2;

        //     placeWall(ghostWall, x, y, needRotation, scene)
        // });

        window.addEventListener("click", this.onSceneClick);

        this._engine.runRenderLoop(() => {
            this._scene.render();
        })
    }


    private _addFloor() {
        const floor = BABYLON.MeshBuilder.CreateBox("floor", {
            width: BASE_SIZE * this._gameFieldSize,
            height: BASE_SIZE / 4,
            depth: BASE_SIZE * this._gameFieldSize
        }, this._scene);
        const gameFieldHalf = this._gameFieldSize / 2 - 0.5;
        floor.position = new BABYLON.Vector3(BASE_SIZE * gameFieldHalf, 0, BASE_SIZE * gameFieldHalf);


        const floorMaterial = new BABYLON.StandardMaterial("floorMaterial", this._scene);
        floor.material = floorMaterial;


        for (let _i = 0; _i < this._gameFieldSize; _i++) {
            if (_i % 2 == 0) {
                for (let _j = 0; _j < this._gameFieldSize; _j++) {
                    if (_j % 2 == 0) {
                        this._addAvailablePosition(_i, 1 / 8, _j)
                    }
                }
            }
        }


    }


    private _addAvailablePosition(x: number, y: number, z: number) {
        let availablePosition = BABYLON.MeshBuilder.CreateBox("availablePosition", { width: BASE_SIZE, height: BASE_SIZE / 20, depth: BASE_SIZE }, this._scene);
        availablePosition.position = new BABYLON.Vector3(BASE_SIZE * x, BASE_SIZE * y, BASE_SIZE * z);

        let availablePositionMaterial = new BABYLON.StandardMaterial("availablePositionMaterial", this._scene);
        availablePositionMaterial.diffuseColor = BABYLON.Color3.Gray();

        availablePosition.material = availablePositionMaterial;
        return availablePositionMaterial
    }


    private _addAsicsView() {
        const x = BABYLON.MeshBuilder.CreateBox("x", { width: BASE_SIZE * 20, height: 0.1, depth: 0.1 }, this._scene);
        const xMaterial = new BABYLON.StandardMaterial("xMaterial", this._scene);
        xMaterial.diffuseColor = BABYLON.Color3.Red();
        x.material = xMaterial;
        x.position = new BABYLON.Vector3(BASE_SIZE * 10, 0, 0);


        const y = BABYLON.MeshBuilder.CreateBox("y", { width: 0.1, height: BASE_SIZE * 20, depth: 0.1 }, this._scene);
        const yMaterial = new BABYLON.StandardMaterial("yMaterial", this._scene);
        yMaterial.diffuseColor = BABYLON.Color3.Blue();
        y.material = yMaterial;
        y.position = new BABYLON.Vector3(0, BASE_SIZE * 10, 0);


        const z = BABYLON.MeshBuilder.CreateBox("z", { width: 0.1, height: 0.1, depth: BASE_SIZE * 20 }, this._scene);
        const zMaterial = new BABYLON.StandardMaterial("zMaterial", this._scene);
        zMaterial.diffuseColor = BABYLON.Color3.Green();
        z.material = zMaterial;
        z.position = new BABYLON.Vector3(0, 0, BASE_SIZE * 10);
    }


    private _addHero(name, x: number, y: number, z: number, colour: BABYLON.Color3) {
        const hero = BABYLON.Mesh.CreateBox(name, BASE_SIZE, this._scene);
        hero.position = new BABYLON.Vector3(BASE_SIZE * x, BASE_SIZE * y, BASE_SIZE * z);

        const heroMaterial = new BABYLON.StandardMaterial(`${name}Material`, this._scene);
        heroMaterial.diffuseColor = colour;

        hero.material = heroMaterial;
        return hero
    }


    public onSceneClick = event => {
        let pickResult = this._scene.pick(event.clientX, event.clientY);

        if (pickResult.pickedMesh !== null && pickResult.pickedMesh === this._currentHero) {
            this._addGhostHeroes(pickResult.pickedMesh, this._scene)
        }

        if (pickResult.pickedMesh !== null && pickResult.pickedMesh.name === "ghostHero") {
            this._moveHero(this._currentHero, { x: pickResult.pickedMesh.position.x, y: pickResult.pickedMesh.position.z });

            let ghost = this._scene.getMeshByName("ghostHero");
            while (ghost !== undefined) {
                ghost.dispose();
                ghost = this._scene.getMeshByName("ghostHero");
            }
        }
    };

    private _addGhostHeroes(hero, scene) {
        this._addHero("ghostHero", hero.position.x / BASE_SIZE + 2, hero.position.y / BASE_SIZE, hero.position.z / BASE_SIZE, BABYLON.Color3.Green())
        this._addHero("ghostHero", hero.position.x / BASE_SIZE, hero.position.y / BASE_SIZE, hero.position.z / BASE_SIZE + 2, BABYLON.Color3.Green())
        this._addHero("ghostHero", hero.position.x / BASE_SIZE - 2, hero.position.y / BASE_SIZE, hero.position.z / BASE_SIZE, BABYLON.Color3.Green())
        this._addHero("ghostHero", hero.position.x / BASE_SIZE, hero.position.y / BASE_SIZE, hero.position.z / BASE_SIZE - 2, BABYLON.Color3.Green())
    }

    private _moveHero(hero: BABYLON.Mesh, position: Point) {
        hero.position.x = position.x;
        hero.position.z = position.y;
    }

    public onSceneMove = event => {
        //     let pickResult = scene.pick(evt.clientX, evt.clientY);
        //     let x = pickResult.pickedPoint.x;
        //     let y = pickResult.pickedPoint.z;

        //     let needRotation = Math.floor((x - y + BASE_SIZE * 17) / BASE_SIZE) % 2 != Math.floor((x + y + BASE_SIZE * 17) / BASE_SIZE) % 2;

        //     placeWall(ghostWall, x, y, needRotation, scene)
        // }
    }
}
