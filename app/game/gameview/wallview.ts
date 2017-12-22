import * as BABYLON from 'babylonjs';
import EventBus from "../../modules/event-bus";
import Events from "../utils/events";
import Point from "../utils/point";
import Constants from "./constants";
import { Vector3 } from 'babylonjs';
import ResourcesMap from "./services/resources";



const BASE_SIZE = Constants.BASE_SIZE;


export default class WallView {
    private _ghostWall: BABYLON.Mesh;

    private _prevWall: BABYLON.Mesh;

    private _singleplayerFlag: boolean = true;

    private readonly _ghostWallName: string = "ghostWall";
    private readonly _wallName: string = "wall";

    private _scene: BABYLON.Scene;
    private _eventBus;
    private _engagedPoints: Point[] = [];

    private readonly DefaultHeightPosition: number = 0;

    constructor(scene: BABYLON.Scene) {
        this._scene = scene;

        this._createGhostWall();


        this._eventBus = new EventBus;

        this._eventBus.on(Events.GAMEVIEW_HERO_MOVEMENT_START, (data) => {
            this._ghostWall.isVisible = false;
        })


        document.addEventListener("keypress", this._rotateWall);
    }

    public NewTurn(engagedPoints: Point[], isCurrentHero: boolean) {
        if (isCurrentHero) {
            this._engagedPoints = engagedPoints;
        } else {
            this._engagedPoints = engagedPoints.map((point: Point) => {
                return new Point(16 - point.x, 16 - point.y);
            });
        }
    }

    public AddGhostWall(point: Point) {
        const transformedCoordinate: Point = new Point(Math.round(point.x / BASE_SIZE), Math.round(point.y / BASE_SIZE));
        let upperOrLeft: Point;
        let lowerOrRight: Point;

        const rotation = this._rotation(point);

        if (rotation === 0) {
            upperOrLeft = new Point(transformedCoordinate.x, transformedCoordinate.y + 1);
            lowerOrRight = new Point(transformedCoordinate.x, transformedCoordinate.y - 1);
        } else {
            upperOrLeft = new Point(transformedCoordinate.x - 1, transformedCoordinate.y);
            lowerOrRight = new Point(transformedCoordinate.x + 1, transformedCoordinate.y);
        }

        if (this._ghostWall != null && this._checkCollisions([upperOrLeft, transformedCoordinate, lowerOrRight])) {
            this._ghostWall.position.x = transformedCoordinate.x * BASE_SIZE;
            this._ghostWall.position.z = transformedCoordinate.y * BASE_SIZE;
            this._ghostWall.rotation.y = rotation;
            this._ghostWall.isVisible = true;
        }

    }

    public AddWallByGhosWall() {
        this._prevWall = this._ghostWall;
        this._ghostWall.visibility = 1;
        this._ghostWall = null;

        let upperOrLeft: Point;
        let lowerOrRight: Point;

        if (this._prevWall.rotation.y === 0) {
            upperOrLeft = new Point(this._prevWall.position.x / BASE_SIZE, this._prevWall.position.z / BASE_SIZE + 1);
            lowerOrRight = new Point(this._prevWall.position.x / BASE_SIZE, this._prevWall.position.z / BASE_SIZE - 1);
        } else {
            upperOrLeft = new Point(this._prevWall.position.x / BASE_SIZE - 1, this._prevWall.position.z / BASE_SIZE);
            lowerOrRight = new Point(this._prevWall.position.x / BASE_SIZE + 1, this._prevWall.position.z / BASE_SIZE);
        }

        if (this._singleplayerFlag) {
            this._prevWall.material.alpha = 1;
            this._prevWall.name = this._wallName;
    
            this._eventBus.emit(Events.GAMEVIEW_WALL_PLACED, { upperOrLeft, lowerOrRight });
    
            this._createGhostWall();
        } else {

            this._eventBus.emit(Events.GAMEVIEW_VALIDATE_WALL, { upperOrLeft, lowerOrRight });
            GAMEVIEW_VALIDATE_WALL
    
            this._prevWall.material.alpha = 1;
            this._prevWall.name = this._wallName;
    
            this._eventBus.emit(Events.GAMEVIEW_WALL_PLACED, { upperOrLeft, lowerOrRight });
    
            this._createGhostWall();
        }
    }

