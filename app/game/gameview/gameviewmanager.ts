import * as BABYLON from 'babylonjs';
import Point from "../utils/point";
import * as FieldState from "../utils/field-state";
import Constants from "./constants";
import EventBus from "../../modules/event-bus";

import WallView from "./wallview";
import FloorView from "./floorview";
import Events from "../utils/events";

import HeroManager from './heroview/heroManager';

import ResourcesMap from "./services/resources";




const BASE_SIZE = Constants.BASE_SIZE;

export default class GameViewManager {
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;

    private _heroManaher: HeroManager;
    private _wallView: WallView;
    private _floorView: FloorView;

    private _myTurn: boolean = false;

    private _gameFieldSize: number;

    private _canvas: HTMLCanvasElement;

    private _eventBus;

    private _fullScreen;

    constructor(gameFieldSize: number) {

        this._gameFieldSize = gameFieldSize;

        this._eventBus = new EventBus;

        this._canvas = <HTMLCanvasElement>document.getElementsByClassName("game__canvas")[0];

        window.addEventListener('resize', this._resizeCanvas);
        window.addEventListener('orientationchange', this._resizeCanvas);

        this._resizeCanvas()



        this._engine = new BABYLON.Engine(this._canvas, true);

        this._engine.loadingScreen = <any>BABYLON.DefaultLoadingScreen;

        this._scene = new BABYLON.Scene(this._engine);

        const gameFieldHalf = this._gameFieldSize / 2 - 0.5;
        const cameraPosition = new BABYLON.Vector3(BASE_SIZE * gameFieldHalf, 0, BASE_SIZE * gameFieldHalf);
        this._camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, BASE_SIZE * 25, cameraPosition, this._scene);
        this._camera.attachControl(this._canvas, true);
        this._camera.lowerRadiusLimit = BASE_SIZE * 15;
        this._camera.upperBetaLimit = Math.PI / 2.1;
        this._camera.upperRadiusLimit = BASE_SIZE * 30;

        this._addLights();

        this._heroManaher = new HeroManager(gameFieldSize, this._scene);
        this._wallView = new WallView(this._scene);


        let skybox = BABYLON.Mesh.CreateBox("images/skybox", 1000.0, this._scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("images/skybox", this._scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        skyboxMaterial.disableLighting = true;

        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox", this._scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;


        // (new ResourcesMap).get("Scene", "Scene", "./meshes/", "scene.babylon", this._scene)
        //     .then((data) => {
        //         data.isVisible = true;
        //         data.scaling = new BABYLON.Vector3(100, 100, 100);
        //     })


        this._floorView = new FloorView(gameFieldSize, this._scene);

        this._floorView.AddFloor();

        this._heroManaher.CreateHeroes();

        this._canvas.addEventListener("click", this.OnSceneClick);

        this._canvas.addEventListener("mousemove", this.OnSceneMove);

        this._canvas.addEventListener("touchend", event => {
        });

        this._eventBus.on(Events.TURN_BEGAN, this._onTurnBegan);

        this._eventBus.on(Events.TURN_ENDED, this._onTurnEnded);

        this._eventBus.on(Events.MULTIPLAYER, this._onMultiplayerBegan);

        this._eventBus.on(Events.GAME_OVER, this._onGameOver);

        this._engine.runRenderLoop(() => {
            this._scene.render();
        })

    }


    public OnSceneClick = event => {
        if (this._myTurn) {
            let pickResult = this._scene.pick(event.offsetX, event.offsetY);

            if (pickResult.pickedMesh !== null && this._heroManaher.IsCurrentHero(pickResult.pickedMesh)) {
                if (this._heroManaher.IsHeroMoving()) {
                    this._heroManaher.CancelMove();
                    return;
                }
                this._heroManaher.HeroMovementStart();
                return;
            }

            if (pickResult.pickedMesh !== null && this._heroManaher.IsGhostHero(pickResult.pickedMesh)) {
                this._heroManaher.MoveOnGhostHero(<BABYLON.Mesh>pickResult.pickedMesh)
                return;
            }

            if (pickResult.pickedMesh !== null && this._wallView.IsGhostWall(pickResult.pickedMesh)) {
                this._wallView.AddWallByGhosWall()
                return;
            }

            if (!this._heroManaher.IsHeroMoving()) {
                if (pickResult.pickedPoint === null) {
                    return;
                }
                let x = pickResult.pickedPoint.x;
                let y = pickResult.pickedPoint.z;

                this._wallView.AddGhostWall(new Point(x, y));
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

            if (!this._heroManaher.IsHeroMoving()) {
                this._wallView.AddGhostWall(new Point(x, y));
            }
        }
    }

    private _addLights() {
        const gameFieldHalf = this._gameFieldSize / 2 - 0.5;

        const lightOne = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(BASE_SIZE * gameFieldHalf, BASE_SIZE * this._gameFieldSize, BASE_SIZE * gameFieldHalf), this._scene);
        lightOne.specular = new BABYLON.Color3(0.3, 0.3, 0.3);
    }


    private _resizeCanvas = () => {
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
    }

    private _onTurnBegan = data => {
        this._heroManaher.NewTurn(data.availableForMovementPoints);
        this._wallView.NewTurn(data.engagedPoints, this._heroManaher.IsMainHeroTurn());
        this._myTurn = true;
        this._eventBus.emit(Events.GAMEVIEW_START_TIMER, "");

    }

    private _onTurnEnded = data => {
        this._myTurn = false;
    }

    private _onOpponentFigureMoved = data => {
        this._heroManaher.OpponentsMove(data.point);
    }

    private _onOpponentWallPlaced = data => {
        this._wallView.OpponentsWallPlaced(data.upperOrLeft, data.lowerOrRight);
    }

    private _onMultiplayerBegan = data => {
        this._heroManaher.SetMultiplayerLogic();

        this._wallView.SetMultiplayerLogic();

        this._eventBus.on(Events.OPPONENTS_FIGURE_MOVED, this._onOpponentFigureMoved);

        this._eventBus.on(Events.OPPONENTS_WALL_PLACED, this._onOpponentWallPlaced);
    }

    private _onGameOver = data => {
        this._eventBus.emit(Events.GAMEVIEW_SEND_MESSAGE, "Вы победили!");
    }

    public destroy() {

        this._eventBus.remove(Events.TURN_BEGAN);

        this._eventBus.remove(Events.TURN_ENDED);

        this._eventBus.remove(Events.OPPONENTS_FIGURE_MOVED);

        this._eventBus.remove(Events.OPPONENTS_WALL_PLACED);

        this._eventBus.remove(Events.MULTIPLAYER);

        this._eventBus.remove(Events.GAME_OVER);

        this._eventBus.remove(Events.YOUR_FIGURE_MOVED);

        this._eventBus.remove(Events.YOUR_WALL_PLACED);

        this._eventBus.remove(Events.GAME_CLOSED);

        this._eventBus.remove(Events.GAME_STARTED);

        this._eventBus.remove(Events.TURN_ENDED);

        this._eventBus.remove(Events.YOUR_TURN);

        window.removeEventListener('resize', this._resizeCanvas);
        window.removeEventListener('orientationchange', this._resizeCanvas);

        this._engine.stopRenderLoop();
        this._engine = null;
        this._scene = null;
        this._camera = null;

        this._heroManaher.destroy();
        this._heroManaher = null;

        this._wallView.destroy();
        this._wallView = null;

        this._floorView.destroy();
        this._floorView = null;


        this._canvas = null;

        (new ResourcesMap()).destroy();
    }

}
