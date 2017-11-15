import * as BABYLON from 'babylonjs'
import Constants from "../constants"
import Point from "../../utils/point";

const BASE_SIZE = Constants.BASE_SIZE;


export default class Hero {
    public static readonly DefaultHeightPosition: number = BASE_SIZE / 8;

    private _position: Point;

    private _heroMeshes: BABYLON.Mesh[];

    private _rotation: number;

    constructor(name: string, scene: BABYLON.Scene, x: number, z: number, isGhost: boolean, rotation: number) {
        BABYLON.SceneLoader.ImportMesh("Hero", "./", "hero.babylon", scene, (newMeshes) => {
            // if (isGhost) {
            //     this._heroMesh.material.alpha = 0.2
            // }
            this._position = new Point(x, z)
            this._heroMeshes = <BABYLON.Mesh[]>newMeshes
            this._heroMeshes[0].scaling = new BABYLON.Vector3(0.7, 0.7, 0.7);
            this._heroMeshes[0].position = new BABYLON.Vector3(BASE_SIZE * x, Hero.DefaultHeightPosition, BASE_SIZE * z);
            newMeshes.forEach(element => {
                element.name = name;
            });
        });
    }

    public SetPosition(position: Point) {
        this._heroMeshes[0].position.x = BASE_SIZE * position.x;
        this._heroMeshes[0].position.z = BASE_SIZE * position.y;
        this._position = position;
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
        this._heroMeshes[0].dispose();
    }

    public GetName(): string {
        return this._heroMeshes[0].name;
    }

    public CheckHeroByMesh(heroMesh: BABYLON.Mesh): boolean {
        return this._heroMeshes.indexOf(heroMesh) !== -1;
    }
}