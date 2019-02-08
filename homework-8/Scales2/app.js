var Aple = /** @class */ (function () {
    function Aple(_name, _scale, typeName) {
        if (typeName === void 0) { typeName = 'fruit'; }
        this._name = _name;
        this._scale = _scale;
        this.typeName = typeName;
    }
    Aple.prototype.getName = function () {
        return this._name;
    };
    Aple.prototype.getScale = function () {
        return this._scale;
    };
    return Aple;
}());
var Cucumber = /** @class */ (function () {
    function Cucumber(_name, _scale, typeName) {
        if (typeName === void 0) { typeName = 'vegetables'; }
        this._name = _name;
        this._scale = _scale;
        this.typeName = typeName;
    }
    Cucumber.prototype.getName = function () {
        return this._name;
    };
    Cucumber.prototype.getScale = function () {
        return this._scale;
    };
    return Cucumber;
}());
var Scales = /** @class */ (function () {
    function Scales() {
        this.storage = [];
    }
    Scales.prototype.addStorage = function (name) {
        this.storage.push(name);
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