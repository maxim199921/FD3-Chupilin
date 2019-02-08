interface IScalable {
    getName():string;
    getScale():number;
}


class Aple implements IScalable {

    constructor(private _name: string, private _scale: number, private typeName:string = 'fruit') {}

    getName(): string {
        return this._name;
    }

    getScale(): number {
        return this._scale
    }

}

class Cucumber implements IScalable {

    constructor(private _name: string, private _scale: number, private typeName:string = 'vegetables') {}

    getName(): string {
        return this._name;
    }

    getScale(): number {
        return this._scale
    }

}

class Scales {

    storage: IScalable[];

    constructor() {
        this.storage = [];
    }

    public addStorage(name: IScalable):void {
        this.storage.push(name);
    }

    public getNameList ():string[] {
        return this.storage.map((item)=> {
            return item.getName();
        })
    }

    public getSumScale():number {
        return this.storage.reduce((currValue, prevValue) => {
            return currValue + prevValue.getScale();
        }, 0);
    }

}

let aple1 = new Aple('ApleFromLondon', 5.32);
let aple2:IScalable = new Aple('ApleFromBelarus', 4.23);
let Cucumber1:IScalable = new Cucumber('CucumberFromAsia', 2.78);
let Cucumber2:IScalable = new Cucumber('CucumberFromRussia', 1.13);

let scales = new Scales();
scales.addStorage(aple1);
scales.addStorage(aple2);
scales.addStorage(Cucumber1);
scales.addStorage(Cucumber2);

console.log(scales.getSumScale());
console.log(scales.getNameList());




