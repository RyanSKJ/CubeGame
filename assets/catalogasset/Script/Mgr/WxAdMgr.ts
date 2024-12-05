declare var wx;
import { _decorator, Component, Node } from 'cc';
import { Global } from '../Global';
const { ccclass, property } = _decorator;

@ccclass('WxAdMgr')
/**?
 * 微信广告管理
 */
export class WxAdMgr extends Component {

    private static _instance: WxAdMgr = null;

    public static get Instance() {
        if (!this._instance) {
            this._instance = new WxAdMgr();
        }
        return this._instance;
    }

    //视频广告
    private VideoAd: any = null;

    //banner广告
    private BannerAd: any = null;

    //格子广告
    private GridAd: any = null;

    //回调函数
    private Cb: Function = null;

    /**
     * 初始化
     * @param 激励视频广告id
     * @param 下方banner广告id
     * @param 格子广告id
     * @param 激励广告回调
     */
    public Init(_video: string, _banner: string, _grid: string) {
        //激励广告
        this.VideoAd = wx.createRewardedVideoAd({ adUnitId: _video });
        this.VideoAd.onLoad(() => { Global.IsDebug && console.log("微信广告加载成功") });
        this.VideoAd.onError((err) => { Global.IsDebug && console.log("激励视频广告加载失败", err) });
        this.VideoAd.onClose((res) => { this.VideoClose(res.isEnded) });

        //banner广告
        if (_banner) {
            this.BannerAd = wx.createBannerAd({
                adUnitId: _banner,
                adIntervals: 30,
                style: {
                    left: 0,
                    top: 0,
                    width: screen.width
                }
            })
            this.BannerAd.onResize((res) => {//banner广告适配
                this.BannerAd.top = screen.height - res.height;
            })
        }

        //格子广告
        if (_grid) {
            this.GridAd = wx.createGridAd({
                adUnitId: _grid,
                adIntervals: 30,
                style: {
                    left: 0,
                    top: screen.height / 2 - 200,
                }
            })

        }
    }

    /**
     * 显示激励广告
     */
    public ShowRewardVideoAd(_cb: Function) {
        //显示失败了重新加载
        this.VideoAd.load().then(() => {
            this.VideoAd.show().catch((err) => {
                //显示失败了重新加载
                Global.IsDebug && console.log('视频广告加载失败', err);
                this.VideoClose(false);
            })
        })
    }

    /**
     * 显示banner广告
     * @param 是否显示
     */
    public ShowBannerAd(_isshow: boolean) {
        if (_isshow) {
            this.BannerAd.show();
            this.BannerAd.style.top = screen.height - this.BannerAd.style.realHeight;
        }
        else this.BannerAd.hide();
    }

    /**
     * 显示格子广告
     * @param 是否显示
     */
    public ShowGridAd(_isshow: boolean) {
        if (_isshow) {
            this.GridAd.ad.show();
        }
        else this.GridAd.ad.hide();
    }

    /**
     * 关闭视频
     * @param 是否播放完成
     */
    private VideoClose(_isended: boolean) {
        Global.IsDebug && console.log("用户是否看完了广告", _isended);
        this.Cb && this.Cb(_isended);
    }
}


