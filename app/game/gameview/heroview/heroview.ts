import * as BABYLON from 'babylonjs'
import Constants from "../constants"
import Point from "../../utils/point";

import ResourcesMap from "../services/resources"


const BASE_SIZE = Constants.BASE_SIZE;


export default class Hero {
    private readonly DefaultHeightPosition: number = BASE_SIZE / 8;
    private readonly DefaultRotation: number = -Math.PI / 2;

    private _position: Point;

    private _heroMesh: BABYLON.Mesh;

    private _heroName: BABYLON.Mesh;

    constructor(name: string, scene: BABYLON.Scene, x: number, z: number, isGhost: boolean, rotation: number) {
        (new ResourcesMap).get(name, "Hero", "./meshes/", "hero.babylon", scene)
            .then((data) => {
                this._position = new Point(x, z)
                this._heroMesh = data;


                if (isGhost) {
                    const ghostHeroMaterial = new BABYLON.StandardMaterial("ghostHeroMaterial", scene);
                    ghostHeroMaterial.diffuseColor = BABYLON.Color3.Gray();
                    ghostHeroMaterial.alpha = 0.3;
                    this._heroMesh.material = ghostHeroMaterial
                }
                this._heroMesh.name = name;

                this._heroMesh.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
                this._heroMesh.position = new BABYLON.Vector3(BASE_SIZE * x, this.DefaultHeightPosition, BASE_SIZE * z);

                this._heroMesh.rotation.y = this.DefaultRotation;
                this._heroMesh.rotation.y += rotation;
            });

    }

    public SetPosition(position: Point) {
        this._heroMesh.position.x = BASE_SIZE * position.x;
        this._heroMesh.position.z = BASE_SIZE * position.y;
        this._position = position;
    }

    public GetPosition(): Point {
        return this._position;
    }

    public SetRotation(rotation: number) {
        this._heroMesh.rotation.y += rotation;
    }

    public GetRotation(): number {
        return this._heroMesh.rotation.y - this.DefaultRotation;
    }

    public Delete() {
        this._heroMesh.dispose();
    }

    public GetName(): string {
        return this._heroMesh.name;
    }

    public CheckHeroByMesh(heroMesh: BABYLON.Mesh): boolean {
        return heroMesh.name.startsWith(this._heroMesh.name)
    }
}