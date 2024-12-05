import { _decorator, Component, EventTouch, input, Input, Node } from 'cc';
import { Mimi } from './Mimi';
import { AssetList, Global } from '../../Global';
import { TopLoad } from '../../TopLoad/TopLoad';
import { AdBox } from '../../TopLoad/AdBox';
import { ElementLoad } from './ElementLoad';
import { LocalMgr } from '../../Mgr/LocalMgr';
const { ccclass, property } = _decorator;

@ccclass('GameScene')
/**
 * 游戏场景
 * 金币消耗问题
 */
export class GameScene extends Component {

    //操作层
    @property(Node)
    private TouchBg: Node;

    //猫咪
    @property(Node)
    private Mimi: Node;

    //元素层
    @property(Node)
    private ElementLoad;

    protected start(): void {

        Global.IsGameOver = false;
        Global.IsAd = true;

        this.TouchBg.on(Input.EventType.TOUCH_MOVE, this.TouchCb, this);
        this.TouchBg.on(Input.EventType.TOUCH_END, this.TouchCb, this);
        this.TouchBg.on(Input.EventType.TOUCH_CANCEL, this.TouchCb, this);
    }

    /**
     * 用户操控屏幕
     */
    private TouchCb(_e: EventTouch) {

        if (_e.type == Input.EventType.TOUCH_MOVE) {
            this.Mimi.getComponent(Mimi).ImaMove(_e.getDeltaX());
        } else {
            this.Mimi.getComponent(Mimi).ImaMove(0);
        }
    }

    /**
     * 游戏结束
     */
    public GameOver() {
        Global.IsDebug && console.log("游戏结束");
        Global.IsGameOver = true;

        LocalMgr.instance.GameOver();

        if (Global.IsAd) {
            let adbox: Node = TopLoad.instance.AddPop(AssetList.Pop.AdBox)
            adbox.getComponent(AdBox).Cb = this.IamSave.bind(this);
        } else {
            TopLoad.instance.AddPop(AssetList.Pop.EndBox)
        }
    }

    /**
     * 复活
     */
    public IamSave() {
        Global.IsDebug && console.log("复活");
        Global.IsAd = false;
        Global.IsGameOver = false;
        this.Mimi.getComponent(Mimi).IamSave();
        this.ElementLoad.getComponent(ElementLoad).IamSave();
    }


}


