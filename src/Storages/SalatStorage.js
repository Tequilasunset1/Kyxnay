import * as THREE from 'three';
import { GetIngridients } from '../Ingredients/IngridientsFactory.js';
import { Storage } from './Storage.js';
import { IngridientsTypes } from '../Ingredients/IngridientsTypes.js';

export class SalatStorage extends Storage {
    constructor() {
        super(IngridientsTypes.Salat);
        console.log(this.ingridientType)
        this.add(new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({color: 0x03ff31})));
    }
}