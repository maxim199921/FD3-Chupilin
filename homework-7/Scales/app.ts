class Product {

    readonly name: string;
    readonly scale: number;

    constructor(_name: string, _scale: number) {
        this.name = _name;
        this.scale = _scale
    }

    getName(): string {
        return this.name;
    }

    getScale(): number {
        return this.scale
    }

}

class Aple extends Product {

    typeName: string;

    constructor(_name: string, _scale: number) {
        super(_name, _scale);
        this.typeName = 'fruit';
    }

}

class Cucumber extends Product {

    typeName: string;

    constructor(_name: string, _scale: number) {
        super(_name, _scale);
        this.typeName = 'vegetables';
    }

}

class Scales {

    storage:{getName(): string, getScale(): number, name: string, scale: number, typeName: string}[];

    constructor() {
        this.storage = [];
    }

    addStorage(name :{getName(): string, getScale(): number, name: string, scale: number, typeName: string}):void {
        this.storage = [...this.storage, name];
    }

    getNameList ():string[] {
        return this.storage.map((item)=> {
            return item.getName();
        })
    }

    getSumScale():number {
        return this.storage.reduce((currValue, prevValue) => {
            return currValue + prevValue.getScale();
        }, 0);
    }

}

let aple1 = new Aple('ApleFromLondon', 5.32);
let aple2 = new Aple('ApleFromBelarus', 4.23);
let Cucumber1 = new Cucumber('CucumberFromAsia', 2.78);
let Cucumber2 = new Cucumber('CucumberFromRussia', 1.13);

let scales = new Scales();
scales.addStorage(aple1);
scales.addStorage(aple2);
scales.addStorage(Cucumber1);
scales.addStorage(Cucumber2);

console.log(scales.getSumScale());
console.log(scales.getNameList());



