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

    static meshSample = undefined;

    pressed;

    objInHands;

    intersectionObject;

    constructor() {
        super();

        if(Character.meshSample == undefined) {
            Character.meshSample = new Promise((resolve, reject) => {
                var mtlLoader = new MTLLoader();
                mtlLoader.load('./src/3D_Objects/Pers.mtl', function(materials) {
                    materials.preload();
                    var objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load('./src/3D_Objects/Pers.obj', function(object) {
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

        this.walkSpeed = 0.1;
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
        // TODO: СЮда хагрузчик объекта
    }
  
    put() {
        this.remove(this.objInHands);
        this.objInHands = this.intersectionObject.put(this.objInHands);
        if(this.objInHands != null) {
            AudioManager.playPolSound();
            this.objInHands.position.y = this.position.y + 2.6;
            this.add(this.objInHands);
        }
    }

    take() {
        this.objInHands = this.intersectionObject.take();
        if(this.objInHands != null) {
            AudioManager.playVzyalSound();
            this.objInHands.position.y = this.position.y + 2.6;
            this.add(this.objInHands);
        }
    }

    simulate() {
        this.hasIntersection();

        if(this.pressed.has('KeyS')) {
            this.position.z += this.walkSpeed;
        }
        if(this.pressed.has('KeyW')) {
            this.position.z -= this.walkSpeed;
        }
        if(this.pressed.has('KeyA')) {
            this.position.x -= this.walkSpeed;
        }
        if(this.pressed.has('KeyD')) {
            this.position.x += this.walkSpeed;
        }
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

    hasIntersection() {
        // const char = new THREE.Box3().setFromObject(this);
        // console.log(char)
        let object = undefined;
        window.game.kitchen.objects.forEach(obj => {
            const col = new THREE.Box3().setFromObject(obj);
            if(/*char.intersect(col)*/
                this.position.x >= col.min.x && this.position.x <= col.max.x &&
                this.position.z >= col.min.z && this.position.z <= col.max.z
            ) {
                // this.intersectionObject = obj;
                object = obj;
            }
        });
        this.intersectionObject = object;
    }


    
}