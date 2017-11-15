import * as BABYLON from 'babylonjs'
import Point from "../utils/point"
import * as FieldState from "../utils/field-state"
import Constants from "./constants"
import EventBus from "../../modules/event-bus"

import HeroManaher from "./heroview/heroManager"
import WallView from "./wallview"
import FloorView from "./floorview"
import Events from "../utils/events"

import FullScreen from "../../services/fullscreenlogic"
import HeroManager from './heroview/heroManager';




const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

const BASE_SIZE = Constants.BASE_SIZE;

export default class GameViewManager {
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;

    private _HeroManaher: HeroManaher;
    private _wallView: WallView;
    private _floorView: FloorView;

    private _myTurn: boolean = false;

    private _gameFieldSize: number;

    private _eventBus;

    constructor(gameFieldSize: number) {
        this._gameFieldSize = gameFieldSize;

        this._eventBus = new EventBus;

        const canvas = <HTMLCanvasElement>document.getElementsByClassName("renderCanvas")[0];

        // FullScreen.addFullScreen(canvas) мб потом допилим

        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;

        this._engine = new BABYLON.Engine(canvas, true);
        this._scene = new BABYLON.Scene(this._engine);        

        const gameFieldHalf = this._gameFieldSize / 2 - 0.5;
        const cameraPosition = new BABYLON.Vector3(BASE_SIZE * gameFieldHalf, 0, BASE_SIZE * gameFieldHalf);
        this._camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, BASE_SIZE * 25, cameraPosition, this._scene);
        this._camera.attachControl(canvas, false);
        this._camera.lowerRadiusLimit = BASE_SIZE * 15;
        this._camera.upperBetaLimit = Math.PI / 2.1;
        this._camera.upperRadiusLimit = BASE_SIZE * 30;

        this._addLights()

        this._HeroManaher = new HeroManager(gameFieldSize, this._scene);
        this._wallView = new WallView(this._scene);
        this._floorView = new FloorView(gameFieldSize, this._scene);

        this._floorView.AddFloor();

        this._HeroManaher.CreateHeroes();

        canvas.addEventListener("click", this.OnSceneClick);

        canvas.addEventListener("mousemove", this.OnSceneMove);


        this._eventBus.on(Events.TURN_BEGAN, (data) => {
            this._HeroManaher.NewTurn(data.availableForMovementPoints)
            this._wallView.NewTurn(data.engagedPoints, this._HeroManaher.IsMainHeroTurn())
            this._myTurn = true;
        });

        this._eventBus.on(Events.GAME_OVER, (data) => {
            alert("Вы победили!");
        });

        this._engine.runRenderLoop(() => {
            this._scene.render();
        })
    }


    public OnSceneClick = event => {
        if (this._myTurn) {
            let pickResult = this._scene.pick(event.offsetX, event.offsetY);
            
            if (pickResult.pickedMesh !== null && this._HeroManaher.IsCurrentHero(pickResult.pickedMesh)) {
                if (this._HeroManaher.IsHeroMoving()) {
                    this._HeroManaher.CancelMove();
                    return;
                }
                this._HeroManaher.HeroMovementStart()
                return;
            }

            if (pickResult.pickedMesh !== null && this._HeroManaher.IsGhostHero(pickResult.pickedMesh)) {
                this._myTurn = false;
                this._HeroManaher.MoveOnGhostHero(<BABYLON.Mesh>pickResult.pickedMesh)
                return;
            }

            if (pickResult.pickedMesh !== null && this._wallView.IsGhostWall(pickResult.pickedMesh)) {
                this._myTurn = false;
                this._wallView.AddWallByGhosWall()
                return;
            }
        }
    };



    public OnSceneMove = event => {
        if (this._myTurn) {
            let pickResult = this._scene.pick(event.offsetX, event.offsetY);

            if (pickResult.pickedPoint === null) {
                return;
            }
            let x = pickResult.pickedPoint.x;
            let y = pickResult.pickedPoint.z;

            if (!this._HeroManaher.IsHeroMoving()) {
                this._wallView.AddGhostWall(new Point(x, y))
            }
        }
    }

    private _addLights() {
        const gameFieldHalf = this._gameFieldSize / 2 - 0.5;

        const lightOne = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, BASE_SIZE * gameFieldHalf, 0), this._scene);

    }


}
