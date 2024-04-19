import * as THREE from 'three';
import { IngridientsTypes } from './IngridientsTypes.js';
import { Ingridient } from './Ingridient.js';
import { Meat } from './Meat.js';
import { Salat } from './Salat.js';
import { Tomat } from './Tomat.js';
import { Fish } from './Fish.js';
import { Potato } from './Potato.js';
import { Bread } from './Bread.js';
import { Rice } from './Rice.js';

export function GetIngridients(type) {
    switch(type) {
        case IngridientsTypes.Meat:
            return new Meat();
        case IngridientsTypes.Salat:
            return new Salat();
        case IngridientsTypes.Tomat:
            return new Tomat();
        case IngridientsTypes.Fish:
            return new Fish();
        case IngridientsTypes.Potato:
            return new Potato();
        case IngridientsTypes.Bread:
            return new Bread();
        case IngridientsTypes.Rice:
            return new Rice();
        default:
            console.error(`${type} is an undefined ingredient`);
            return null; 
    }
}