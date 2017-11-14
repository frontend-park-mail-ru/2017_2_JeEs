import * as BABYLON from 'babylonjs'
import Constants from "../constants"
import Point from "../../utils/point";

const BASE_SIZE = Constants.BASE_SIZE;


export default class Hero {
    public static readonly DefaultHeightPosition: number = 1;

    private _position: Point;

    private _heroMesh: BABYLON.Mesh;

    private _rotation: number;

    constructor(name: string, scene: BABYLON.Scene, x: number, z: number, isGhost: boolean, rotation: number) {
        BABYLON.SceneLoader.ImportMesh("Hero", "./", "hero.babylon", scene, (newMeshes) => {

            // if (isGhost) {
            //     this._heroMesh.material.alpha = 0.2
            // }
            this._position = new Point(x, z)
            this._heroMesh = <BABYLON.Mesh>newMeshes[0]
            this._heroMesh.scaling = new BABYLON.Vector3(0.7, 0.7, 0.7);
            this._heroMesh.position = new BABYLON.Vector3(BASE_SIZE * x, BASE_SIZE * Hero.DefaultHeightPosition, BASE_SIZE * z);
            newMeshes.forEach(element => {
                element.name = name;
            });
        });
    }

    public SetPosition(position: Point) {
        this._heroMesh.position.x = position.x;
        this._heroMesh.position.z = position.y;
    }

    public GetPosition(): Point {
        return this._position;
    }

    public SetRotation(rotation: number) {
        this._rotation = rotation;
    }

    public GetRotation(): number {
        return this._rotation;
    }

    public Delete() {
        this._heroMesh.dispose();
    }

    public GetName(): string {
        return this._heroMesh.name;
    }
}