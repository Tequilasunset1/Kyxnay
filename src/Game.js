import * as THREE from 'three';
import { Kitchen } from './Kitchen.js';
import { Character } from './Character.js';
import { TaskManager } from './TaskManager.js';
import { AudioManager } from './AudioManager.js';
import { Bread } from './Ingredients/Bread.js';
import { Fish } from './Ingredients/Fish.js';
import { Meat } from './Ingredients/Meat.js';
import { Potato } from './Ingredients/Potato.js';
import { Rice } from './Ingredients/Rice.js';
import { Salat } from './Ingredients/Salat.js';
import { Tomat } from './Ingredients/Tomat.js';

export class Game {
    scene;
    renderer;
    plane;
    grid;
    camera;
    gameWindow;
    taskManager;

    constructor() {
        this.gameWindow = document.getElementById('render-target');

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.gameWindow.offsetWidth, this.gameWindow.offsetHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.gameWindow.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.resizeWindow, false);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x00077);

        this.camera = new THREE.PerspectiveCamera(75, this.gameWindow.offsetWidth / this.gameWindow.offsetHeight, 0.1, 1000);
        this.camera.position.set(0, 10, 10);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
    
        this.plane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30, 30, 30), new THREE.MeshPhongMaterial({color: 0x007700}))
        this.plane.position.set(0,0,0);
        this.plane.rotateX(-Math.PI / 2);
        this.plane.castShadow = true;
        this.plane.receiveShadow = true;

        this.grid = new THREE.GridHelper(30, 30);
        this.grid.position.set(0,0.01,0);

        this.scene.add(this.camera, this.plane, this.grid);

        this.kitchen = new Kitchen(this.scene);
        this.taskManager = null;
        // this.taskManager.createRandomTask();///////////////////////////////////////////////////////
        // this.taskManager.createRandomTask();///////////////////////////////////////////////////////
        // this.taskManager.createRandomTask();///////////////////////////////////////////////////////

        this.character = new Character();
        this.character.position.set(0,0,0);
        this.scene.add(this.character);

        this.setupLights();

        // this.renderer.setAnimationLoop(this.render);
    }

    prerender = () => {
        this.renderer.render(this.scene, this.camera);
    }

    render = () => {
        this.character.simulate();

        this.taskManager.simulate();
        this.kitchen.simulate();

        this.renderer.render(this.scene, this.camera);
    }

    setupLights() {
        let light1 = new THREE.PointLight(0xffffff, 500);
        light1.position.set(-5, 8, 0);

        light1.castShadow = true;
        light1.shadow.mapSize.width= 1024;
        light1.shadow.mapSize.height = 1024;

        light1.shadow.camera.near = 0.1;
        light1.shadow.camera.far = 30;
        light1.shadow.normalBias = 0.01;
        this.scene.add(light1);

        let light2 = new THREE.PointLight(0xffffff, 500);
        light2.position.set(5, 8, 0);

        light2.castShadow = true;
        light2.shadow.mapSize.width= 1024;
        light2.shadow.mapSize.height = 1024;

        light2.shadow.camera.near = 0.1;
        light2.shadow.camera.far = 100;
        light2.shadow.normalBias = 0.01;
        this.scene.add(light2);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    }

    resizeWindow = () => {
        this.camera.aspect = this.gameWindow.offsetWidth / this.gameWindow.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.gameWindow.offsetWidth, this.gameWindow.offsetHeight);
    }

}

function keydownHandler(event) {
    document.getElementById('root-window').style.display = 'flex';
    document.getElementById('Loading-window').style.display = 'none';
    window.game.resizeWindow();
    window.game.taskManager = new TaskManager();
    window.game.taskManager.createRandomTask();
    window.game.renderer.setAnimationLoop(window.game.render);
    AudioManager.playBackgroundSound();
    document.removeEventListener('keydown', keydownHandler);
  }
  
  window.onload = async () => {
    window.game = new Game();
    window.game.renderer.setAnimationLoop(window.game.prerender);
    await AudioManager.initializeSounds();

    let ingridients = [new Bread(), new Fish(), new Meat(), new Potato(), new Rice(), new Salat(), new Tomat()];
    ingridients.forEach(e => {
        window.game.scene.add(e);
    });

    await new Promise(r => setTimeout(r, 10000)); // тип время для загрузки текстурок ))))

    ingridients.forEach(e => {
        window.game.scene.remove(e);
    });

    // Добавление обработчика нажатия клавиши
    document.addEventListener('keydown', keydownHandler);
    document.getElementById('load-info').innerHTML = 'Press any button';
  };  

