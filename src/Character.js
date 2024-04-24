import * as THREE from 'three';
import { Table } from './Objects/Table.js';
import { Storage } from './Storages/Storage.js';
import { Trash } from './Objects/Trash.js';
import { Station } from './Objects/Station.js';
import { AudioManager } from './AudioManager.js';
import { MTLLoader } from 'mtl';
import { OBJLoader } from 'obj';

export class Character extends THREE.Group {
    codes = [
        'KeyS',
        'KeyW',
        'KeyD',
        'KeyA',
        'KeyF'
    ];

    intersectRadius = 0.5;
    static meshSample = undefined;

    intersectDirection = {
        x: 0,
        z: 0
    };

    pressed;

    objInHands;

    intersectionObject;

    constructor() {
        super();

        if(Character.meshSample == undefined) {
            Character.meshSample = new Promise((resolve, reject) => {
                var mtlLoader = new MTLLoader();
                mtlLoader.load('./src/3D_Objects/Pers2.mtl', function(materials) {
                    materials.preload();
                    var objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load('./src/3D_Objects/Pers2.obj', function(object) {
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

        Character.meshSample.then((mesh)=>
        {
            mesh.children.forEach((child)=>
            {
                child.castShadow = true;
                child.receiveShadow= true;
                self.add(child.clone());
            });
        });

        this.walkSpeed = 0.1 * 2;
        this.objInHands = null;
        this.pressed = new Set();

        //this.add(new THREE.Mesh(new THREE.BoxGeometry(0.1, 5, 0.1), new THREE.MeshStandardMaterial({color: 0xffffff})));

        document.addEventListener('keydown', event => this.onKeyDown(event), false);
        document.addEventListener('keyup', event => this.onKeyUp(event), false);

        this.traverse(e => {
            e.castShadow = true;
            e.receiveShadow = true;
        })
        this.castShadow = true;
        this.receiveShadow = true;
    }
  
    put() {
        this.remove(this.objInHands);
        AudioManager.playPolSound();
        this.objInHands = this.intersectionObject.put(this.objInHands);
        if(this.objInHands != null) {
            this.objInHands.position.y = this.position.y + 1.6;
            this.add(this.objInHands);
        }
    }

    take() {
        this.objInHands = this.intersectionObject.take();
        if(this.objInHands != null) {
            AudioManager.playVzyalSound();
            this.objInHands.position.y = this.position.y+1.6;
            this.add(this.objInHands);
        }
    }

    simulate() {
        this.hasIntersection();

        // console.log(this.intersectDirection)

        let deltaX = 0, deltaZ = 0;

        if(this.pressed.has('KeyS') && this.intersectDirection.z != 1) {
            deltaZ += this.walkSpeed;
        }
        if(this.pressed.has('KeyW') && this.intersectDirection.z != -1) {
            deltaZ -= this.walkSpeed;
        }
        if(this.pressed.has('KeyA') && this.intersectDirection.x != -1) {
            deltaX -= this.walkSpeed;
        }
        if(this.pressed.has('KeyD') && this.intersectDirection.x != 1) {
            deltaX += this.walkSpeed;
        }

        let newPos = this.position.clone();
        newPos.x += deltaX;
        newPos.z += deltaZ;
        if(!this.collisionEnter(newPos)) {
            this.position.x = newPos.x;
            this.position.z = newPos.z;
        }
        // this.position.x += deltaX;
        // this.position.z += deltaZ;

        //#region Rotation
        if(deltaZ > 0 && deltaX > 0) {
          this.rotation.y = -Math.PI * 2 * 7 / 8;
          // this.rotation.y = -Math.PI * 2 * 5 / 8;
        }
        else if(deltaZ > 0 && deltaX < 0) {
          this.rotation.y = -Math.PI * 2 * 1 / 8;
          // this.rotation.y = -Math.PI * 2 * 3 / 8;
        }
        else if(deltaZ > 0) {
          this.rotation.y = Math.PI * 2 * 0 / 8;
        }
        else if(deltaZ < 0 && deltaX > 0) {
          // this.rotation.y = -Math.PI * 2 * 7 / 8;
          this.rotation.y = -Math.PI * 2 * 5 / 8;
        }
        else if(deltaZ < 0 && deltaX < 0) {
          // this.rotation.y = -Math.PI * 2 * 1 / 8;
          this.rotation.y = -Math.PI * 2 * 3 / 8;
        }
        else if(deltaZ < 0) {
          this.rotation.y = Math.PI * 2 * 4 / 8;
        }
        else if(deltaX > 0) {
          this.rotation.y = Math.PI * 2 * 2 / 8;
        }
        else if(deltaX < 0) {
          this.rotation.y = Math.PI * 2 * 6 / 8;
        }
        //#endregion
    }

    onKeyDown(event) {
        if (this.codes.includes(event.code) && !this.pressed.has(event.code)) {
            this.pressed.add(event.code);
        }

        if(this.pressed.has('KeyF')) {
            // if(this.objInHands == null && this.intersectionObject != undefined && this.intersectionObject instanceof Storage) {
            //     this.take();
            // }
            if(this.objInHands == null && this.intersectionObject != undefined && 
                (this.intersectionObject instanceof Table || this.intersectionObject instanceof Storage ||
                this.intersectionObject instanceof Station)) {
                this.take();
            }
            else if(this.objInHands != null && this.intersectionObject != undefined && 
                (this.intersectionObject instanceof Table || this.intersectionObject instanceof Trash ||
                this.intersectionObject instanceof Station)) {
                this.put();
            }
        }
        // console.log(this.pressed)
    };

    onKeyUp(event) {
        if(this.codes.includes(event.code)) this.pressed.delete(event.code);
    };

    collisionEnter(pos) {
        let flag = window.game.kitchen.objects.some(obj => {
            return this.hasIntersectionWithObject(obj, 0.1, pos);
        });
        // console.log(flag);
        return flag;
    }

    hasIntersectionWithObject(obj, actionRadius = null, pos) {
        if(actionRadius == null) actionRadius = obj.actionRadius;
        const col = new THREE.Box3().setFromObject(obj);
        if( pos.x >= col.min.x - actionRadius && pos.x <= col.max.x + actionRadius &&
            pos.z >= col.min.z - actionRadius && pos.z <= col.max.z + actionRadius
        ) {
            return true;
        }
        return false;
    }   

    hasIntersection() {
        let object = undefined;
        window.game.kitchen.objects.forEach(obj => {
            const col = new THREE.Box3().setFromObject(obj);
            if(/*char.intersect(col)*/
                this.position.x >= col.min.x - this.intersectRadius && this.position.x <= col.max.x + this.intersectRadius &&
                this.position.z >= col.min.z - this.intersectRadius && this.position.z <= col.max.z + this.intersectRadius
            ) {
                // this.intersectionObject = obj;
                object = obj;
            }
        });
        this.intersectionObject = object;
    }    
}