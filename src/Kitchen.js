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

    lvls = [1];
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
        let lvl = Math.floor(Math.random() * this.lvls.length);
        switch(lvl) {
            case 0:
                //#region LVL_1;
                let breadStorage = new BreadStorage(IngridientsTypes.Bread);
                breadStorage.position.set(-8, 0, 7);
                this.objects.push(breadStorage);

                let meatStorage = new MeatStorage(IngridientsTypes.Meat);
                meatStorage.position.set(-5, 0, 7);
                this.objects.push(meatStorage);

                let salatStorage = new SalatStorage(IngridientsTypes.Salat);
                salatStorage.position.set(-2, 0, 7);
                this.objects.push(salatStorage);

                let fishStorage = new FishStorage(IngridientsTypes.Fish);
                fishStorage.position.set(1, 0, 7);
                this.objects.push(fishStorage);

                let tomatStorage = new TomatStorage(IngridientsTypes.Water);
                tomatStorage.position.set(4, 0, 7);
                this.objects.push(tomatStorage);

                let riceStorage = new RiceStorage(IngridientsTypes.Rice);
                riceStorage.position.set(7, 0, 7);
                this.objects.push(riceStorage);

                let potatoStorage = new PotatoStorage(IngridientsTypes.Rice);
                potatoStorage.position.set(10, 0, 7);
                this.objects.push(potatoStorage);

                let plateStorage = new PlateStorage()
                plateStorage.position.set(5, 0, 3);
                this.objects.push(plateStorage)

                let trash = new Trash();
                trash.setPosition(-5, 0, 0);
                this.objects.push(trash);

                let table1 = new PlateTable();
                table1.setPosition(-4, 0, -4);
                this.objects.push(table1);

                let fryStation = new FryStation();
                fryStation.position.set(0,0, -7);
                this.objects.push(fryStation);

                let cutStation = new CutStation();
                cutStation.position.set(2,0, -7);
                this.objects.push(cutStation);

                let cookStation = new CookStation();
                cookStation.position.set(4,0, -7);
                this.objects.push(cookStation);

                let completeTable = new CompleteTable();
                completeTable.position.set(8,0, -7);
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