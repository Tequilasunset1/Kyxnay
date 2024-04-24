import * as THREE from 'three';
import { IngridientsTypes } from './Ingredients/IngridientsTypes.js';
import { BreadStorage } from './Storages/BreadStorage.js';
import { MeatStorage } from './Storages/MeatStorage.js';
import { SalatStorage } from './Storages/SalatStorage.js';
import { FishStorage } from './Storages/FishStorage.js';
import { TomatStorage } from './Storages/TomatStorage.js';
import { RiceStorage } from './Storages/RiceStorage.js';
import { PotatoStorage } from './Storages/PotatoStorage.js';

import { Table } from './Objects/Table.js';
import { PlateStorage } from './Storages/PlateStorage.js';
import { Trash } from './Objects/Trash.js';
import { FryStation } from './Objects/FryStation.js';
import { CutStation } from './Objects/CutStation.js';
import { CookStation } from './Objects/CookStation.js';
import { CompleteTable } from './Objects/CompleteTable.js';
import { Station } from './Objects/Station.js';
import { PlateTable } from './Objects/PlateTable.js';

export class Kitchen {
    objects = [];

    lvls = [1,2];
    scene;

    constructor(scene) {
        this.scene = scene;
        this.getRandomLvl();
    }

    simulate() {
        let stations = this.objects.filter(e => e instanceof Station);
        stations.forEach(e => {
            e.simulate();
        });

        window.ui.updateStationTime(stations);
    }

