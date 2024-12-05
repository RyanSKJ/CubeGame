declare var wx;
declare var tt;
import { _decorator, CCString, Component, Node, TerrainLayer } from 'cc';
import { Global } from '../Global';
import { WxAdMgr } from './WxAdMgr';
const { ccclass, property } = _decorator;

@ccclass('AdMgr')
/**
 * 广告管理
 */
export class AdMgr extends Component {

    //
    public static Instance: AdMgr = null;
    //
    protected onLoad(): void {
        AdMgr.Instance = this;
    }

    //视频广告id
    @property({ type: CCString, displayName: "视频广告id" })
    private VideoId: string;

    //banner广告
    @property({ type: CCString, displayName: "banner广告" })
    private BannerId: string;

    //格子广告
    @property({ type: CCString, displayName: "格子广告" })
    private GridId: string;

    //回调函数
    public Cb: Function;

    /**
     * 广告初始化
     */
    public Init() {
        if (Global.IsWx) WxAdMgr.Instance.Init(this.VideoId, this.BannerId, this.GridId);
    }

    /**
     * 显示视频广告
     * @param 回调方法
     */
    public ShowVideoAd(_cb: Function) {
        if (Global.IsWx) {
            WxAdMgr.Instance.ShowRewardVideoAd(_cb);
            return;
        }

        _cb(true)
    }

    /**
     * 显示banner广告
     * @param 是否显示
     */
    public ShowBannerAd(_isshow: boolean) {
        if (Global.IsWx) WxAdMgr.Instance.ShowBannerAd(_isshow);
    }

    /**
     * 显示格子广告
     * @param 是否显示
     */
    public ShowGridAd(_isshow: boolean) {
        if (Global.IsWx) WxAdMgr.Instance.ShowGridAd(_isshow);
    }


}


