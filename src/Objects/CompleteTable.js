import { Plate } from "./Plate.js";
import { Table } from "./Table.js";
import { MTLLoader } from 'mtl';
import { OBJLoader } from 'obj';
import * as THREE from 'three';

export class CompleteTable extends Table {

    static meshSample = undefined;

    constructor() {
        super();

        if(CompleteTable.meshSample == undefined) {
            CompleteTable.meshSample = new Promise((resolve, reject) => {
                var mtlLoader = new MTLLoader();
                mtlLoader.load('./src/3D_Objects/Complete.mtl', function(materials) {
                    materials.preload();
                    var objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load('./src/3D_Objects/Complete.obj', function(object) {
                        const box = new THREE.Box3().setFromObject(object);
                        const size = new THREE.Vector3();
                        box.getSize(size);
                        const scaleX = 1.5 / size.x;
                        const scaleY = 1.5 / size.y;
                        const scaleZ = 1.5 / size.z;
                        object.scale.set(scaleX, scaleY, scaleZ);
                        object.traverse(function(object) {
                            object.scale.set(scaleX, scaleY, scaleZ);
                        });
                        const mesh = object;
                        resolve(mesh);
                    }.bind(this), undefined);
                }.bind(this));
            });
        }
    
        const self = this;
    
        CompleteTable.meshSample.then((mesh)=>
        {
            mesh.children.forEach((child)=>
            {
                child.castShadow = true;
                child.receiveShadow= true;
                self.add(child.clone());
            });
        });
    }

    put(object) {
        if(object instanceof Plate) {
            window.game.taskManager.taskExist(object);
            return null;
        }
        return object;
    }

    take() {
        return null;
    }
}