'use strict';
import * as BABYLON from 'babylonjs'


export default class ResourcesMap {
    private static __instance: ResourcesMap;
    private channels: Map<string, BABYLON.Mesh[]>;
    private mutex : boolean

    constructor() {
        if (ResourcesMap.__instance) {
            return ResourcesMap.__instance;
        }

        this.channels = new Map<string, BABYLON.Mesh[]>();

        ResourcesMap.__instance = this;
    }

    async check() {
        while (this.mutex) {
            console.log(1)
        }
        console.log(3)        
    }

    get(name, meshName: string, rootUrl: string, sceneFilename: string, scene: BABYLON.Scene): BABYLON.Mesh {

        let mesh: BABYLON.Mesh[] = this.channels.get(meshName);
        if (!mesh) {
            this.mutex = true
            setTimeout(BABYLON.SceneLoader.ImportMesh(meshName, rootUrl, sceneFilename, scene, newMeshes => {
                mesh = <BABYLON.Mesh[]>newMeshes;
                this.mutex = false
                debugger;
            }, onProgress => {
                console.log(5)
            }, onError => {
                this.mutex = false
            }), 0);

            debugger;
            // while (!mesh) {
            // debugger;
            this.check()
            // }

            debugger;

            this.channels.set(meshName, mesh);
            debugger;
        }

        console.log(2)
        let newMesh = mesh[0].clone(name)

        return newMesh;
    }
}