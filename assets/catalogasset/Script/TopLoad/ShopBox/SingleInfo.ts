import { _decorator, Component, Label, Node, Sprite, Button, director,assetManager } from 'cc';
import { AudioMgr } from '../../Mgr/AudioMgr';
import { ResMgr } from '../../Mgr/ResMgr';
import { LocalMgr } from '../../Mgr/LocalMgr';
import { Global } from '../../Global';
import { TopLoad } from '../TopLoad';
const { ccclass, property } = _decorator;

@ccclass('SingleInfo')
export class SingleInfo extends Component {

    //当前索引
    private NowIndex: number = 0;

    //猫咪
    //@property(Sprite)
    //private Cat: Sprite;

    //金币数
    @property(Label)
    private Coin: Label;

    // 控制按钮点击的状态
    private isClickable: boolean = true;

    // MaskBg 节点
    @property(Node)
    private MaskBg: Node;

    // 点击按钮
    @property(Button)
    private button: Button;

    /**
     * 更新样式
     */
    public UpdateStyle(_index: number) {
        this.NowIndex = _index;

        //this.Cat.spriteFrame = ResMgr.instance.SpriteFrames["cathead" + this.NowIndex.toString()];
        this.Coin.string = LocalMgr.instance.LocalInfo.catinfo["cat" + this.NowIndex.toString()];
        this.button.interactable = this.isClickable;
    }

    public setClickable(canClick: boolean) {
        this.isClickable = canClick;
        this.button.interactable = canClick;  // 控制按钮是否可点击
        // 控制 MaskBg 的显示状态
        if (this.MaskBg) {
            this.MaskBg.active = !canClick; // 当按钮不可点击时，MaskBg 为开启状态
        }
    }

    /**
     * 使用猫咪
     */
    private CatClick() {
        //AudioMgr.instance.PlayButton();
    
        // 设置当前关卡索引
        Global.currentLevelIndex = this.NowIndex;
    
        // 根据 NowIndex 的值判断要进入的场景
        if (this.NowIndex >= 0 && this.NowIndex <= 4) {
            director.loadScene("flip");
        } else if (this.NowIndex >= 5 && this.NowIndex <= 9) {
            director.loadScene("adjust");
        } else if (this.NowIndex >= 10 && this.NowIndex <= 14) {
            director.loadScene("second");
        } else if (this.NowIndex >= 15 && this.NowIndex <= 19) {
            director.loadScene("choose");
        } else {
            console.error("Invalid NowIndex value:", this.NowIndex);
        }
    }
    private loadSceneWithCleanup(sceneName: string) {
            assetManager.assets.forEach((asset) => {
                if (!asset.refCount) {
                    assetManager.releaseAsset(asset);
                }
            });
            director.loadScene(sceneName);        // 加载新场景
        }

}


