class Product {

    constructor(public _name: string, public _scale: number) {}

    getName(): string {
        return this._name;
    }

    getScale(): number {
        return this._scale
    }

}

interface IStorageEngine {
    addItem(item:Product):void;
    getItem(index:number):Product;
    getCount():number;
}

class Scales<StorageEngine extends IStorageEngine> {

    store:StorageEngine;

    constructor(store:StorageEngine) {
        this.store = store;
    };


    addItem(item:Product):void {
        this.store.addItem(item);
    }

    getItem(index:number):Product {
        return this.store.getItem(index);
    };

    getCount():number {
        return this.store.getCount();
    };


    getSumScale(): number {
        let sumScale: number = 0,
            count = this.store.getCount();
        for (let i = 0; i < count; i++) {
            sumScale += this.store.getItem(i).getScale();
        }
        return sumScale;
    }

    getNameList(): string[] {
        let nameArray: string[] = [],
            count = this.store.getCount();
        for (let i = 0; i < count; i++) {
            nameArray.push(this.store.getItem(i).getName());
        }
        return nameArray;
    }

}
class ScalesStorageEngineArr implements IStorageEngine {

    items:Product[] = [];

    addItem(item:Product):void {
        this.items.push(item);
    };

    getItem(index:number):Product {
        return this.items[index];
    };

    getCount():number {
        return this.items.length;
    };
}

class ScalesStorageEngineLS implements IStorageEngine {

    items:Product[] = [];

    addItem(item:Product):void {
        this.items.push(item);
        localStorage['products_Storage'] = JSON.stringify(this.items);
    };

    getItem(index:number):Product {
        let list = JSON.parse(localStorage['products_Storage']);
        return new Product(list[index]._name, list[index]._scale);
    };

    getCount():number {
        return JSON.parse(localStorage['products_Storage']).length;
    };
}

let aple1 = new Product('ApleFromLondon', 5.32);
let aple2 = new Product('ApleFromBelarus', 4.23);
let Cucumber1 = new Product('CucumberFromAsia', 2.78);
let Cucumber2 = new Product('CucumberFromRussia', 1.13);
let Cucumber3 = new Product('CucumberFromNigeria', 3.25);

const scales1:Scales<ScalesStorageEngineArr> = new Scales(new ScalesStorageEngineArr());
const scales2:Scales<ScalesStorageEngineLS> = new Scales(new ScalesStorageEngineLS());

scales1.addItem(aple1);
scales1.addItem(Cucumber1);
console.log(scales1.getCount());
console.log(scales1.getItem(0));
console.log(scales1.getItem(1));

scales2.addItem(aple2);
scales2.addItem(Cucumber2);
scales2.addItem(Cucumber3);
console.log(scales2.getCount());
console.log(scales2.getItem(0));
console.log(scales2.getItem(1));
console.log(scales2.getItem(2));

console.log(scales1.getSumScale(), scales1.getNameList());
console.log(scales2.getSumScale(), scales2.getNameList());




