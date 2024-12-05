import { _decorator, Component, Node } from 'cc';
import { AssetList, Global } from '../Global';
import { AdMgr } from '../Mgr/AdMgr';
import { TopLoad } from './TopLoad';
import { TweenTool } from '../Tools/TweenTools';
import { Main } from '../Main';
import { AudioMgr } from '../Mgr/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('AdBox')
/**
 * 复活弹窗
 */
export class AdBox extends Component {

    //回调函数
    public Cb: Function;
    //
    @property(Node)
    private Box: Node;

    protected start(): void {
        TweenTool.Pop(this.Box);
    }

    /**
     * 点击复活按钮
     */
    private SaveButtonClick() {
        Global.IsDebug && console.log("点击复活按钮");
        AudioMgr.instance.PlayButton();
        AdMgr.Instance.ShowVideoAd((_isended: boolean) => {
            if (_isended) {
                TopLoad.instance.HidePop(AssetList.Pop.AdBox)
                this.Cb();
            }
        })
    }

    /**
     * 点击不用了
     */
    private NoThanksButtonClick() {
        Global.IsDebug && console.log("点击不用了");
        AudioMgr.instance.PlayButton();
        Main.instance.UpdateScene(AssetList.Scene.LoginScene);
        TopLoad.instance.HidePop(AssetList.Pop.AdBox);
    }
}


