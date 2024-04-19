import * as THREE from 'three';
import { Dish } from './Dish.js';
import { IngridientsTypes } from '../Ingredients/IngridientsTypes.js';

export class PotatoAndMeatDish extends Dish {
    constructor() {
        super();
        this.ingridients.add(IngridientsTypes.Potato);
        this.ingridients.add(IngridientsTypes.Meat);
        
    }
}