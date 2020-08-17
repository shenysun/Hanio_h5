var Tower = /** @class */ (function () {
    function Tower(type, towerEle, diskList) {
        if (diskList === void 0) { diskList = []; }
        this.type = type;
        this.towerEle = towerEle;
        this.diskList = diskList;
    }
    Object.defineProperty(Tower.prototype, "count", {
        get: function () {
            return this.diskList.length;
        },
        enumerable: false,
        configurable: true
    });
    Tower.prototype.addDisk = function (disk) {
        this.diskList.push(disk);
    };
    Tower.prototype.popDisk = function () {
        return this.diskList.pop();
    };
    Tower.prototype.clone = function () {
        return new Tower(this.type, this.towerEle, this.diskList.concat());
    };
    return Tower;
}());
