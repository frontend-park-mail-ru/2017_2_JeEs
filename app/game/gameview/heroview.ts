import * as BABYLON from 'babylonjs'
import EventBus from "../../modules/event-bus"
import Events from "../utils/events"
import Point from "../utils/point"
import Constants from "./constants"


const BASE_SIZE = Constants.BASE_SIZE;


export default class HeroView {


    private _currentHero: BABYLON.Mesh;

    private _heroOne: BABYLON.Mesh;

    private _heroTwo: BABYLON.Mesh;

    private _heroMoved: boolean = false;

    private _scene: BABYLON.Scene;

    private _gameFieldSize: number;

    private _eventBus;


    constructor(gameFieldSize: number, scene: BABYLON.Scene) {
        this._gameFieldSize = gameFieldSize;
        this._scene = scene;

        this._eventBus = new EventBus;

        // this._eventBus.on(Events.OPPONENTS_FIGURE_MOVED, (data) => {
        //     this._changeHero(data);
        // });

        // this._eventBus.on(Events.OPPONENTS_WALL_PLACED, (data) => {
        //     this._changeHero(data);
        // });

        this._eventBus.on(Events.GAMEVIEW_WALL_PLACED, (data) => {
            if (this._currentHero === this._heroOne) {
                this._eventBus.emit(Events.YOUR_WALL_PLACED, data)
            } else {
                this._eventBus.emit(Events.YOUR_WALL_PLACED, { upperOrLeft: 17 - data.upperOrLeft, lowerOrRight: 17 - data.lowerOrRight })
            }
        });

    }

    public NewTurn() {
        this._changeHero();
    }

    public CreateHeroes() {
        const gameFieldHalf = this._gameFieldSize / 2 - 0.5;

        const heroOneMaterial = new BABYLON.StandardMaterial("heroOneMaterial", this._scene);
        heroOneMaterial.diffuseColor = BABYLON.Color3.Red();
        this._heroOne = this._addHero("hero", gameFieldHalf, 1 / 8 + 1 / 2, 0, heroOneMaterial);


        const heroTwoMaterial = new BABYLON.StandardMaterial("heroOneMaterial", this._scene);
        heroTwoMaterial.diffuseColor = BABYLON.Color3.Blue();
        this._heroTwo = this._addHero("hero", gameFieldHalf, 1 / 8 + 1 / 2, this._gameFieldSize - 1, heroTwoMaterial);

        this._currentHero = this._heroOne;
    }

    public IsHeroMoving(): boolean {
        return this._heroMoved;
    }

    public GetCurrentHero(): BABYLON.Mesh {
        return this._currentHero;
    }

    public HeroMovementStart(pickedHero: BABYLON.AbstractMesh) {
        this._heroMoved = true;
        this._eventBus.emit(Events.GAMEVIEW_HERO_MOVEMENT_START);

        this._addGhostHeroes(pickedHero, this._scene)
    }

    public MoveOnGhostHero(pickedGhostHero: BABYLON.AbstractMesh) {
        this._moveHero(this._currentHero, { x: pickedGhostHero.position.x, y: pickedGhostHero.position.z });

        this._deleteGhostHero();
        this._heroMoved = false;
    }

    public IsGhostHero(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.name === "ghostHero";
    }

    public IsCurrentHero(mesh: BABYLON.AbstractMesh): boolean {
        return mesh === this._currentHero
    }




    private _addHero(name, x: number, y: number, z: number, material: BABYLON.StandardMaterial) {
        const hero = BABYLON.Mesh.CreateBox(name, BASE_SIZE, this._scene);
        hero.position = new BABYLON.Vector3(BASE_SIZE * x, BASE_SIZE * y, BASE_SIZE * z);

        hero.material = material;
        return hero
    }


    private _moveHero(hero: BABYLON.Mesh, position: Point) {
        if (this._currentHero === this._heroOne) {
            this._eventBus.emit(Events.YOUR_FIGURE_MOVED, { point: new Point(Math.round(position.x / BASE_SIZE), Math.round(position.y / BASE_SIZE)) })
        } else {
            this._eventBus.emit(Events.YOUR_FIGURE_MOVED, { point: new Point(this._gameFieldSize - Math.round(position.x / BASE_SIZE), this._gameFieldSize - Math.round(position.y / BASE_SIZE)) })
        }

        hero.position.x = position.x;
        hero.position.z = position.y;
    }


    private _changeHero() {
        if (this._currentHero === this._heroOne) {
            this._currentHero = this._heroTwo
        } else {
            this._currentHero = this._heroOne
        }
    }


    private _addGhostHeroes(hero, scene) {
        const ghostHeroMaterial = new BABYLON.StandardMaterial("ghostHeroMaterial", this._scene);
        ghostHeroMaterial.diffuseColor = BABYLON.Color3.Green();
        ghostHeroMaterial.alpha = 0.5;

        // for (const _point of points) {
        //     this._addHero("ghostHero", _point.x, hero.position.y / BASE_SIZE, _point.y, ghostHeroMaterial);
        // }
    }

    private _deleteGhostHero() {
        let ghost = this._scene.getMeshByName("ghostHero");
        while (ghost !== null) {
            ghost.dispose();
            ghost = this._scene.getMeshByName("ghostHero");
        }
    }
}