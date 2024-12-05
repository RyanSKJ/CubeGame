import { _decorator, Component, instantiate, Node } from 'cc';
import { ResMgr } from './Mgr/ResMgr';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    //单例
    static instance: Main = null;
    protected onLoad(): void {
        Main.instance = this;
    }

    /**
     * 更新场景
     * @param 场景名称
     */
    public UpdateScene(_scenename: string) {
        Global.IsDebug && console.log("更新游戏场景", _scenename)
        
        console.log(this.node.name)
        //销毁场景内得所有内容
        if (this.node.children.length > 0) {
            for (let i = 0; i < this.node.children.length; i++) {
                this.node.children[i].destroy();
            }
        }
        
        
        this.node.addChild(instantiate(ResMgr.instance.Prefabs[_scenename]));
    }

}


