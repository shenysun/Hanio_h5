var Disk = /** @class */ (function () {
    function Disk(typeIdx) {
        this.typeIdx = typeIdx;
        this.divElement = document.createElement("div");
        this.divElement.className = "disk";
        this.style = this.divElement.style;
        this.style.position = "absolute";
        this.style.width = GameConst.baseWidth + this.typeIdx * GameConst.widthMulit + "px";
        this.style.height = GameConst.baseHeight + "px";
        this.style.backgroundColor = GameConst.diskColorList[this.typeIdx];
        // this.divElement.addEventListener("mousedown", this.onDragStart.bind(this));
        // this.divElement.addEventListener("mouseup", this.onDragOver.bind(this));
    }
    Disk.prototype.move = function (target) {
        var tower = target.towerEle;
        var targetType = tower.ownerDocument.defaultView.getComputedStyle(tower, null);
        this.style.left = parseInt(targetType.left) + parseInt(targetType.width) / 2 - parseInt(this.style.width) / 2 + "px";
        this.style.top = parseInt(targetType.top) + 200 - GameConst.baseHeight * target.count + "px";
    };
    Disk.prototype.onDragStart = function (evt) {
        this.offsetX = evt.pageX - parseInt(this.style.left);
        this.offsetY = evt.pageY - parseInt(this.style.top);
        this.divElement.addEventListener("mousemove", this.onDragMove.bind(this));
        this.canMove = true;
    };
    Disk.prototype.onDragMove = function (evt) {
        if (!this.canMove) {
            return;
        }
        this.style.left = evt.pageX - this.offsetX + "px";
        this.style.top = evt.pageY - this.offsetY + "px";
    };
    Disk.prototype.onDragOver = function (evt) {
        this.canMove = false;
        this.divElement.removeEventListener("mousemove", this.onDragMove.bind(this));
    };
    return Disk;
}());
