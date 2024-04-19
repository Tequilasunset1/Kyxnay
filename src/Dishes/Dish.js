import * as THREE from 'three';

export class Dish extends THREE.Group {
    ingridients = new Set();
    time = 60;

    constructor() {
        super();
    }

    equals(ingridients) {
        let count = this.ingridients.size;
        let flag = true;
        ingridients.forEach(e => {
            if(!this.ingridients.has(e)) {
                flag = false;
                return;
            }
            --count;
        });

        if(count != 0 || !flag) {
            return false;
        }
        return true;
    }

    getInfo() {
        console.log(`Сделай мне ${this.constructor.name} из `);
        this.ingridients.forEach(e => {
            console.log(e);
        });
    }
}