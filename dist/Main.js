var Main = /** @class */ (function () {
    function Main() {
        this.towerDict = {}; // key: TypeTower, val: Tower
        this.pathList = []; // 移动路径
        this.diskContainer = document.getElementById("diskContainer");
        this.tower1 = new Tower("石塔-A", document.getElementById('tower1'));
        this.tower2 = new Tower("石塔-B", document.getElementById('tower2'));
        this.tower3 = new Tower("石塔-C", document.getElementById('tower3'));
        this.towerDict[this.tower1.type] = this.tower1;
        this.towerDict[this.tower2.type] = this.tower2;
        this.towerDict[this.tower3.type] = this.tower3;
        this.btnAuto = document.getElementById("btnAuto");
        this.btnAuto.addEventListener("click", this.onAutoClick.bind(this));
        this.selectDisk = document.getElementById("selectDisk");
        this.selectDisk.addEventListener("input", this.onSelectDiskInput.bind(this));
        var optionEle;
        for (var i = GameConst.disk_count_min; i <= GameConst.disk_count_max; i++) {
            optionEle = document.createElement("option");
            optionEle.value = i + "";
            optionEle.text = i + "个";
            this.selectDisk.add(optionEle);
        }
        var count = +this.selectDisk.options[this.selectDisk.selectedIndex].value;
        this.createDisk(this.tower1, 8);
    }
    /**
     * 在tower目标上创建count个盘
     */
    Main.prototype.createDisk = function (target, count) {
        for (var i = 0; i < count; i++) {
            var disk = new Disk(count - i);
            this.diskContainer.appendChild(disk.divElement);
            target.addDisk(disk);
            disk.move(target);
        }
    };
    Main.prototype.clearDisk = function () {
        var diskList = this.diskContainer.children;
        var disk;
        for (var i = diskList.length - 1; i >= 0; i--) {
            disk = diskList.item(i);
            this.diskContainer.removeChild(disk);
            disk.remove();
        }
        var tower;
        for (var key in this.towerDict) {
            tower = this.towerDict[key];
            tower.diskList.length = 0;
        }
    };
    /**
     * 获取移动路径
     */
    Main.prototype.honio = function (count, from, buffer, to) {
        if (count == 1) {
            var disk = from.popDisk();
            to.addDisk(disk);
            this.pathList.push({ from: from.type, to: to.type });
        }
        else {
            this.honio(count - 1, from, to, buffer);
            this.honio(1, from, buffer, to);
            this.honio(count - 1, buffer, from, to);
        }
    };
    /**
     * 自动移动
     */
    Main.prototype.playLoop = function () {
        if (!this.pathList.length) {
            this.btnAuto.disabled = false;
            window.clearTimeout(this.timeOut);
            console.info(this.tower1.diskList);
            console.info(this.tower2.diskList);
            console.info(this.tower3.diskList);
            return;
        }
        var path = this.pathList.shift();
        var from = this.towerDict[path.from];
        var to = this.towerDict[path.to];
        var disk = from.popDisk();
        to.addDisk(disk);
        disk.move(to);
        console.log("\u4ECE" + from.type + "\u79FB\u52A8\u5230" + to.type);
        this.timeHandler();
    };
    Main.prototype.timeHandler = function () {
        var _this = this;
        this.timeOut = window.setTimeout(function () {
            _this.playLoop();
        }, GameConst.timeFrame);
    };
    Main.prototype.onAutoClick = function () {
        this.honio(this.tower1.count, this.tower1.clone(), this.tower2.clone(), this.tower3.clone());
        this.timeHandler();
        this.btnAuto.disabled = true;
    };
    Main.prototype.onSelectDiskInput = function () {
        this.clearDisk();
        var count = +this.selectDisk.options[this.selectDisk.selectedIndex].value;
        this.createDisk(this.tower1, count);
    };
    return Main;
}());
new Main();
