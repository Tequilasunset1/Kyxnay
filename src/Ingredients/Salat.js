import * as THREE from 'three';
import { Ingridient } from './Ingridient.js';
import { IngridientsTypes } from './IngridientsTypes.js';
import { MTLLoader } from 'mtl';
import { OBJLoader } from 'obj';

export class Salat extends Ingridient{

    static meshSample = undefined;

    constructor(type) {
        super(IngridientsTypes.Salat);
        this.isCooked = true;

        //this.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({color: 0x03ff31})));

        if(Salat.meshSample == undefined) {
            Salat.meshSample = new Promise((resolve, reject) => {
                var mtlLoader = new MTLLoader();
                mtlLoader.load('./src/3D_Objects/Salad.mtl', function(materials) {
                    materials.preload();
                    var objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load('./src/3D_Objects/Salad.obj', function(object) {
                        const box = new THREE.Box3().setFromObject(object);
                        const size = new THREE.Vector3();
                        box.getSize(size);
                        const scaleX = 0.4 / size.x;
                        const scaleY = 0.4 / size.y;
                        const scaleZ = 0.4 / size.z;
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

        Salat.meshSample.then((mesh)=>
        {
            mesh.children.forEach((child)=>
            {
                child.castShadow = true;
                child.receiveShadow= true;
                self.add(child.clone());
            });
        });
    }
    
}