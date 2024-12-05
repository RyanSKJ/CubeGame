import { _decorator, Component, Label, Node,Camera,director } from 'cc';
import { AssetList, Global } from '../../Global';
import { AudioMgr } from '../../Mgr/AudioMgr';
import { Main } from '../../Main';
import { LocalMgr } from '../../Mgr/LocalMgr';
import { TopLoad } from '../../TopLoad/TopLoad';
import { ShopBox } from '../../TopLoad/ShopBox/ShopBox';
const { ccclass, property } = _decorator;

@ccclass('LoginScene')
/**
 * 游戏首页
 */
export class LoginScene extends Component {

    //分数
    @property(Label)
    private ScoreText: Label;

    //金币数量
    @property(Label)
    private CoinText: Label;
    //音效按钮
    @property(Node)
    private SoundButton: Node | null = null;


    protected start(): void {
        this.UpdateBest();
    }

    /**
     * 开始游戏
     */
    private StartClick() {
        Global.IsDebug && console.log("开始游戏");
        AudioMgr.instance.PlayButton();
        Main.instance.UpdateScene(AssetList.Scene.GameScene);
    }

    /**
     * 更新最好数据
     */
    private UpdateBest() {
        Global.IsDebug && console.log("本地信息", LocalMgr.instance.GetInfo())
        this.ScoreText.string = LocalMgr.instance.GetInfo().score.toString();
        this.CoinText.string = LocalMgr.instance.GetInfo().coin.toString();
    }

    /**
     * 点击选择按钮
     */
    private ChooseClick() {
        AudioMgr.instance.PlayButton();
        this.checkAllCameras;
        let shopbox: Node = TopLoad.instance.AddPop(AssetList.Pop.ShopBox);
        shopbox.getComponent(ShopBox).Cb = this.UpdateBest.bind(this);
        this.checkAllCameras();
    
    }
    private checkAllCameras() {
        // 获取当前场景中的根节点
        const rootNode = this.node.scene;

        // 递归查找所有节点中的Camera组件
        this.findCamerasInNode(rootNode);
    }

    private findCamerasInNode(node: Node) {
        // 检查当前节点是否有Camera组件
        const cameraComponent = node.getComponent(Camera);
        if (cameraComponent && node.name === 'MainCamera') {
            // 找到MainCamera并将其关闭
            node.active = false;
            console.log(`MainCamera has been deactivated.`);
            return;  // 找到并关闭后可以直接返回，不再继续查找
        }

        // 递归检查子节点
        node.children.forEach(child => {
            this.findCamerasInNode(child);
        });
    }

    /**
     * 点击音效
     */
    private SoundClick() {
        Global.IsDebug && console.log("点击播放音效");
        AudioMgr.instance.PlayButton();
        if (AudioMgr.instance.IsMute) {
            AudioMgr.instance.PlayBgSound("bgsound");
        } else {
            AudioMgr.instance.StopBgSound();
        }

        this.SoundButton.getChildByName("MuteButton").active = AudioMgr.instance.IsMute;
    }

}


