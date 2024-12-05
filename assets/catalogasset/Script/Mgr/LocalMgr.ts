import { _decorator, Component, Node } from 'cc';
import { Global } from '../Global';
import { WxTools } from '../Tools/WxTools';
const { ccclass, property } = _decorator;

@ccclass('LocalMgr')
/**
 * 本地缓存
 */
export class LocalMgr extends Component {

    //
    private static _instance: LocalMgr = null;
    //
    public static get instance() {
        if (!this._instance) {
            this._instance = new LocalMgr();
        }
        return this._instance;
    }

    //本地缓存key
    private LocalKey: string = 'mimijump0';

    //本地信息
    public LocalInfo: any = {
        score: 0,
        coin: 0,
        catinfo: {
            cat0: 1,
            cat1: 2,
            cat2: 3,
            cat3: 4,
            cat4: 5,
            cat5: 6,
            cat6: 7,
            cat7: 8,
            cat8: 9,
            cat9: 10,
            cat10: 11,
            cat11: 12,
            cat12: 13,
            cat13: 14,
            cat14: 15,
            cat15: 16,
            cat16: 17,
            cat17: 18,
            cat18: 19,
            cat19: 20
        },
        lastchoose: 0
    };

    //测试信息
    public TestInfo: any = {
        score: 0,
        coin: 0,
        catinfo: {
            cat0: 1,
            cat1: 2,
            cat2: 3,
            cat3: 4,
            cat4: 5,
            cat6: 6,
            cat7: 7,
            cat8: 8,
            cat9: 9,
            cat10: 10,
        },
        lastchoose: 0
    };

    /**
     * 更新信息
     */
    public UpdateInfo() {
        if (Global.IsWx) {
            WxTools.SetStorage(this.LocalKey, JSON.stringify(this.LocalInfo));
            return;
        }
        localStorage.setItem(this.LocalKey, JSON.stringify(this.LocalInfo))
    }

    /**
     * 获取信息
     */
    public GetInfo() {
        //if (Global.IsWx) {
        //    return WxTools.GetStorage(this.LocalKey)
        //};
        //return JSON.parse(localStorage.getItem(this.LocalKey));
        return this.LocalInfo;
    }

    /**
     * 使用金币
     */
    public UseCoin(_cat: string) {
        this.LocalInfo.coin -= this.LocalInfo.catinfo[_cat];
        this.LocalInfo.catinfo[_cat] = 0;
        this.UpdateInfo();
    }

    /**
     * 更换猫咪
     */
    public UpdateCat(_chooseindex: number) {
        this.LocalInfo.lastchoose = _chooseindex;
        this.UpdateInfo();
    }

    /**
     * 游戏结束
     */
    public GameOver() {
        this.LocalInfo.coin += Global.CoinNum;
        this.LocalInfo.score = Math.max(this.LocalInfo.score, Math.floor(Global.ScoreNum));
        this.UpdateInfo();
    }

}


