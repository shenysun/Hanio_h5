class Tower implements ITower {

    constructor(public type: TypeTower, public towerEle: HTMLDivElement, public diskList: Array<Disk> = []) {

    }

    public get count(): number {
        return this.diskList.length;
    }

    public addDisk(disk: Disk): void {
        this.diskList.push(disk);
    }

    public popDisk(): Disk {
        return this.diskList.pop();
    }

    public clone(): Tower {
        return new Tower(this.type, this.towerEle, this.diskList.concat());
    }
}

interface ITower {
    diskList: Array<Disk>;
    type: TypeTower,
    count: number;
    clone(): ITower;
}

interface IMovePath {
    from: TypeTower;
    to: TypeTower;
}

type TypeTower = "石塔-A" | "石塔-B" | "石塔-C";