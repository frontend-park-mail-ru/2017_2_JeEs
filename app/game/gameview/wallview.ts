import * as BABYLON from 'babylonjs'
import EventBus from "../../modules/event-bus"
import Events from "../utils/events"
import Point from "../utils/point"
import Constants from "./constants"
import { Vector3 } from 'babylonjs';
import ResourcesMap from "./services/resources"



const BASE_SIZE = Constants.BASE_SIZE


export default class WallView {

    private _ghostWall: BABYLON.Mesh;
    private _scene: BABYLON.Scene
    private _eventBus;
    private _engagedPoints: Point[] = []

    private readonly DefaultHeightPosition: number = 0;

    constructor(scene: BABYLON.Scene) {
        this._scene = scene;

        this._createGhostWall()


        this._eventBus = new EventBus;

        this._eventBus.on(Events.GAMEVIEW_HERO_MOVEMENT_START, (data) => {
            this._ghostWall.isVisible = false;
        })
    }

    public NewTurn(engagedPoints: Point[], isCurrentHero: boolean) {
        if (isCurrentHero) {
            this._engagedPoints = engagedPoints;
        } else {
            this._engagedPoints = engagedPoints.map((point: Point) => {
                return new Point(16 - point.x, 16 - point.y)
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

        if (this._checkCollisions([upperOrLeft, transformedCoordinate, lowerOrRight])) {
            this._ghostWall.position.x = transformedCoordinate.x * BASE_SIZE;
            this._ghostWall.position.z = transformedCoordinate.y * BASE_SIZE;
            this._ghostWall.rotation.y = rotation;
            this._ghostWall.isVisible = true;
        }

    }

    public AddWallByGhosWall() {
        this._ghostWall.material.alpha = 1;
        this._ghostWall.name = "wall"
        
        let upperOrLeft: Point;
        let lowerOrRight: Point;

        if (this._ghostWall.rotation.y === 0) {
            upperOrLeft = new Point(this._ghostWall.position.x / BASE_SIZE, this._ghostWall.position.z / BASE_SIZE + 1);
            lowerOrRight = new Point(this._ghostWall.position.x / BASE_SIZE, this._ghostWall.position.z / BASE_SIZE - 1);
        } else {
            upperOrLeft = new Point(this._ghostWall.position.x / BASE_SIZE - 1, this._ghostWall.position.z / BASE_SIZE);
            lowerOrRight = new Point(this._ghostWall.position.x / BASE_SIZE + 1, this._ghostWall.position.z / BASE_SIZE);
        }


        this._eventBus.emit(Events.GAMEVIEW_WALL_PLACED, { upperOrLeft, lowerOrRight });

        this._createGhostWall()
    }

    public IsGhostWall(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.name === "ghostWall";
    }

    public OpponentsWallPlaced(...wallPoints) {
        let [upperOrLeft, lowerOrRight] = wallPoints;

        const position = new Point((upperOrLeft.x + lowerOrRight.x) / 2, (upperOrLeft.y + lowerOrRight.y) / 2);

        let rotation: number = (upperOrLeft.y - lowerOrRight.y === 0) ? Math.PI / 2 : 0;
        this._ghostWall.rotation.y = rotation;

        this._ghostWall.position = new BABYLON.Vector3(BASE_SIZE * position.x, this.DefaultHeightPosition, BASE_SIZE * position.y);
        this._ghostWall.isVisible = true;
        this._ghostWall.material.alpha = 1;
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

        (new ResourcesMap).get("ghostWall", "Wall", "./meshes/", "wall.babylon", this._scene)
            .then((data) => {
                const position = new Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);

                this._ghostWall = data;

                this._ghostWall.name = "ghostWall"

                if ((point1.y - point2.y) === 0) {
                    this._ghostWall.rotation.y = Math.PI / 2
                }

                this._ghostWall.position = new BABYLON.Vector3(BASE_SIZE * position.x, this.DefaultHeightPosition, BASE_SIZE * position.y);

                this._ghostWall.isVisible = false;

                const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", this._scene);
                wallMaterial.diffuseColor = BABYLON.Color3.Gray();
                wallMaterial.alpha = 0.5;

                this._ghostWall.material = wallMaterial;
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
        return true
    }
}