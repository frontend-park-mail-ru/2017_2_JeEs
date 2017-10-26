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
    private _ghostWall: BABYLON.Mesh;

    private _heroMoved: boolean = false;

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

        const heroOneMaterial = new BABYLON.StandardMaterial("heroOneMaterial", this._scene);
        heroOneMaterial.diffuseColor = BABYLON.Color3.Red();
        const heroOne = this._addHero("hero", gameFieldHalf, 1 / 8 + 1 / 2, 0, heroOneMaterial);


        const heroTwoMaterial = new BABYLON.StandardMaterial("heroOneMaterial", this._scene);
        heroTwoMaterial.diffuseColor = BABYLON.Color3.Blue();
        const heroTwo = this._addHero("hero", gameFieldHalf, 1 / 8 + 1 / 2, this._gameFieldSize - 1, heroTwoMaterial);

        this._currentHero = heroOne;


        const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", this._scene);
        wallMaterial.diffuseColor = BABYLON.Color3.Purple();
        wallMaterial.alpha = 0.5;
        this._ghostWall = this._addWall({ x: 0, y: 2 }, { x: 0, y: 0 }, 1 / 8 + 1 / 2, wallMaterial);
        this._ghostWall.isVisible = false;

        window.addEventListener("click",  this.onSceneClick);

        window.addEventListener("mousemove", this.onSceneMove);

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


    private _addHero(name, x: number, y: number, z: number, material: BABYLON.StandardMaterial) {
        const hero = BABYLON.Mesh.CreateBox(name, BASE_SIZE, this._scene);
        hero.position = new BABYLON.Vector3(BASE_SIZE * x, BASE_SIZE * y, BASE_SIZE * z);

        hero.material = material;
        return hero
    }

    private _addWall(point1: Point, point2: Point, z: number, material: BABYLON.StandardMaterial) {
        const position = new Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2)
        position.x = (point1.x + point2.x) / 2
        position.y = (point1.y + point2.y) / 2


        const wall = BABYLON.MeshBuilder.CreateBox("wall", { width: BASE_SIZE * 3, height: BASE_SIZE, depth: BASE_SIZE / 2 }, this._scene);

        if ((point1.y - point2.y) !== 0) {
            wall.rotation.y = Math.PI / 2
        }

        wall.position = new BABYLON.Vector3(BASE_SIZE * position.x, BASE_SIZE * z, BASE_SIZE * position.y);


        wall.material = material;

        return wall
    }


    public onSceneClick = event => {
        let pickResult = this._scene.pick(event.clientX, event.clientY);

        if (pickResult.pickedMesh !== null && pickResult.pickedMesh === this._currentHero) {
            this._heroMoved = true;         
            this._ghostWall.isVisible = false;            
            this._addGhostHeroes(pickResult.pickedMesh, this._scene)
        }

        if (pickResult.pickedMesh !== null && pickResult.pickedMesh.name === "ghostHero") {
            this._moveHero(this._currentHero, { x: pickResult.pickedMesh.position.x, y: pickResult.pickedMesh.position.z });

            let ghost = this._scene.getMeshByName("ghostHero");
          
            while (ghost !== null) {
                ghost.dispose();
                ghost = this._scene.getMeshByName("ghostHero");
            }
            this._heroMoved = false;
        }
    };

    private _addGhostHeroes(hero, scene) {
        const ghostHeroMaterial = new BABYLON.StandardMaterial("ghostHeroMaterial", this._scene);
        ghostHeroMaterial.diffuseColor = BABYLON.Color3.Green();
        ghostHeroMaterial.alpha = 0.5;

        this._addHero("ghostHero", hero.position.x / BASE_SIZE + 2, hero.position.y / BASE_SIZE, hero.position.z / BASE_SIZE, ghostHeroMaterial)
        this._addHero("ghostHero", hero.position.x / BASE_SIZE, hero.position.y / BASE_SIZE, hero.position.z / BASE_SIZE + 2, ghostHeroMaterial)
        this._addHero("ghostHero", hero.position.x / BASE_SIZE - 2, hero.position.y / BASE_SIZE, hero.position.z / BASE_SIZE, ghostHeroMaterial)
        this._addHero("ghostHero", hero.position.x / BASE_SIZE, hero.position.y / BASE_SIZE, hero.position.z / BASE_SIZE - 2, ghostHeroMaterial)
    }

    private _moveHero(hero: BABYLON.Mesh, position: Point) {
        hero.position.x = position.x;
        hero.position.z = position.y;
    }

    public onSceneMove = event => {
        let pickResult = this._scene.pick(event.clientX, event.clientY);

        if (pickResult.pickedPoint === null) {
            return
        }
        let x = pickResult.pickedPoint.x;
        let y = pickResult.pickedPoint.z;

        if (this._heroMoved === false) { //дописать условий
            this._ghostWallAdd(this._ghostWall, { x, y })
            this._ghostWall.isVisible = true;
            
        }
    }

    private _ghostWallAdd(wall: BABYLON.Mesh, point: Point) {
        let transformedCoordinate: Point = { x: Math.round(point.x / BASE_SIZE), y: Math.round(point.y / BASE_SIZE) }
        const rotation = this._rotation(point);

        if (transformedCoordinate.x % 2 != 0 || transformedCoordinate.y % 2 != 0) { //дописать логики
            wall.position.x = transformedCoordinate.x * BASE_SIZE;
            wall.position.z = transformedCoordinate.y * BASE_SIZE;
            wall.rotation.y = rotation
        }
    }

    private _rotation(point: Point) {
        let needRotation = Math.floor((point.x - point.y + BASE_SIZE * 17) / BASE_SIZE) % 2
            != Math.floor((point.x + point.y + BASE_SIZE * 17) / BASE_SIZE) % 2;
        return needRotation ? Math.PI : 0;
    }
}
