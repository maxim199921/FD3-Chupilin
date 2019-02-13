var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this._name = _name;
        this._scale = _scale;
    }
    Product.prototype.getName = function () {
        return this._name;
    };
    Product.prototype.getScale = function () {
        return this._scale;
    };
    return Product;
}());
var Scales = /** @class */ (function () {
    function Scales(store) {
        this.data = store.items;
        this.store = store;
    }
    ;
    Scales.prototype.getSumScale = function () {
        return this.data.reduce(function (currValue, prevValue) {
            return currValue + prevValue.getScale();
        }, 0);
    };
    Scales.prototype.getNameList = function () {
        return this.data.map(function (item) {
            return item.getName();
        });
    };
    Scales.prototype.addItem = function (item) {
        this.store.addItem(item);
    };
    Scales.prototype.getItem = function (index) {
        return this.store.getItem(index);
    };
    ;
    Scales.prototype.getCount = function () {
        return this.store.getCount();
    };
    ;
    return Scales;
}());
var ScalesStorageEngineArr = /** @class */ (function () {
    function ScalesStorageEngineArr() {
        this.items = [];
    }
    ScalesStorageEngineArr.prototype.addItem = function (item) {
        this.items.push(item);
    };
    ;
    ScalesStorageEngineArr.prototype.getItem = function (index) {
        return this.items[index];
    };
    ;
    ScalesStorageEngineArr.prototype.getCount = function () {
        return this.items.length;
    };
    ;
    return ScalesStorageEngineArr;
}());
var ScalesStorageEngineLS = /** @class */ (function () {
    function ScalesStorageEngineLS() {
        this.items = [];
    }
    ScalesStorageEngineLS.prototype.addItem = function (item) {
        this.items.push(item);
        localStorage['products_Storage'] = JSON.stringify(this.items);
    };
    ;
    ScalesStorageEngineLS.prototype.getItem = function (index) {
        var list = JSON.parse(localStorage['products_Storage']);
        return new Product(list[index]._name, list[index]._scale);
    };
    ;
    ScalesStorageEngineLS.prototype.getCount = function () {
        return JSON.parse(localStorage['products_Storage']).length;
    };
    ;
    return ScalesStorageEngineLS;
}());
var aple1 = new Product('ApleFromLondon', 5.32);
var aple2 = new Product('ApleFromBelarus', 4.23);
var Cucumber1 = new Product('CucumberFromAsia', 2.78);
var Cucumber2 = new Product('CucumberFromRussia', 1.13);
var Cucumber3 = new Product('CucumberFromNigeria', 3.25);
var scales1 = new Scales(new ScalesStorageEngineArr());
var scales2 = new Scales(new ScalesStorageEngineLS());
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
//# sourceMappingURL=app.js.map