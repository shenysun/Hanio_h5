class Disk {

    public divElement: HTMLDivElement;
    private style: CSSStyleDeclaration;

    public constructor(public typeIdx: number) {
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

    public move(target: Tower): void {
        let tower = target.towerEle;
        let targetType: CSSStyleDeclaration = tower.ownerDocument.defaultView.getComputedStyle(tower, null)
        this.style.left = parseInt(targetType.left) + parseInt(targetType.width) / 2 - parseInt(this.style.width) / 2 + "px";
        this.style.top = parseInt(targetType.top) + 200 - GameConst.baseHeight * target.count + "px";
    }

    private offsetX: number;
    private offsetY: number;
    private canMove: boolean;

    private onDragStart(evt: MouseEvent): void {
        this.offsetX = evt.pageX - parseInt(this.style.left);
        this.offsetY = evt.pageY - parseInt(this.style.top);
        this.divElement.addEventListener("mousemove", this.onDragMove.bind(this));
        this.canMove = true;
    }

    private onDragMove(evt: MouseEvent): void {
        if (!this.canMove) {
            return;
        }
        this.style.left = evt.pageX - this.offsetX + "px";
        this.style.top = evt.pageY - this.offsetY + "px";
    }

    private onDragOver(evt: MouseEvent): void {
        this.canMove = false;
        this.divElement.removeEventListener("mousemove", this.onDragMove.bind(this));
    }
}