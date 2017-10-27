import * as BABYLON from 'babylonjs'
import Point from "../utils/point"
import * as FieldState from "../utils/field-state"
import Constants from "./constants"

import HeroView from "./heroview"
import WallView from "./wallview"
import FloorView from "./floorview"



const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

const BASE_SIZE = Constants.BASE_SIZE;

export default class GameViewManager {
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.Camera;

    private _heroView: HeroView;
    private _wallView: WallView;
    private _floorView: FloorView;



    constructor(gameFieldSize: number) {

        const canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;

        this._engine = new BABYLON.Engine(canvas, true);
        this._scene = new BABYLON.Scene(this._engine);

        const gameFieldHalf = gameFieldSize / 2 - 0.5;
        const cameraPosition = new BABYLON.Vector3(BASE_SIZE * gameFieldHalf, 0, BASE_SIZE * gameFieldHalf);
        this._camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 200, cameraPosition, this._scene);
        this._camera.attachControl(canvas, false);
        this._camera.minZ = 0.1;

        const light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, -BASE_SIZE * gameFieldHalf, 0), this._scene);
        light.position = new BABYLON.Vector3(BASE_SIZE * gameFieldHalf, -BASE_SIZE * gameFieldHalf, BASE_SIZE * gameFieldHalf);


        this._heroView = new HeroView(gameFieldSize, this._scene);
        this._wallView = new WallView(this._scene);
        this._floorView = new FloorView(gameFieldSize, this._scene);

        this._floorView.AddFloor();

        this._heroView.CreateHeroes();

        window.addEventListener("click", this.OnSceneClick);

        window.addEventListener("mousemove", this.OnSceneMove);

        this._engine.runRenderLoop(() => {
            this._scene.render();
        })
    }


    public OnSceneClick = event => {
        let pickResult = this._scene.pick(event.clientX, event.clientY);

        if (pickResult.pickedMesh !== null && this._heroView.IsCurrentHero(pickResult.pickedMesh)) {
            this._heroView.HeroMovementStart(pickResult.pickedMesh)
        }

        if (pickResult.pickedMesh !== null && this._heroView.IsGhostHero(pickResult.pickedMesh)) {
            this._heroView.MoveOnGhostHero(pickResult.pickedMesh)
        }

        if (pickResult.pickedMesh !== null && this._wallView.IsGhostWall(pickResult.pickedMesh)) {
            this._wallView.AddWallByGhosWall()
        }
    };



    public OnSceneMove = event => {
        let pickResult = this._scene.pick(event.clientX, event.clientY);

        if (pickResult.pickedPoint === null) {
            return
        }
        let x = pickResult.pickedPoint.x;
        let y = pickResult.pickedPoint.z;

        if (!this._heroView.IsHeroMoving()) { //дописать условий
            this._wallView.AddGhostWall({ x, y })
        }
    }


}
