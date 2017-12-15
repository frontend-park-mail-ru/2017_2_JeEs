'use strict';
import * as BABYLON from 'babylonjs'


export default class ResourcesMap {
    private static __instance: ResourcesMap;
    private channels: Map<string, BABYLON.Mesh[]>;
    private mutex: boolean

    constructor() {
        if (ResourcesMap.__instance) {
            return ResourcesMap.__instance;
        }

        this.channels = new Map<string, BABYLON.Mesh[]>();

        ResourcesMap.__instance = this;
    }

    get(name: string, meshName: string, rootUrl: string, sceneFilename: string, scene: BABYLON.Scene): Promise<BABYLON.Mesh> {
        return new Promise((resolve, reject) => {
            let mesh: BABYLON.Mesh[] = this.channels.get(meshName);
            if (!mesh) {
                setTimeout(BABYLON.SceneLoader.ImportMesh(meshName, rootUrl, sceneFilename, scene, newMeshes => {
                    mesh = <BABYLON.Mesh[]>newMeshes;
                    mesh[0].isVisible = false;
                    this.channels.set(meshName, mesh);
                    let newMesh = mesh[0].clone(name)
                    resolve(newMesh);
                }, onProgress => {
                }, onError => {
                    reject()
                }), 0);
                return;
            }

            let newMesh = mesh[0].clone(name)

            resolve(newMesh);
        });
    }
}