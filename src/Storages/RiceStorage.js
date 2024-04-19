import * as THREE from 'three';
import { GetIngridients } from '../Ingredients/IngridientsFactory.js';
import { Storage } from './Storage.js';
import { IngridientsTypes } from '../Ingredients/IngridientsTypes.js';
import { MTLLoader } from 'mtl';
import { OBJLoader } from 'obj';


export class RiceStorage extends Storage {

    static meshSample = undefined;

    constructor() {
        super(IngridientsTypes.Rice);

        if(RiceStorage.meshSample == undefined) {
            RiceStorage.meshSample = new Promise((resolve, reject) => {
                var mtlLoader = new MTLLoader();
                mtlLoader.load('./src/3D_Objects/RiceSG.mtl', function(materials) {
                    materials.preload();
                    var objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load('./src/3D_Objects/RiceSG.obj', function(object) {
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

        RiceStorage.meshSample.then((mesh)=>
        {
            mesh.children.forEach((child)=>
            {
                child.castShadow = true;
                child.receiveShadow= true;
                self.add(child.clone());
            });
        });

        console.log(this.ingridientType)
        //this.add(new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({color: 0xffffff})));
    }
}