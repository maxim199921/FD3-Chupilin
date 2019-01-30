var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getScale = function () {
        return this.scale;
    };
    return Product;
}());
var Aple = /** @class */ (function (_super) {
    __extends(Aple, _super);
    function Aple(_name, _scale) {
        var _this = _super.call(this, _name, _scale) || this;
        _this.typeName = 'fruit';
        return _this;
    }
    return Aple;
}(Product));
var Cucumber = /** @class */ (function (_super) {
    __extends(Cucumber, _super);
    function Cucumber(_name, _scale) {
        var _this = _super.call(this, _name, _scale) || this;
        _this.typeName = 'vegetables';
        return _this;
    }
    return Cucumber;
}(Product));
var Scales = /** @class */ (function () {
    function Scales() {
        this.storage = [];
    }
    Scales.prototype.addStorage = function (name) {
        this.storage = this.storage.concat([name]);
    };
    Scales.prototype.getNameList = function () {
        return this.storage.map(function (item) {
            return item.getName();
        });
    };
    Scales.prototype.getSumScale = function () {
        return this.storage.reduce(function (currValue, prevValue) {
            return currValue + prevValue.getScale();
        }, 0);
    };
    return Scales;
}());
var aple1 = new Aple('ApleFromLondon', 5.32);
var aple2 = new Aple('ApleFromBelarus', 4.23);
var Cucumber1 = new Cucumber('CucumberFromAsia', 2.78);
var Cucumber2 = new Cucumber('CucumberFromRussia', 1.13);
var scales = new Scales();
scales.addStorage(aple1);
scales.addStorage(aple2);
scales.addStorage(Cucumber1);
scales.addStorage(Cucumber2);
console.log(scales.getSumScale());
console.log(scales.getNameList());
//# sourceMappingURL=app.js.map