import * as BABYLON from 'babylonjs'
import Constants from "../constants"
import Point from "../../utils/point";

const BASE_SIZE = Constants.BASE_SIZE;


export default class Hero {
    private readonly DefaultHeightPosition: number = BASE_SIZE / 8;
    private readonly DefaultRotation: number = -Math.PI / 2;

    private _position: Point;

    private _heroMeshes: BABYLON.Mesh[];

    constructor(name: string, scene: BABYLON.Scene, x: number, z: number, isGhost: boolean, rotation: number) {
        BABYLON.SceneLoader.ImportMesh("Hero", "./", "hero.babylon", scene, newMeshes => {
            this._position = new Point(x, z)
            this._heroMeshes = <BABYLON.Mesh[]>newMeshes;

            if (isGhost) {
                const ghostHeroMaterial = new BABYLON.StandardMaterial("ghostHeroMaterial", scene);
                ghostHeroMaterial.diffuseColor = BABYLON.Color3.Gray();
                ghostHeroMaterial.alpha = 0.3;
                newMeshes.forEach(element => {
                    element.name = name;                    
                    element.material = ghostHeroMaterial;
                });
            } else {
                newMeshes.forEach(element => {
                    element.name = name;
                });
            }

            this._heroMeshes[0].scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
            this._heroMeshes[0].position = new BABYLON.Vector3(BASE_SIZE * x, this.DefaultHeightPosition, BASE_SIZE * z);

            this._heroMeshes[0].rotation.y = this.DefaultRotation;
            this._heroMeshes[0].rotation.y += rotation;

            // this._heroMeshes[3].material = ghostHeroMaterial
            // this._heroMeshes[4].material = ghostHeroMaterial
            // this._heroMeshes[5].material = ghostHeroMaterial
            // this._heroMeshes[7].material = ghostHeroMaterial
            // this._heroMeshes[13].material = ghostHeroMaterial
            
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
        this._heroMeshes[0].rotation.y += rotation;
    }

    public GetRotation(): number {
        return this._heroMeshes[0].rotation.y - this.DefaultRotation;
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