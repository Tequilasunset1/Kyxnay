import { BurgerDish } from "./BurgerDish.js";
import { ComboDish } from "./ComboDish.js";
import { PotatoAndMeatDish } from "./PotatoAndMeatDish.js";
import { RiceAndFishDish } from "./RiceAndFishDish.js";

export function GetDish(index) {
    switch(index) {
        case 0:
            return new BurgerDish();
        case 1:
            return new ComboDish();
        case 2:
            return new PotatoAndMeatDish();
        case 3:
            return new RiceAndFishDish();
        default:
            console.error(`${index} is undefined dish index`);
            break;
    }
}