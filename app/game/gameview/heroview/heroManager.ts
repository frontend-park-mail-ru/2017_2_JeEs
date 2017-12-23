import * as BABYLON from 'babylonjs'
import EventBus from "../../../modules/event-bus"
import Events from "../../utils/events"
import Point from "../../utils/point"
import Constants from "../constants"

import Hero from "./heroview"


const BASE_SIZE = Constants.BASE_SIZE;


export default class HeroManager {
    private _currentHero: Hero;

    private _mainHero: Hero;

    private _mainHeroWallsNumber: number = 8;

    private _opponentHeroWallsNumber: number = 8;

    private _opponentHero: Hero;

    private _ghostHeroes: Hero[] = new Array;


    private _heroMoved: boolean = false;

    private _scene: BABYLON.Scene;

    private _gameFieldSize: number;

    private _availableForMovementPoints: Point[]

    private _eventBus;

    private _singleplayerFlag: boolean = true;

    constructor(gameFieldSize: number, scene: BABYLON.Scene) {
        this._gameFieldSize = gameFieldSize;
        this._scene = scene;

        this._eventBus = new EventBus;


        this._eventBus.on(Events.OPPONENTS_WALL_PLACED, () => {
            if (!this._singleplayerFlag) {
                this._opponentHeroWallsNumber--;
                this._eventBus.emit(Events.OPPONENTHERO_WALL_NUMBER, this._opponentHeroWallsNumber);
            }
        });

        //сомнительное размещение логики, если честно
        this._eventBus.on(Events.GAMEVIEW_WALL_PLACED, this._onWallPlaced);

        this._eventBus.on(Events.GAMEVIEW_VALIDATE_WALL, data => {
            if (this.IsMainHeroTurn()) {
                this._eventBus.emit(Events.VALIDATE_WALL, data);
            } else {
                this._eventBus.emit(Events.VALIDATE_WALL, {
                    upperOrLeft: new Point(this._gameFieldSize - 1 - data.upperOrLeft.x, this._gameFieldSize - 1 - data.upperOrLeft.y),
                    lowerOrRight: new Point(this._gameFieldSize - 1 - data.lowerOrRight.x, this._gameFieldSize - 1 - data.lowerOrRight.y)
                })
            }
        });

    }

    public SetMultiplayerLogic() {
        this._currentHero = this._mainHero;
        this._singleplayerFlag = false;
    }

    public NewTurn(availableForMovementPoints: Point[]) {
        if (this._singleplayerFlag) {
            this._changeHero();
            if (this.IsMainHeroTurn()) {
                this._eventBus.emit(Events.GAMEVIEW_SEND_MESSAGE, "Ход синего игрока")
            } else {
                this._eventBus.emit(Events.GAMEVIEW_SEND_MESSAGE, "Ход красного игрока")
            }
        } else {
            debugger;
            this._eventBus.emit(Events.GAMEVIEW_SEND_MESSAGE, "Ваш ход")
        }
        this._availableForMovementPoints = availableForMovementPoints;
    }

    public CreateHeroes() {
        const gameFieldHalf = this._gameFieldSize / 2 - 0.5;

        this._mainHero = new Hero("mainHero", "BlueHero", "blue_hero.babylon", this._scene, 0, gameFieldHalf, false, 0);

        this._opponentHero = new Hero("opponentHero", "RedHero", "red_hero.babylon", this._scene, this._gameFieldSize - 1, gameFieldHalf, false, Math.PI);

        this._currentHero = this._opponentHero;
    }

    public IsHeroMoving(): boolean {
        return this._heroMoved;
    }


    public HeroMovementStart() {
        this._heroMoved = true;
        this._eventBus.emit(Events.GAMEVIEW_HERO_MOVEMENT_START);

        this._addGhostHeroes(this._currentHero)
    }

    public CancelMove() {
        this._deleteGhostHeroes();
        this._heroMoved = false;
    }

    public MoveOnGhostHero(pickedGhostHero: BABYLON.Mesh) {
        let position: Point;
        for (let _i = 0; _i < this._ghostHeroes.length; _i++) {
            if (this._ghostHeroes[_i].CheckHeroByMesh(pickedGhostHero)) {
                position = this._ghostHeroes[_i].GetPosition()
                this._currentHero.SetPosition(this._ghostHeroes[_i].GetPosition())
                break
            }
        }


        if (this.IsMainHeroTurn()) {
            this._eventBus.emit(Events.YOUR_FIGURE_MOVED, { point: position })
        } else {
            this._eventBus.emit(Events.YOUR_FIGURE_MOVED, { point: new Point(this._gameFieldSize - position.x - 1, this._gameFieldSize - position.y - 1) })
        }

        this.CancelMove()
    }

    public IsGhostHero(mesh: BABYLON.AbstractMesh): boolean {
        if (this._ghostHeroes.length === 0) {
            return false;
        }

        return (mesh.name.startsWith("ghostHero"));
    }

    public IsCurrentHero(mesh: BABYLON.AbstractMesh): boolean {
        let result: boolean;
        return mesh.name.startsWith(this._currentHero.GetName())
    }

    public IsMainHeroTurn(): boolean {
        return this._currentHero === this._mainHero;
    }

    public OpponentsMove(position: Point) {
        this._opponentHero.SetPosition(position);
    }

    private _addGhostHeroes(hero: Hero) {
        this._availableForMovementPoints.forEach((_point, _index) => {
            if (this.IsMainHeroTurn()) {
                this._ghostHeroes.push(new Hero(`ghostHero${_index}`,  "BlueHero", "blue_hero.babylon", this._scene, _point.x, _point.y, true, hero.GetRotation()));
            } else {
                this._ghostHeroes.push(new Hero(`ghostHero${_index}`,  "RedHero", "red_hero.babylon", this._scene, this._gameFieldSize - _point.x - 1, this._gameFieldSize - _point.y - 1, true, hero.GetRotation()));
            }
        });
    }

    private _deleteGhostHeroes() {
        this._ghostHeroes.forEach(ghostHero => {
            ghostHero.Delete();
        });
        this._ghostHeroes.splice(0);
    }

    private _changeHero() {
        if (this._currentHero === this._mainHero) {
            this._currentHero = this._opponentHero;
        } else {
            this._currentHero = this._mainHero;
        }
    }

    private _onWallPlaced = data => {
        if (this.IsMainHeroTurn()) {
            this._eventBus.emit(Events.YOUR_WALL_PLACED, data);
            this._mainHeroWallsNumber--;
            this._eventBus.emit(Events.MAINHERO_WALL_NUMBER, this._mainHeroWallsNumber);
        } else {
            this._eventBus.emit(Events.YOUR_WALL_PLACED, {
                upperOrLeft: new Point(this._gameFieldSize - 1 - data.upperOrLeft.x, this._gameFieldSize - 1 - data.upperOrLeft.y),
                lowerOrRight: new Point(this._gameFieldSize - 1 - data.lowerOrRight.x, this._gameFieldSize - 1 - data.lowerOrRight.y)
            })

            this._opponentHeroWallsNumber--;
            this._eventBus.emit(Events.OPPONENTHERO_WALL_NUMBER, this._opponentHeroWallsNumber);
        }
    }



    public destroy() {
        this._scene = null;

        this._currentHero.destroy();
        this._currentHero = null;

        this._mainHero.destroy();
        this._mainHero = null;

        this._ghostHeroes.forEach(hero => {
            hero.destroy();
        });
        this._ghostHeroes = null;

        this._scene = null;

        this._eventBus.remove(Events.GAMEVIEW_WALL_PLACED);
    }
}