import { _decorator, Component, director, Label, Node, ProgressBar } from 'cc';
import { ResMgr } from '../Script/Mgr/ResMgr';
import { AssetList, Global } from '../Script/Global';
import { AudioMgr } from '../Script/Mgr/AudioMgr';
import { Main } from '../Script/Main';
import { LocalMgr } from '../Script/Mgr/LocalMgr';
const { ccclass, property } = _decorator;

@ccclass('Loading')
/**
 * 加载场景
 */
export class Loading extends Component {

    //进度条
    @property(ProgressBar)
    private ProgressBar: ProgressBar;

    //进度文字
    @property(Label)
    private ProgressText: Label;

    start() {
        //资源数据初始化
        ResMgr.instance.LoadInit();
        this.LoadRes();

        //更新本地信息
        LocalMgr.instance.LocalInfo = LocalMgr.instance.GetInfo();
        if (!LocalMgr.instance.LocalInfo) {
            LocalMgr.instance.LocalInfo = LocalMgr.instance.TestInfo;
            LocalMgr.instance.UpdateInfo();
        }
    }

    /**
     * 加载资源
     */
    private async LoadRes() {
        await ResMgr.instance.LoadBundle(AssetList.BundleName, 0.1);
        await ResMgr.instance.LoadRes(AssetList.BundleName, AssetList.Asset.Prefabs, 0.6);
        await ResMgr.instance.LoadRes(AssetList.BundleName, AssetList.Asset.Sounds, 0.2);
        await ResMgr.instance.LoadRes(AssetList.BundleName, AssetList.Asset.SpriteFrames, 0.1);

        AudioMgr.instance.Init();
        AudioMgr.instance.PlayBgSound("bgsound");
        Main.instance.UpdateScene(AssetList.Scene.LoginScene);
    }

    update(deltaTime: number) {
        this.ProgressText.string = "LOADING..." + Math.floor(Global.LoadProgress * 100).toString() + "%";
        this.ProgressBar.progress = Global.LoadProgress;
    }
}


