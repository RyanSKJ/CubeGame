import { _decorator, Component, instantiate, Node, Prefab, Camera,director } from 'cc';
import { AudioMgr } from '../../Mgr/AudioMgr';
import { TopLoad } from '../TopLoad';
import { AssetList } from '../../Global';
import { LocalMgr } from '../../Mgr/LocalMgr';
import { SingleInfo } from './SingleInfo';
import { TweenTool } from '../../Tools/TweenTools';
const { ccclass, property } = _decorator;

@ccclass('ShopBox')
/**
 * 商店弹窗
 */
export class ShopBox extends Component {

    //单个猫咪信息预设体
    @property(Prefab)
    private SingleInfo: Prefab;

    //
    @property(Node)
    private MainLoad: Node;

    //
    @property(Node)
    private Box: Node;

    //回调函数
    public Cb: Function;

    protected start(): void {
        TweenTool.Pop(this.Box);
        for (let i = 0; i < 20; i++) {
            let si: Node = instantiate(this.SingleInfo);
            this.MainLoad.addChild(si);
            si.setPosition(0, 0, 0);
            si.getComponent(SingleInfo).UpdateStyle(i);
        }
    }


    /**
     * 点击关闭
     */
    private CloseClick() {
        AudioMgr.instance.PlayButton();
        TopLoad.instance.HidePop(AssetList.Pop.ShopBox);
        this.Cb && this.Cb();
        this.checkAllCameras();
    }

    private checkAllCameras() {
        // 获取当前场景中的根节点
        const scene = director.getScene();
        scene.children.forEach(rootNode => {
            console.log(rootNode.name)
            if(rootNode.name === 'MainCamera'){
                rootNode.active = true;
            }})
    }

}


