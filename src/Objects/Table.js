import * as THREE from 'three';
import { Plate } from './Plate.js';
import { Ingridient } from '../Ingredients/Ingridient.js';

export class Table extends THREE.Group {
    objOnTable = null;

    constructor() {
        super();

        // this.add(new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({color: 0x126619})));
    }

    put(object) {
        if(object instanceof Plate && this.objOnTable == null) {
            this.objOnTable = object;
            return null;
        }
        else if(object instanceof Ingridient && this.objOnTable instanceof Plate && 
            object.isCooked/*!this.objOnTable.ingridients.has(object)*/) {
            this.objOnTable.put(object);
            return null;
        }
        return object;
    }

    take() {
        let obj = this.objOnTable;
        this.objOnTable = null;
        return obj;
    }
}