import { _decorator, Animation, Component, Label, Node, ProgressBar } from 'cc';
import { Mimi } from './Mimi';
import { GameScene } from './GameScene';
import { Global } from '../../Global';
import { AudioMgr } from '../../Mgr/AudioMgr';
import { TweenTool } from '../../Tools/TweenTools';
const { ccclass, property } = _decorator;

@ccclass('ElementLoad')
/**
 * 游戏中得元素层
 */
export class ElementLoad extends Component {

    //收集进度
    @property(ProgressBar)
    private CollectProgress: ProgressBar;
    //当前进度
    private CurrentProgress: number = 0;
    //起飞进度
    private TakeOffProgress: number = 100;
    //起飞速度
    private TakeOffSpeed: number = 50;

    //跳高分数
    @property(Label)
    private ScoreText: Label;

    //小眯眯
    @property(Node)
    private Mimi: Node;

    //血量
    @property(Label)
    private Bleed: Label;
    //血量
    private BleedNum: number = 3;

    //金币
    @property(Label)
    private Coin: Label;

    //游戏场景
    @property(Node)
    private GameScene: Node;

    //是否在加速
    private IsSpeed: boolean = false;
    //剪掉的数量
    private CutNum: number = 10;

    //道具按钮
    @property(Node)
    private PropButton: Node;

    //
    @property(Node)
    private Sou: Node;

    //道具时间
    private PropTime: number = 60 * 1;

    protected start(): void {
        this.CollectProgress.progress = 0;
        this.CurrentProgress = 0;
        Global.ScoreNum = 0;
        this.ScoreText.string = Math.floor(Global.ScoreNum).toString();
        Global.CoinNum = 0;
        this.Coin.string = Global.CoinNum.toString();
        this.BleedNum = 3;
        this.Bleed.string = this.BleedNum.toString();
        this.PropButton.active = false;

        this.Sou.active = false;
    }

    /**
     * 复活
     */
    public IamSave() {
        this.BleedNum = 3;
        this.Bleed.string = this.BleedNum.toString();
    }

    /**
     * 更新分数
     */
    public UpdateScore(_vy: number): void {
        _vy *= 0.1;
        Global.ScoreNum += Math.abs(_vy);
        this.ScoreText.string = Math.floor(Global.ScoreNum).toString();

        if (!this.IsSpeed) {
            this.CurrentProgress += Math.abs(_vy);
            if (this.CurrentProgress >= this.TakeOffProgress) {
                this.CurrentProgress = this.TakeOffProgress;
                this.ShowProp();
            }
            this.CollectProgress.progress = this.CurrentProgress / this.TakeOffProgress;
        }

    }

    protected update(dt: number): void {
        if (this.IsSpeed) {
            this.Mimi.getComponent(Mimi).Vy = this.TakeOffSpeed;
            this.PropTime--;
            if (this.PropTime <= 0) {
                this.IsSpeed = false;
                // this.Sou.active = false;
            }
        }
    }

    /**
     * 血量减少
     */
    public BleedReduce(): void {
        AudioMgr.instance.PlayBomb();
        this.BleedNum -= 3;
        this.Bleed.string = this.BleedNum.toString();

        if (this.BleedNum == 0) {
            //游戏结束
            this.GameScene.getComponent(GameScene).GameOver();
        }
    }

    /**
     * 增加金币
     */
    public AddCoin(_num: number): void {
        Global.CoinNum += _num;
        this.Coin.string = Global.CoinNum.toString();
    }

    /**
     * 点击道具
     */
    private ClickProp() {
        Global.IsDebug && console.log("点击道具");
        AudioMgr.instance.PlayEffect("sou", "click");
        this.IsSpeed = true;
        this.PropButton.active = false;
        this.CurrentProgress = 0;
        this.CollectProgress.progress = 0;

        this.Sou.active = true;
        this.Sou.getComponent(Animation).play();
    }

    /**
     * 显示道具按钮
     */
    public ShowProp() {
        if (this.PropButton.active) return;
        this.PropButton.active = true;
        TweenTool.Pop(this.PropButton);
    }
}

