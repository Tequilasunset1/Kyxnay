import * as THREE from 'three';
import { GetIngridients } from '../Ingredients/IngridientsFactory.js';

export class Storage extends THREE.Group {
    constructor(type) {
        super();
        this.ingridientType = type;
    }

    take() {
        return GetIngridients(this.ingridientType);
    }
}