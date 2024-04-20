import * as THREE from 'three';
import { OperationsTypes } from './OperationTypes.js';
import { Ingridient } from '../Ingredients/Ingridient.js';

export class Station extends THREE.Group {
    cookedObject = null;

    clock = new THREE.Clock();
    maxTime = 5;
    elapsedTime = 0;

    getName() {
        return this.constructor.name;
    }

    getTime() {
        if(this.clock.running) return Math.floor(this.maxTime - this.elapsedTime);
        else if(this.cookedObject != null) return 'Wait';
        return 'Free';
    }

    constructor(operationType) {
       super();
       this.operationType = operationType;
    }

   put(ingredient) {
    console.log(ingredient.isCooked)
    if(ingredient instanceof Ingridient && this.cookedObject == null && !ingredient.isCooked && ingredient.operations.has(this.operationType)) {
        this.clock.start();
        this.cookedObject = ingredient;
        return null;
    }
    return ingredient;
   }

   take() {
    if(!this.clock.running && this.cookedObject != null) {
        // this.cookedObject.isCooked = true;
        let temp = this.cookedObject;
        this.cookedObject = null;
        return temp;
    }
    return null;
   }

   simulate() {
    if(this.clock.running) {
        let delta = this.clock.getDelta();
        this.elapsedTime += delta;
        if(this.maxTime <= this.elapsedTime) {
            this.elapsedTime = 0;
            this.clock.stop();
            this.cookedObject.isCooked = true;
            console.log(this.cookedObject.isCooked)
        }
    }
   }
}