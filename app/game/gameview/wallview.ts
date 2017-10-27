import * as BABYLON from 'babylonjs'
import EventBus from "../../modules/event-bus"
import Events from "../utils/events"
import Point from "../utils/point"
import Constants from "./constants"



const BASE_SIZE = Constants.BASE_SIZE


export default class WallView {

    private _ghostWall: BABYLON.Mesh;
    private _scene: BABYLON.Scene
    private _eventBus;


    constructor(scene: BABYLON.Scene) {
        this._scene = scene;

        this._ghostWall = this._createGhostWall()

        this._ghostWall.isVisible = false;

        this._eventBus = new EventBus;

        this._eventBus.on(Events.GAMEVIEW_HERO_MOVEMENT_START, (data) => {
            this._ghostWall.isVisible = false;
        })
    }

    public NewTurn() {
    }

    public AddGhostWall(point: Point) {
        const transformedCoordinate: Point = { x: Math.round(point.x / BASE_SIZE), y: Math.round(point.y / BASE_SIZE) };
        let upperOrLeft: Point;
        let lowerOrRight: Point;

        const rotation = this._rotation(point);

        if (this._ghostWall.rotation.y === 0) {
            upperOrLeft = new Point(transformedCoordinate.x, transformedCoordinate.y + 1);
            lowerOrRight = new Point(transformedCoordinate.x, transformedCoordinate.y - 1);
        } else {
            upperOrLeft = new Point(transformedCoordinate.x + 1, transformedCoordinate.y);
            lowerOrRight = new Point(transformedCoordinate.x - 1, transformedCoordinate.y);
        }

        if (this._checkСollisions([upperOrLeft, lowerOrRight, transformedCoordinate])) { 
            this._ghostWall.position.x = transformedCoordinate.x * BASE_SIZE;
            this._ghostWall.position.z = transformedCoordinate.y * BASE_SIZE;
            this._ghostWall.rotation.y = rotation
        }

        this._ghostWall.isVisible = true;
    }

    public AddWallByGhosWall() {
        this._ghostWall.material.alpha = 1;

        let upperOrLeft: Point;
        let lowerOrRight: Point;

        if (this._ghostWall.rotation.y === 0) {
            upperOrLeft = new Point(this._ghostWall.position.x / BASE_SIZE, this._ghostWall.position.z / BASE_SIZE + 1);
            lowerOrRight = new Point(this._ghostWall.position.x / BASE_SIZE, this._ghostWall.position.z / BASE_SIZE - 1);
        } else {
            upperOrLeft = new Point(this._ghostWall.position.x / BASE_SIZE + 1, this._ghostWall.position.z / BASE_SIZE);
            lowerOrRight = new Point(this._ghostWall.position.x / BASE_SIZE - 1, this._ghostWall.position.z / BASE_SIZE);
        }



        this._eventBus.emit(Events.GAMEVIEW_WALL_PLACED, { upperOrLeft, lowerOrRight });

        this._ghostWall = this._createGhostWall()
        this._ghostWall.isVisible = false;
        
    }

    public IsGhostWall(mesh: BABYLON.AbstractMesh): boolean {
        return mesh === this._ghostWall;
    }


    private _rotation(point: Point): number {
        let needRotation = Math.floor((point.x - point.y + BASE_SIZE * 17) / BASE_SIZE) % 2
            != Math.floor((point.x + point.y + BASE_SIZE * 17) / BASE_SIZE) % 2;
        return needRotation ? Math.PI / 2 : 0;
    }


    private _createGhostWall(): BABYLON.Mesh {
        const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", this._scene);
        wallMaterial.diffuseColor = BABYLON.Color3.Purple();
        wallMaterial.alpha = 0.5;
        let ghostWall = this._addWall({ x: 0, y: 2 }, { x: 0, y: 0 }, 1 / 8 + 1 / 2, wallMaterial);
        ghostWall.isVisible = false;
        return ghostWall
    }

    private _addWall(point1: Point, point2: Point, z: number, material: BABYLON.StandardMaterial): BABYLON.Mesh {
        const position = new Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
        position.x = (point1.x + point2.x) / 2;
        position.y = (point1.y + point2.y) / 2;


        const wall = BABYLON.MeshBuilder.CreateBox("wall", { width: BASE_SIZE * 3, height: BASE_SIZE, depth: BASE_SIZE / 2 }, this._scene);

        if ((point1.y - point2.y) !== 0) {
            wall.rotation.y = Math.PI / 2
        }

        wall.position = new BABYLON.Vector3(BASE_SIZE * position.x, BASE_SIZE * z, BASE_SIZE * position.y);

        wall.material = material;

        return wall
    }

    private _checkСollisions(points: Point[]) {
        for (const _point of points) {
            if (_point.x % 2 != 0 || _point.y % 2 != 0) { // || foo(_point) ) {
                return false
            }
        }
        return true
    }
}