import { _decorator, Component, Label, Node,director } from 'cc';
import { AssetList, Global } from '../Global';
import { Main } from '../Main';
import { TopLoad } from './TopLoad';
import { TweenTool } from '../Tools/TweenTools';
import { AudioMgr } from '../Mgr/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('EndBox')
/**
 * 结束弹窗
 */
export class EndBox extends Component {

    //分数
    @property(Label)
    private ScoreText: Label;
    //
    @property(Node)
    private Box: Node;
    
    protected start(): void {
        this.ScoreText.string = Math.floor(Global.ScoreNum).toString();
        TweenTool.Pop(this.Box);
    }


    /**
     * 点击返回首页
     */
    private ClickBackHome() {
        Global.IsDebug && console.log('点击返回首页');
        AudioMgr.instance.PlayButton();
        //director.getAnimationManager().removeAllActions();
        //Main.instance.UpdateScene(AssetList.Scene.LoginScene);
        
        director.loadScene("Scene");
        
        //TopLoad.instance.HidePop(AssetList.Pop.EndBox);
    }

    private ClickNextLevel() {
        AudioMgr.instance.PlayButton();
        
        // 设置当前关卡索引到下一关
        Global.currentLevelIndex = Global.currentLevelIndex + 1;
        console.log(Global.currentLevelIndex)

        // 根据 NowIndex 的值判断进入哪个场景
        if (Global.currentLevelIndex >= 0 && Global.currentLevelIndex <= 4) {
            director.loadScene("flip");
        } else if (Global.currentLevelIndex >= 5 && Global.currentLevelIndex <= 9) {
            director.loadScene("adjust");
        } else if (Global.currentLevelIndex >= 10 && Global.currentLevelIndex <= 14) {
            director.loadScene("second");
        } else if (Global.currentLevelIndex >= 15 && Global.currentLevelIndex <= 19) {
            director.loadScene("choose");
        } else {
            console.error("Invalid NowIndex value:", Global.currentLevelIndex);
        }
    }

    public ClickRestart() {
        Global.IsDebug && console.log('点击重新开始关卡');
        //AudioMgr.instance.PlayButton();
        if (Global.currentLevelIndex >= 0 && Global.currentLevelIndex <= 4) {
            director.loadScene("flip");
        } else if (Global.currentLevelIndex >= 5 && Global.currentLevelIndex <= 9) {
            director.loadScene("adjust");
        } else if (Global.currentLevelIndex >= 10 && Global.currentLevelIndex <= 14) {
            director.loadScene("second");
        } else if (Global.currentLevelIndex >= 15 && Global.currentLevelIndex <= 19) {
            director.loadScene("choose");
        } else {
            console.error("Invalid NowIndex value:", Global.currentLevelIndex);
        }
    }

}


