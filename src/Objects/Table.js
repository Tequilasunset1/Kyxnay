import * as THREE from 'three';
import { Plate } from './Plate.js';
import { Ingridient } from '../Ingredients/Ingridient.js';

export class Table extends THREE.Group {
    objOnTable = null;

    constructor() {
        super();

        // this.add(new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({color: 0x126619})));
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z);
        this.traverse(obj => {
            obj.position.set(x, y, z);
        });
    }

    put(object) {
        if(object instanceof Plate && this.objOnTable == null) {
            this.objOnTable = object;
            this.objOnTable.position.set(0, this.position.y + 1.6, 0);
            this.add(this.objOnTable);
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
        this.remove(this.objOnTable);
        this.objOnTable = null;
        return obj;
    }
}