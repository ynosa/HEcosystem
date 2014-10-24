import { galaxy } from 'npm:galaxy';


console.log("entering es");

var fn = (x , y)  => x;
//var wrapped=galaxy.star(fn);



export var fn;

export class q {
    constructor() {
        this.es6 = 'yay';
    }
    attack(target) {
        console.log('The monster attacks ' + target);
    }
}

console.log("Exiting es");