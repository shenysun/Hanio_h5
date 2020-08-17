
class GameConst {
    /**
     * 舞台
     */
    public static stageWidth: number;
    public static stageHeight: number;
    /**
     * 石塔宽高
     */
    public static readonly towerWidth: number = 15;
    public static readonly towerHeight: number = 400;
    /**
     * 石塔底座宽高
     */
    public static readonly towerBottomW: number = 160;
    public static readonly towerBottomH: number = 20;
    /**
     * 石塔开始位置
     */
    public static readonly towerStartX: number = 80;
    /**
     * 石塔间距
     */
    public static readonly towerSpace: number = 100;
    /**
     * 圆盘基础宽高
     */
    public static readonly baseWidth: number = 60;
    public static readonly baseHeight: number = 16;
    /**
     * 圆盘宽度增长比例
     */
    public static readonly widthMulit: number = 15;
    public static readonly diskColorList = ["#ffa500", "#800080", "#ff00ff", "#000080", "#0000ff", "#008080", "#808000", "#00ff00", "#4dee5d"];
    /**
     * 自动移动时间间隔(ms)
     */
    public static readonly timeFrame: number = 500;
    /**
     * 圆盘最少/最大个数
     */
    public static readonly disk_count_min: number = 3;
    public static readonly disk_count_max: number = 8;
}