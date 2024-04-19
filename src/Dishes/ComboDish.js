import * as THREE from 'three';
import { Dish } from './Dish.js';
import { IngridientsTypes } from '../Ingredients/IngridientsTypes.js';

export class ComboDish extends Dish {
    constructor() {
        super();
        this.ingridients.add(IngridientsTypes.Potato);
        this.ingridients.add(IngridientsTypes.Meat);
        this.ingridients.add(IngridientsTypes.Salat);
        this.ingridients.add(IngridientsTypes.Bread);
        this.ingridients.add(IngridientsTypes.Fish);
    }
}