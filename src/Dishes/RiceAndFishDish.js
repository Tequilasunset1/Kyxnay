import * as THREE from 'three';
import { Dish } from './Dish.js';
import { IngridientsTypes } from '../Ingredients/IngridientsTypes.js';

export class RiceAndFishDish extends Dish {
    constructor() {
        super();
        this.ingridients.add(IngridientsTypes.Rice);
        this.ingridients.add(IngridientsTypes.Fish);
    }
}