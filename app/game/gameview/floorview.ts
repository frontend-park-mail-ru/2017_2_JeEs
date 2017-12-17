import * as BABYLON from 'babylonjs';
import Constants from "./constants";

const BASE_SIZE = Constants.BASE_SIZE;

export default class FloorView {
    private _gameFieldSize: number;

    private _scene: BABYLON.Scene;

    constructor(gameFieldSize: number, scene: BABYLON.Scene) {
        this._gameFieldSize = gameFieldSize;
        this._scene = scene;
    }

    public AddFloor() {
        const floor = BABYLON.MeshBuilder.CreateBox("floor", {
            width: BASE_SIZE * this._gameFieldSize,
            height: BASE_SIZE / 4,
            depth: BASE_SIZE * this._gameFieldSize
        }, this._scene);
        const gameFieldHalf = this._gameFieldSize / 2 - 0.5;
        floor.position = new BABYLON.Vector3(BASE_SIZE * gameFieldHalf, 0, BASE_SIZE * gameFieldHalf);


        const floorMaterial = new BABYLON.StandardMaterial("floorMaterial", this._scene);
        floor.material = floorMaterial;


        this._addAllAvailablePositionOnFloor();

        // тени
        // var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        // shadowGenerator.getShadowMap().renderList.push(torus);
        // floor.receiveShadows = true;

    }

    private _addAllAvailablePositionOnFloor() {
        for (let _i = 0; _i < this._gameFieldSize; _i++) {
            if (_i % 2 === 0) {
                for (let _j = 0; _j < this._gameFieldSize; _j++) {
                    if (_j % 2 === 0) {
                        this._addAvailablePosition(_i, 1 / 8, _j);
                    }
                }
            }
        }
    }

    private _addAvailablePosition(x: number, y: number, z: number) {
        let availablePosition = BABYLON.MeshBuilder.CreateBox("availablePosition", { width: BASE_SIZE, height: BASE_SIZE / 20, depth: BASE_SIZE }, this._scene);
        availablePosition.position = new BABYLON.Vector3(BASE_SIZE * x, BASE_SIZE * y, BASE_SIZE * z);

        let availablePositionMaterial = new BABYLON.StandardMaterial("availablePositionMaterial", this._scene);
        availablePositionMaterial.diffuseColor = BABYLON.Color3.Gray();

        availablePosition.material = availablePositionMaterial;
    }
}