import * as THREE from 'three';
import { MTLLoader } from 'mtl';
import { OBJLoader } from 'obj';

export class Trash extends THREE.Group {

    static meshSample = undefined;

    constructor() {
        super();

       // this.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x000000})));

        if(Trash.meshSample == undefined) {
            Trash.meshSample = new Promise((resolve, reject) => {
                var mtlLoader = new MTLLoader();
                mtlLoader.load('./src/3D_Objects/Trash.mtl', function(materials) {
                    materials.preload();
                    var objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load('./src/3D_Objects/Trash.obj', function(object) {
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

        Trash.meshSample.then((mesh)=>
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

    put(object) {
        return null;
    }
}