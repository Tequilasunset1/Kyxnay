import * as THREE from 'three';

export class Ingridient extends THREE.Group{
    operations = new Set();

    constructor(type) {
        super();
        this.ingridientType = type;
        this.isCooked = false;

        // this.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({color: 0x874234})));
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z);

        this.traverse(obj => {
            obj.position.set(x, y, z);
        });
    }
}