    public IsGhostWall(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.name === this._ghostWallName;
    }

    public OpponentsWallPlaced(...wallPoints) {
        let [upperOrLeft, lowerOrRight] = wallPoints;

        const position = new Point((upperOrLeft.x + lowerOrRight.x) / 2, (upperOrLeft.y + lowerOrRight.y) / 2);

        let rotation: number = (upperOrLeft.y - lowerOrRight.y === 0) ? Math.PI / 2 : 0;
        this._ghostWall.rotation.y = rotation;

        this._ghostWall.position = new BABYLON.Vector3(BASE_SIZE * position.x, this.DefaultHeightPosition, BASE_SIZE * position.y);
        this._ghostWall.isVisible = true;
        this._ghostWall.visibility = 1;
        this._createGhostWall()
    }


    private _rotation(point: Point): number { //хардкод
        let needRotation = Math.floor((point.x - point.y + BASE_SIZE * 17) / BASE_SIZE) % 2
            != Math.floor((point.x + point.y + BASE_SIZE * 17) / BASE_SIZE) % 2;
        return needRotation ? 0 : Math.PI / 2;
    }


    private _createGhostWall() {
        this._addWall(new Point(0, 2), new Point(0, 0));
    }

    private _addWall(point1: Point, point2: Point) {

        (new ResourcesMap).get("wall", "Wall", "./meshes/", "wall.babylon", this._scene)
            .then((data) => {
                const position = new Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);

                this._ghostWall = data;

                this._ghostWall.name = this._ghostWallName;

                if ((point1.y - point2.y) === 0) {
                    this._ghostWall.rotation.y = Math.PI / 2
                }

                this._ghostWall.position = new BABYLON.Vector3(BASE_SIZE * position.x, this.DefaultHeightPosition, BASE_SIZE * position.y);

                this._ghostWall.isVisible = false;

                this._ghostWall.visibility = 0.3;

                (<BABYLON.StandardMaterial>this._ghostWall.material).disableLighting = true;
            })


    }

    private _checkCollisions(points: Point[]) {
        if (points[1].x % 2 === 1 && points[1].y % 2 === 1) {
            for (const _point of points) {
                if (_point.x < 0 || _point.y < 0 || _point.x > 16 || _point.y > 16 ||
                    this._engagedPoints.filter(_filterPoint => _filterPoint.equals(_point)).length !== 0) {
                    return false;
                }
            }
        } else {
            return false;
        }
        return true;
    }


    private _rotateWall = event => {
        if (event.code === 'KeyR') {
            let point = new Point(this._ghostWall.position.x, this._ghostWall.position.z)

            const transformedCoordinate: Point = new Point(Math.round(point.x / BASE_SIZE), Math.round(point.y / BASE_SIZE));
            let upperOrLeft: Point;
            let lowerOrRight: Point;

            if (this._ghostWall.rotation.y !== 0 && this._ghostWall.rotation.y !== Math.PI) {
                upperOrLeft = new Point(transformedCoordinate.x, transformedCoordinate.y + 1);
                lowerOrRight = new Point(transformedCoordinate.x, transformedCoordinate.y - 1);
            } else {
                upperOrLeft = new Point(transformedCoordinate.x - 1, transformedCoordinate.y);
                lowerOrRight = new Point(transformedCoordinate.x + 1, transformedCoordinate.y);
            }

            if (this._ghostWall != null && this._checkCollisions([upperOrLeft, transformedCoordinate, lowerOrRight])) {
                this._ghostWall.rotation.y += Math.PI / 2;
            }
        }
    }

    public SetMultiplayerLogic() {
        this._singleplayerFlag = false;
    }

    private _onHeroStart = data => {
        this._ghostWall.isVisible = false;
    }

    public destroy() {
        this._ghostWall = null;
        this._scene = null;


        this._eventBus.remove(Events.GAMEVIEW_HERO_MOVEMENT_START)

        document.removeEventListener("keypress", this._rotateWall);
    }

}