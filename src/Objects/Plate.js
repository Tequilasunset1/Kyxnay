import * as THREE from 'three';
import { MTLLoader } from 'mtl';
import { OBJLoader } from 'obj';

export class Plate extends THREE.Group{
    ingridients = new Set(); // Хранит только типы ингридиентов

    static meshSample = undefined;
    y = 0.1;
    
    constructor() {
        super();
        //this.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.2), new THREE.MeshBasicMaterial({color: 0xffffff})));

        if(Plate.meshSample == undefined) {
            Plate.meshSample = new Promise((resolve, reject) => {
                var mtlLoader = new MTLLoader();
                mtlLoader.load('./src/3D_Objects/Plate3.mtl', function(materials) {
                    materials.preload();
                    var objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load('./src/3D_Objects/Plate3.obj', function(object) {
                        const box = new THREE.Box3().setFromObject(object);
                        const size = new THREE.Vector3();
                        box.getSize(size);
                        const scaleX = 1 / size.x;
                        const scaleY = 0.1/ size.y;
                        const scaleZ = 1 / size.z;
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

        Plate.meshSample.then((mesh)=>
        {
            mesh.children.forEach((child)=>
            {
                child.castShadow = true;
                child.receiveShadow= true;
                self.add(child.clone());
            });
        });
    }

    setPosition(x, y, z) {
        this.traverse(obj => {
            obj.position.set(x, y, z);
        })
    }

    put(ingridient) {
        this.ingridients.add(ingridient.ingridientType);
        ingridient.position.y = this.y;
        this.y+=0.1;
        this.add(ingridient);
        console.log(this.ingridients)
    }
}