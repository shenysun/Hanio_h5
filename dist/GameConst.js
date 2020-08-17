var GameConst = /** @class */ (function () {
    function GameConst() {
    }
    /**
     * 石塔宽高
     */
    GameConst.towerWidth = 15;
    GameConst.towerHeight = 400;
    /**
     * 石塔底座宽高
     */
    GameConst.towerBottomW = 160;
    GameConst.towerBottomH = 20;
    /**
     * 石塔开始位置
     */
    GameConst.towerStartX = 80;
    /**
     * 石塔间距
     */
    GameConst.towerSpace = 100;
    /**
     * 圆盘基础宽高
     */
    GameConst.baseWidth = 60;
    GameConst.baseHeight = 16;
    /**
     * 圆盘宽度增长比例
     */
    GameConst.widthMulit = 15;
    GameConst.diskColorList = ["#ffa500", "#800080", "#ff00ff", "#000080", "#0000ff", "#008080", "#808000", "#00ff00", "#4dee5d"];
    /**
     * 自动移动时间间隔(ms)
     */
    GameConst.timeFrame = 500;
    /**
     * 圆盘最少/最大个数
     */
    GameConst.disk_count_min = 3;
    GameConst.disk_count_max = 8;
    return GameConst;
}());
