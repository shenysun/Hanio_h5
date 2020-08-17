class Main {

    private diskContainer: HTMLDivElement;
    private btnAuto: HTMLButtonElement;
    private selectDisk: HTMLSelectElement;
    private tower1: Tower;
    private tower2: Tower;
    private tower3: Tower;
    private towerDict: Object = {}; // key: TypeTower, val: Tower
    private pathList: Array<IMovePath> = []; // 移动路径
    private timeOut: number; // 

    constructor() {
        this.diskContainer = document.getElementById("diskContainer") as HTMLDivElement;
        this.tower1 = new Tower("石塔-A", document.getElementById('tower1') as HTMLDivElement);
        this.tower2 = new Tower("石塔-B", document.getElementById('tower2') as HTMLDivElement);
        this.tower3 = new Tower("石塔-C", document.getElementById('tower3') as HTMLDivElement);
        this.towerDict[this.tower1.type] = this.tower1;
        this.towerDict[this.tower2.type] = this.tower2;
        this.towerDict[this.tower3.type] = this.tower3;

        this.btnAuto = document.getElementById("btnAuto") as HTMLButtonElement;
        this.btnAuto.addEventListener("click", this.onAutoClick.bind(this));

        this.selectDisk = document.getElementById("selectDisk") as HTMLSelectElement;
        this.selectDisk.addEventListener("input", this.onSelectDiskInput.bind(this));
        let optionEle: HTMLOptionElement;
        for(let i = GameConst.disk_count_min; i <= GameConst.disk_count_max; i++) {
            optionEle = document.createElement("option");
            optionEle.value = i + "";
            optionEle.text = i + "个";
            this.selectDisk.add(optionEle);
        }
        let count: number = +this.selectDisk.options[this.selectDisk.selectedIndex].value;
        this.createDisk(this.tower1, 8);       
    }

    /**
     * 在tower目标上创建count个盘
     */
    private createDisk(target: Tower, count: number) {
        for (let i = 0; i < count; i++) {
            let disk = new Disk(count - i);
            this.diskContainer.appendChild(disk.divElement);
            target.addDisk(disk);
            disk.move(target);
        }
    }

    private clearDisk(): void {
        let diskList = this.diskContainer.children;
        let disk: Element;
        for (var i = diskList.length - 1; i >= 0 ; i--) {
            disk = diskList.item(i);
            this.diskContainer.removeChild(disk);
            disk.remove();
        }
        let tower: Tower;
        for(let key in this.towerDict) {
            tower = this.towerDict[key];
            tower.diskList.length = 0;
        }
    }

    /**
     * 获取移动路径
     */
    private honio(count: number, from: Tower, buffer: Tower, to: Tower) {
        if (count == 1) {
            let disk = from.popDisk();
            to.addDisk(disk);
            this.pathList.push({ from: from.type, to: to.type });
        } else {
            this.honio(count - 1, from, to, buffer);
            this.honio(1, from, buffer, to);
            this.honio(count - 1, buffer, from, to);
        }
    }

    /**
     * 自动移动
     */
    private playLoop(): void {
        if (!this.pathList.length) {
            this.btnAuto.disabled = false;
            window.clearTimeout(this.timeOut);
            console.info(this.tower1.diskList);
            console.info(this.tower2.diskList);
            console.info(this.tower3.diskList);
            return;
        }
        let path: IMovePath = this.pathList.shift();
        let from: Tower = this.towerDict[path.from];
        let to: Tower = this.towerDict[path.to];
        let disk = from.popDisk();
        to.addDisk(disk);
        disk.move(to);
        console.log(`从${from.type}移动到${to.type}`);
        this.timeHandler();
    }

    private timeHandler(): void {
        this.timeOut = window.setTimeout(() => {
            this.playLoop();
        }, GameConst.timeFrame);
    }

    private onAutoClick(): void {
        this.honio(this.tower1.count, this.tower1.clone(), this.tower2.clone(), this.tower3.clone());
        this.timeHandler();
        this.btnAuto.disabled = true;
    }

    private onSelectDiskInput(): void {
        this.clearDisk();
        let count: number = +this.selectDisk.options[this.selectDisk.selectedIndex].value;
        this.createDisk(this.tower1, count);
    }
}
new Main();