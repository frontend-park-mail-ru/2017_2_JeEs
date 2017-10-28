import * as BABYLON from 'babylonjs'
import EventBus from "../../modules/event-bus"
import Events from "../utils/events"
import Point from "../utils/point"
import Constants from "./constants"


const BASE_SIZE = Constants.BASE_SIZE;


export default class HeroView {


    public _currentHero: BABYLON.Mesh;

    public _heroOne: BABYLON.Mesh;

    private _heroTwo: BABYLON.Mesh;

    private _heroMoved: boolean = false;

    private _scene: BABYLON.Scene;

    private _gameFieldSize: number;

    private _availableForMovementPoints: Point[]

    private _eventBus;


    constructor(gameFieldSize: number, scene: BABYLON.Scene) {
        this._gameFieldSize = gameFieldSize;
        this._scene = scene;

        this._eventBus = new EventBus;

        this._eventBus.on(Events.GAMEVIEW_WALL_PLACED, (data) => {
            if (this._currentHero === this._heroOne) {
                this._eventBus.emit(Events.YOUR_WALL_PLACED, data)
            } else {
                this._eventBus.emit(Events.YOUR_WALL_PLACED, {
                    upperOrLeft: new Point(this._gameFieldSize - 1 - data.upperOrLeft.x, this._gameFieldSize - 1 - data.upperOrLeft.y),
                    lowerOrRight: new Point(this._gameFieldSize - 1 - data.lowerOrRight.x, this._gameFieldSize - 1 - data.lowerOrRight.y)
                })
            }
        });

    }

    public NewTurn(availableForMovementPoints: Point[]) {
        this._changeHero();
        this._availableForMovementPoints = availableForMovementPoints;
    }

    public CreateHeroes() {
        const gameFieldHalf = this._gameFieldSize / 2 - 0.5;

        const heroOneMaterial = new BABYLON.StandardMaterial("heroOneMaterial", this._scene);
        heroOneMaterial.diffuseColor = BABYLON.Color3.Red();
        this._heroOne = this._addHero("hero", 0, 1 / 8 + 1 / 2, gameFieldHalf, heroOneMaterial);


        const heroTwoMaterial = new BABYLON.StandardMaterial("heroOneMaterial", this._scene);
        heroTwoMaterial.diffuseColor = BABYLON.Color3.Blue();
        this._heroTwo = this._addHero("hero", this._gameFieldSize - 1, 1 / 8 + 1 / 2, gameFieldHalf, heroTwoMaterial);

        this._currentHero = this._heroTwo;
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
        this._moveHero(this._currentHero, new Point(pickedGhostHero.position.x, pickedGhostHero.position.z));

        this._deleteGhostHero();
        this._heroMoved = false;
    }

    public IsGhostHero(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.name === "ghostHero";
    }

    // public IsCurrentHero(mesh: BABYLON.AbstractMesh): boolean {
    //     return mesh === this._currentHero
    // }





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
            this._eventBus.emit(Events.YOUR_FIGURE_MOVED, { point: new Point(this._gameFieldSize - Math.round(position.x / BASE_SIZE) - 1, this._gameFieldSize - Math.round(position.y / BASE_SIZE) - 1) })
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

        for (const _point of this._availableForMovementPoints) {
            if (this._currentHero === this._heroTwo) {
                this._addHero("ghostHero", this._gameFieldSize - _point.x - 1, hero.position.y / BASE_SIZE, this._gameFieldSize - _point.y - 1, ghostHeroMaterial);
            } else {
                this._addHero("ghostHero", _point.x, hero.position.y / BASE_SIZE, _point.y, ghostHeroMaterial);
            }
        }
    }

    private _deleteGhostHero() {
        let ghost = this._scene.getMeshByName("ghostHero");
        while (ghost !== null) {
            ghost.dispose();
            ghost = this._scene.getMeshByName("ghostHero");
        }
    }
}