    getRandomLvl() {
        let wall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 30), new THREE.MeshPhongMaterial({color: 0x777777}));
        wall.position.y = 0.25;

        let wallLeft = wall.clone();
        wallLeft.position.set(-15, 0.25, 0);
        let wallRight = wallLeft.clone();
        wallRight.position.x = 15;

        let wallFront = wall.clone();
        wallFront.rotateY(Math.PI / 2);
        wallFront.position.set(0, 0.25, 8);
        let wallBack = wall.clone();
        wallBack.rotateY(Math.PI / 2);
        wallBack.position.set(0, 0.25, -15);
        this.objects.push(wallLeft, wallRight, wallFront, wallBack);
        this.scene.add(wallLeft, wallRight, wallFront, wallBack);


        let lvl = Math.floor(Math.random() * this.lvls.length);

        let breadStorage = new BreadStorage(IngridientsTypes.Bread);
        let meatStorage = new MeatStorage(IngridientsTypes.Meat);
        let salatStorage = new SalatStorage(IngridientsTypes.Salat);
        let fishStorage = new FishStorage(IngridientsTypes.Fish);
        let tomatStorage = new TomatStorage(IngridientsTypes.Water);
        let riceStorage = new RiceStorage(IngridientsTypes.Rice);
        let potatoStorage = new PotatoStorage(IngridientsTypes.Potato);
        let plateStorage = new PlateStorage();
        let trash = new Trash();
        let table1 = new PlateTable();
        let fryStation = new FryStation();

        let cutStation = new CutStation();
        let cookStation = new CookStation();
        let completeTable = new CompleteTable();
        switch(lvl) {
            case 0:
                //#region LVL_1;
                breadStorage.position.set(-8, 0, 7);
                this.objects.push(breadStorage);

                meatStorage.position.set(-5, 0, 7);
                this.objects.push(meatStorage);

                salatStorage.position.set(-2, 0, 7);
                this.objects.push(salatStorage);

                fishStorage.position.set(1, 0, 7);
                this.objects.push(fishStorage);


                tomatStorage.position.set(4, 0, 7);
                this.objects.push(tomatStorage);

                riceStorage.position.set(7, 0, 7);
                this.objects.push(riceStorage);

                potatoStorage.position.set(10, 0, 7);
                this.objects.push(potatoStorage);

                plateStorage.position.set(5, 0, 3);
                this.objects.push(plateStorage)

                trash.setPosition(-5, 0, 0);
                this.objects.push(trash);

                table1.setPosition(-4, 0, -4);
                this.objects.push(table1);

                fryStation.position.set(0,0, -7);
                this.objects.push(fryStation);

                cutStation.position.set(2,0, -7);
                this.objects.push(cutStation);

                cookStation.position.set(4,0, -7);
                this.objects.push(cookStation);

                completeTable.position.set(8,0, -7);
                this.objects.push(completeTable);
        
                this.scene.add(breadStorage, trash, fryStation, table1, meatStorage, salatStorage, fishStorage, tomatStorage, riceStorage, potatoStorage, 
                    plateStorage, cutStation, cookStation, completeTable);
                //#endregion
                break;
            case 1 :
                 //#region LVL_2;
                 
                 breadStorage.position.set(10, 0, -5);
                 this.objects.push(breadStorage);
             
                 meatStorage.position.set(10, 0, -3);
                 this.objects.push(meatStorage);
 
                 salatStorage.position.set(10, 0, -1);
                 this.objects.push(salatStorage);
               
                 fishStorage.position.set(10, 0, 1);
                 this.objects.push(fishStorage);
                 
                 tomatStorage.position.set(10, 0, 3);
                 this.objects.push(tomatStorage);
              
                 riceStorage.position.set(10, 0, 5);
                 this.objects.push(riceStorage);
                 
                 potatoStorage.position.set(10, 0, 7);
                 this.objects.push(potatoStorage);
               
                 plateStorage.position.set(-10, 0, 3);
                 this.objects.push(plateStorage)
                 
                 trash.setPosition(-10, 0, 5);
                 this.objects.push(trash);
               
                 table1.setPosition(-10, 0, 1);
                 this.objects.push(table1);
                 
                 fryStation.position.set(-10,0, 7);
                 this.objects.push(fryStation);
                
                 cutStation.position.set(-10,0, -2);
                 this.objects.push(cutStation);
 
                 cookStation.position.set(-10,0, -4);
                 this.objects.push(cookStation);
 
                 completeTable.position.set(-10,0, -6);
                 this.objects.push(completeTable);
         
                 this.scene.add(breadStorage, trash, fryStation, table1, meatStorage, salatStorage, fishStorage, tomatStorage, riceStorage, potatoStorage, 
                     plateStorage, cutStation, cookStation, completeTable);
                 //#endregion
                 break;
            case 2:
                            //#region LVL_3;
            breadStorage.position.set(-5, 0, 5);
            this.objects.push(breadStorage);
 
            meatStorage.position.set(-5, 0, 7);
            this.objects.push(meatStorage);
  
             salatStorage.position.set(0, 0, 5);
             this.objects.push(salatStorage);
   
             fishStorage.position.set(0, 0, 7);
             this.objects.push(fishStorage);

             tomatStorage.position.set(5, 0, 5);
             this.objects.push(tomatStorage);
  
             riceStorage.position.set(5, 0, 7);
             this.objects.push(riceStorage);

             potatoStorage.position.set(10, 0, 7);
             this.objects.push(potatoStorage);
   
             plateStorage.position.set(10, 0, 5);
             this.objects.push(plateStorage)

             trash.setPosition(-5, 0, -10);
             this.objects.push(trash);
   
             table1.setPosition(0, 0, -10);
             this.objects.push(table1);
     
             fryStation.position.set(5,0, -10);
              this.objects.push(fryStation);
    
            cutStation.position.set(-10,0, -2);
             this.objects.push(cutStation);
   
             cookStation.position.set(10,0, -2);
             this.objects.push(cookStation);
               
            completeTable.position.set(-10,0, 7);
            this.objects.push(completeTable);
                       
            this.scene.add(breadStorage, trash, fryStation, table1, meatStorage, salatStorage, fishStorage, tomatStorage, riceStorage, potatoStorage, 
            plateStorage, cutStation, cookStation, completeTable);
            //#endregion
             break;
            default:
                console.log(`Lelel number ${lvl} is not defined`);
        }
            
    }
}