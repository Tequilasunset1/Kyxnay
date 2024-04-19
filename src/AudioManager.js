import * as THREE from 'three';

export class AudioManager {
    static #audioLoader = new THREE.AudioLoader();
    static backgrounSound;
    static jarkaSound;
    static varkaSound;
    static cutSound;
    static vzaylSound;
    static polSound;
    audioListener;

    static async initializeSounds() {
        // Добавление прослушки для звуков
        this.audioListener = new THREE.AudioListener();
        THREE.AudioContext.listener = this.audioListener;

        window.game.camera.add(this.audioListener);

        this.backgrounSound = new THREE.Audio(this.audioListener);
        this.jarkaSound = new THREE.Audio(this.audioListener);
        this.varkaSound = new THREE.Audio(this.audioListener);
        this.cutSound = new THREE.Audio(this.audioListener);
        this.vzaylSound = new THREE.Audio(this.audioListener);
        this.polSound = new THREE.Audio(this.audioListener);


        let buffer = await new Promise((resolve, reject) => {
            this.#audioLoader.load('./src/Zvuk/Fon.mp3', resolve, undefined, reject);
        });
        this.backgrounSound.setBuffer(buffer);
        this.backgrounSound.setLoop(true);
        this.backgrounSound.setVolume(1);

        buffer = await new Promise((resolve, reject) => {
            this.#audioLoader.load('./src/Zvuk/jarka2.mp3', resolve, undefined, reject);
        });
        this.jarkaSound.setBuffer(buffer);
        this.jarkaSound.setLoop(true);
        this.jarkaSound.setVolume(1);

        buffer = await new Promise((resolve, reject) => {
            this.#audioLoader.load('./src/Zvuk/Varka.mp3', resolve, undefined, reject);
        });
        this.varkaSound.setBuffer(buffer);
        this.varkaSound.setLoop(true);
        this.varkaSound.setVolume(1);

        buffer = await new Promise((resolve, reject) => {
            this.#audioLoader.load('./src/Zvuk/Reznya.mp3', resolve, undefined, reject);
        });
        this.cutSound.setBuffer(buffer);
        this.cutSound.setLoop(true);
        this.cutSound.setVolume(1);

        buffer = await new Promise((resolve, reject) => {
            this.#audioLoader.load('./src/Zvuk/Vzayl.mp3', resolve, undefined, reject);
        });
        this.vzaylSound.setBuffer(buffer);
        this.vzaylSound.setVolume(1);

        buffer = await new Promise((resolve, reject) => {
            this.#audioLoader.load('./src/Zvuk/PolPot.mp3', resolve, undefined, reject);
        });
        this.polSound.setBuffer(buffer);
        this.polSound.setVolume(1);

    }

    static playBackgroundSound() {
        this.backgrounSound.stop();
        this.backgrounSound.play();
    }
    
    static playJarkaSound() {
        
        this.jarkaSound.play();
    }

    static stopJarkaSound() {
        this.jarkaSound.stop();
      
    }
    
    static playVarkaSound() {
        
        this.varkaSound.play();
    }

    static stopVarkaSound() {
        this.varkaSound.stop();
       
    }
    
    static playCutSound() {
       
        this.cutSound.play();
    }

    static stopCutSound() {
        this.cutSound.stop();
    }
    
    static playVzyalSound() {
        this.vzaylSound.stop();  
        this.vzaylSound.play();
    }

    static playPolSound() {
        this.polSound.stop();  
        this.polSound.play();
    }
}