import { GetDish } from "./Dishes/DishesFactory.js";
import * as THREE from 'three';

class Task {
    dish;
    currentTime = 0;

    constructor(dish) {
        this.dish = dish;
    }

    // TODO: вывод инфы о блюде в UI

    toComplete(plate) {
        if(this.dish.equals(plate.ingridients)) {
            console.log('Ты смешарик')
            return true;
        }
        console.log('Ты тупой')
        return false;
    }
}

export class TaskManager {
    tasksMaxCount = 3;
    tasks = [];

    clock = new THREE.Clock();
    timeSkip = 0;

    constructor() {
        this.clock.start();
    }

    createRandomTask() {
        if(this.tasksMaxCount > this.tasks.length) {
            let index = Math.floor((Math.random() * 4)); 
            let targetDish = GetDish(index);
            this.tasks.push(new Task(targetDish));
            targetDish.getInfo();
        }
    }

    taskExist(plate) {
        let tasksToRemove = []
        for(let i = 0; i < this.tasks.length; i++) {
            if(this.tasks[i].toComplete(plate)) {
                console.warn(this.tasks[i]);
                tasksToRemove.push(this.tasks[i]);
                break;
            }
        }
        tasksToRemove.forEach(e => {
            this.removeTask(e)
        });
    }
    
    removeTask(task) {
        let index = this.tasks.indexOf(task);
        if(index != -1) {
            this.tasks.splice(index, 1);
        }
    }

    simulate() {
        let delta = this.clock.getDelta();
        // console.log(delta);
        this.timeSkip += delta;
        if(this.tasks.length < this.tasksMaxCount && this.timeSkip >= 10) {
            this.timeSkip = 0;
            this.createRandomTask();
        }

        let tasksToRemove = []

        this.tasks.forEach(e => {
            e.currentTime += delta;
            if(e.currentTime >= e.dish.time) {
                console.log(`Ты не успел приготовить блюдо`);
                tasksToRemove.push(e);
            }
        });

        tasksToRemove.forEach(e => {
            this.removeTask(e);
        });
    }
}