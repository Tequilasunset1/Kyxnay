import * as THREE from 'three';
import { Station } from './Station.js';
import { OperationsTypes } from './OperationTypes.js';
import { AudioManager } from '../AudioManager.js';
import { MTLLoader } from 'mtl';
import { OBJLoader } from 'obj';


export class FryStation extends Station {

    static meshSample = undefined;

    constructor() {
        super(OperationsTypes.Fry)
      //  this.add(new THREE.Mesh(new THREE.BoxGeometry(2,2,2), new THREE.MeshBasicMaterial({color: 0x112233})))

        
      if(FryStation.meshSample == undefined) {
        FryStation.meshSample = new Promise((resolve, reject) => {
            var mtlLoader = new MTLLoader();
            mtlLoader.load('./src/3D_Objects/FryStation.mtl', function(materials) {
                materials.preload();
                var objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.load('./src/3D_Objects/FryStation.obj', function(object) {
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

    FryStation.meshSample.then((mesh)=>
    {
        mesh.children.forEach((child)=>
        {
            child.castShadow = true;
            child.receiveShadow= true;
            self.add(child.clone());
        });
    });
    }

    put(ingredient) {
        let ret = super.put(ingredient);
        if(ret == null) AudioManager.playJarkaSound();
        return ret;
    }
    
    take() {
        let ret = super.take();
        if(ret != null) AudioManager.stopJarkaSound();
        return ret;
    }
}