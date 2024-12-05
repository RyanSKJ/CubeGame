import { _decorator, Component, instantiate, Label, Node, tween, Tween, UIOpacity,Camera } from 'cc';
import { Global } from '../Global';
import { ResMgr } from '../Mgr/ResMgr';
const { ccclass, property } = _decorator;

@ccclass('TopLoad')
export class TopLoad extends Component {

    //弹窗层
    @property(Node)
    private PopLoad: Node;

    //单例
    static instance: TopLoad = null;
    protected onLoad(): void {
        TopLoad.instance = this;
    }

    //提示框
    @property(Node)
    private PromptBox: Node | null = null;
    //提示内容
    @property(Label)
    private PromptContent: Label | null = null;

    //弹窗
    private Pops = {};

    /**
     * 添加弹窗
     */
    public AddPop(_popname: string): Node {
        Global.IsDebug && console.log("显示弹窗", _popname);
        let pop: Node = instantiate(ResMgr.instance.Prefabs[_popname]);
        this.PopLoad.addChild(pop);
        this.Pops[_popname] = pop;
        Global.IsDebug && console.log("弹窗信息", this.Pops)
        return pop;
    }

    /**
     * 隐藏弹窗
     */
    public HidePop(_popname: string) {
        Global.IsDebug && console.log("隐藏弹窗", _popname);
        this.Pops[_popname].destroy();
        delete this.Pops[_popname];
        Global.IsDebug && console.log("弹窗信息", this.Pops);
        
    }

    /**
    * 显示提示框
    */
    public ShowPrompt(_content: string) {
        this.PromptBox.active = true;
        this.PromptContent.string = _content;
        let prompt_opacity: UIOpacity = this.PromptBox.getComponent(UIOpacity);
        prompt_opacity.opacity = 0;
        Tween.stopAllByTarget(prompt_opacity);
        tween(prompt_opacity).to(0.3, { opacity: 255 }).delay(1).to(0.3, { opacity: 0 }).call(() => {
            this.PromptBox.active = false;
        }).start();
    }


}


